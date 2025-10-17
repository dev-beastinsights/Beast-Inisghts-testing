import fs from "fs";
import path from "path";

export const downloadFile = async (page, locator, directoryPath, fileName) => {
  try {
    const fullPath = path.join(directoryPath, fileName);

    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
      fs.unlinkSync(fullPath);
    }

    const downloadPromise = page.waitForEvent("download");
    const element = await page.locator(locator);
    await element.click();
    const download = await downloadPromise;

    await download.saveAs(fullPath);
    console.log("File downloaded successfully to:", fullPath);
    return fullPath;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export const verifyFormatOfDownloadFiles = async (filePath) => {
    try {
      const extension = await path.extname(filePath).toLowerCase();

      switch (extension) {
        case ".csv":
          return "CSV";
        case ".json":
          return "JSON";
        case ".xlsx":
          return "XLSX";
        default:
          return null;
      }
    } catch (error) {
      console.error("Error detecting file format: ", error);
      return null;
    }
  }

const parseCSVLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
};

export const parseCSVFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) throw new Error('CSV file is empty or has no data rows');

  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    return Object.fromEntries(headers.map((header, i) => [header, values[i] || '']));
  });
};

export const verifyCSVData = (filePath, expectedValues) => {
  const csvData = parseCSVFile(filePath);
  const firstRow = csvData[0];

  const fieldMappings = {
    bankName: 'Bank Name',
    approvalLift: 'Approval Lift',
    revenueImpact: 'Revenue Impact'
  };

  for (const [key, csvColumn] of Object.entries(fieldMappings)) {
    if (!expectedValues[key]) continue;

    const expected = expectedValues[key].replace(/\s/g, '');
    const actual = (firstRow[csvColumn] || '').replace(/\s/g, '');
    
    if (!actual.includes(expected) && !expected.includes(actual)) {
      throw new Error(`${csvColumn} mismatch - Expected: "${expectedValues[key]}", Found: "${firstRow[csvColumn]}"`);
    }
  }
  console.log('✓ All CSV data verified successfully');
  return true;
};

export const verifyJSONData = (filePath, expectedValues) => {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const firstRow = jsonData[0];
    
  const fieldMappings = {
    bankName: 'Bank Name',
    approvalLift: 'Approval Lift',
    revenueImpact: 'Revenue Impact'
  };

  for (const [key, jsonColumn] of Object.entries(fieldMappings)) {
    if (!expectedValues[key]) continue;

    const expected = expectedValues[key].replace(/\s/g, '');
    const actual = (firstRow[jsonColumn] || '').replace(/\s/g, '');
    
    if (!actual.includes(expected) && !expected.includes(actual)) {
      throw new Error(`${jsonColumn} mismatch - Expected: "${expectedValues[key]}", Found: "${firstRow[jsonColumn]}"`);
    }
  }
  console.log('✓ All JSON data verified successfully');
  return true;
};