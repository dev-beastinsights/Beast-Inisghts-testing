export const getAppliedAdvancedDateRange = async (page) => {
 
  await page.waitForFunction(
    () => !!window['Sales'] && typeof window['Sales'].getFilters === 'function',
    { timeout: 30000 }
  );

  const { appliedStart, appliedEnd } = await page.evaluate(async () => {
    const filters = await window['Sales'].getFilters();
    const advancedFilter = filters.find((f) => f.$schema?.toLowerCase().includes('advanced'));

    if (!advancedFilter) return { appliedStart: null, appliedEnd: null };
    const toYMD = (value) => new Date(value).toLocaleDateString('en-CA');

    const start = advancedFilter.conditions.find((c) => c.operator.includes('Greater'));
    const end = advancedFilter.conditions.find((c) => c.operator.includes('Less'));

    return { appliedStart: toYMD(start.value), appliedEnd: toYMD(end.value) };
  });

  return { appliedStart, appliedEnd };
};

export const getAdvancedFilter = async (page) => {
  await page.waitForFunction(
    () => !!window['Sales'] && typeof window['Sales'].getFilters === 'function',
    { timeout: 30000 }
  );

  return await page.evaluate(async () => {
    const filters = await window['Sales'].getFilters();
    const advancedFilter = filters.find((f) => f.$schema?.toLowerCase().includes('advanced'));
    return advancedFilter || null;
  });
};

export function getPreviousMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toLocaleString("default", { month: "long" });
}

export function getPreviousMonthShortName() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toLocaleString("default", { month: "short" });
}

export function getPreviousMonthNumber() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.getMonth() + 1;
}
