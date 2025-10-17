const { simpleParser } = require('mailparser');
const imaps = require('imap-simple');

async function waitForEmail({
  imapConfig,
  from,
  subjectContains,
  receivedAfter = null
}, {
  timeout = 5 * 60 * 1000,
  pollInterval = 5000
} = {}) {
  const start = Date.now();
  let connection;

  try {
    connection = await imaps.connect({ imap: imapConfig });
    await connection.openBox('INBOX');

    const cutoffTimestamp = receivedAfter ? receivedAfter.getTime() : null;

    while (Date.now() - start < timeout) {
      const searchCriteria = [];
      if (from) searchCriteria.push(['FROM', from]);
      if (searchCriteria.length === 0) searchCriteria.push('ALL');

      const fetchOptions = { bodies: [''], markSeen: false };
      const messages = await connection.search(searchCriteria, fetchOptions);

      if (messages.length === 0) {
        await new Promise(r => setTimeout(r, pollInterval));
        continue;
      }

      const latestMessage = messages[messages.length - 1];
      const raw = latestMessage.parts.find(p => p.which === '')?.body;
      if (!raw) {
        await new Promise(r => setTimeout(r, pollInterval));
        continue;
      }

      const parsed = await simpleParser(raw);
      const subject = parsed.subject || '';
      const fromHeader = parsed.from ? parsed.from.text : '';
      const htmlBody = parsed.html || '';
      const textBody = parsed.text || '';
      const emailDate = parsed.date || new Date(0);
      const emailTimestamp = emailDate.getTime();

      // Skip old emails
      if (cutoffTimestamp && emailTimestamp <= cutoffTimestamp) {
        await new Promise(r => setTimeout(r, pollInterval));
        continue;
      }

      // Check subject match
      if (subjectContains && !subject.toLowerCase().includes(subjectContains.toLowerCase())) {
        await new Promise(r => setTimeout(r, pollInterval));
        continue;
      }

      // Extract "Reset your password" button href
      const hay = htmlBody || textBody || '';
      const linkMatch = hay.match(/<a\s+[^>]*href=["']([^"']*(?:reset|password)[^"']*)["'][^>]*>/i);
      if (linkMatch && linkMatch[1]) {
        const extractedLink = linkMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x3D;/g, '=');
        connection.end();
        return { type: 'link', value: extractedLink, parsed };
      }

      await new Promise(r => setTimeout(r, pollInterval));
    }

    connection.end();
    return null;
  } catch (err) {
    if (connection && connection.end) connection.end();
    throw err;
  }
}

module.exports = { waitForEmail };
