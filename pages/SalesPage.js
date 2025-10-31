import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class SalesPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    salesSideNav: '[data-test-id="nav-item-sales"]',
    startDateInput: '//span[text()="Start"]/following-sibling::input',
    endDateInput: '//span[text()="End"]/following-sibling::input',
    startRdpMonth: '.rdp-caption_start [aria-live="polite"]',
    endRdpMonth: '.rdp-caption_end [aria-live="polite"]',
    dateRangeFilterDialog: '[role="dialog"][data-state="open"]',
    previousMonthArrow: `//button[@name="previous-month"]`,
    nextMonthArrow: `//button[@name="next-month"]`,
    salesTableFirstCampaign:
      '//div[@role="rowheader" and contains(@class,"cell-interactive")]//div[@class="truncate"]',
    moreFilterCategory: `[data-testid="report-more-filters-campaign-selector"]`,
    moreFilterItemCheckbox: `(//div[@class="font-normal truncate"])[2]`,
    groupFilterDropdown: `//button[@data-testid="parameter-selector"]`,
    plusIconOption: '//button[@data-testid="expand-button-1"]',
    salesTableFirstCampaign:
      '//div[@role="rowheader" and contains(@class,"cell-interactive") and contains(., "Testing Campaign")]',
    campaignFilter: `[data-testid="report-more-filters-campaign-selector"]`,
    campaignOption: `(//div[contains(@class,"filter-pill") or contains(text(),"Campaign")])[2]`,
    resetButton: '[data-testid="reset-filters-button"]',
    dateRangeFilterDropdown: "custom-date-range-picker",
    clearDateRange: "Select date range",
  };

  getSalesSideNav() {
    return this.page.locator(this.locators.salesSideNav);
  }

  async clickOnSalesSideNav() {
    await expect(this.getSalesSideNav()).toBeVisible({ timeout: 20000 });
    await this.getSalesSideNav().click();
  }

  async expectSalesHeader() {
    await expect(this.page.getByRole("heading", { name: "Sales" })).toBeVisible(
      { timeout: 60000 }
    );
  }

  getDateRangeFilterDropdown() {
    return this.page.getByTestId(this.locators.dateRangeFilterDropdown);
  }

  async clickOnDateRangeFilterDropdown() {
    await this.getDateRangeFilterDropdown().click();
  }

  async expectClearedDateRangeLabel() {
    await expect(this.getDateRangeFilterDropdown()).toHaveText(
      this.locators.clearDateRange
    );
  }

  async expectSelectedDatesOnDropdownAsLabel(
    startMonth,
    startDate,
    endMonth,
    endDate,
    year
  ) {
    await expect(this.getDateRangeFilterDropdown()).toHaveText(
      `${startMonth} ${startDate}, ${year} - ${endMonth} ${endDate}, ${year}`
    );
  }

  getDateRangePresetButton(dateRange) {
    return this.page.getByTestId(`preset-button-${dateRange}`);
  }

  getStartDateInput() {
    return this.page.locator(this.locators.startDateInput).first();
  }

  async expectStartDateInputValue(year, month, day) {
    await expect(this.getStartDateInput()).toBeVisible();
    await expect(this.getStartDateInput()).toHaveValue(
      `${year}-${month}-${day}`
    );
  }

  getEndDateInput() {
    return this.page.locator(this.locators.endDateInput).first();
  }

  async expectEndDateInputValue(year, month, day) {
    await expect(this.getEndDateInput()).toBeVisible();
    await expect(this.getEndDateInput()).toHaveValue(`${year}-${month}-${day}`);
  }

  getClearButton() {
    return this.page.getByRole("button", { name: "Clear" });
  }

  async clickOnClearButton() {
    await this.getClearButton().click();
  }

  getApplyButton() {
    return this.page.getByRole("button", { name: "Apply" });
  }

  async clickOnApplyButton() {
    await this.getApplyButton().click();
  }

  selectStartDate(day) {
    return this.page
      .locator(`//button[@role="gridcell"][text()="${day}"]`)
      .first();
  }

  async clickOnStartDate(day) {
    await this.selectStartDate(day).click();
  }

  getEndDate(month, day) {
    return this.page
      .getByLabel(month)
      .getByRole("gridcell", { name: day })
      .first();
  }

  async clickOnEndDate(month, day) {
    await this.getEndDate(month, day).click();
  }

  async getStartRdpMonth() {
    const startRdpMonth = await this.page
      .locator(this.locators.startRdpMonth)
      .textContent();
    if (startRdpMonth) {
      const [month] = startRdpMonth.split(" ");
      return month;
    }
    return null;
  }

  async getEndRdpMonth() {
    const endRdpMonth = await this.page
      .locator(this.locators.endRdpMonth)
      .textContent();
    if (endRdpMonth) {
      const [month] = endRdpMonth.split(" ");
      return month;
    }
    return null;
  }

  getDateRangeFilterDialog() {
    return this.page.locator(this.locators.dateRangeFilterDialog);
  }

  async expectDateRangeFilterModal(dateRange) {
    await expect(this.getDateRangeFilterDialog()).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getDateRangePresetButton(dateRange)).toBeVisible();
    await expect(this.getStartDateInput()).toBeVisible();
    await expect(this.getEndDateInput()).toBeVisible();
    await expect(this.getClearButton()).toBeVisible();
    await expect(this.getApplyButton()).toBeVisible();
  }

  async expectDateRangeFilterModalClosed() {
    await expect(this.getDateRangeFilterDialog()).toBeHidden({
      timeout: 60000,
    });
  }

  getPreviousMonthArrow() {
    return this.page.locator(this.locators.previousMonthArrow);
  }

  async clickOnPreviousMonthArrow() {
    await this.getPreviousMonthArrow().click();
  }

  getNextMonthArrow() {
    return this.page.locator(this.locators.nextMonthArrow);
  }

  async clickOnNextMonthArrow() {
    await this.getNextMonthArrow().click();
  }

  expectPreviousMonthArrow() {
    return this.page.locator(this.locators.previousMonthArrow).toBeVisible();
  }
  
  async getStartRdpMonthNumber() {
    const month = await this.getStartRdpMonth(); 
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months.indexOf(month) + 1;
  }

  expectNextMonthArrow() {
    return this.page.locator(this.locators.nextMonthArrow).toBeVisible();
  }

  getMoreFiltersButton() {
    return this.page.getByRole("button", { name: "More Filters" });
  }

  async clickOnMoreFiltersButton() {
    await expect(this.getMoreFiltersButton()).toBeVisible({ timeout: 60000 });
    await this.getMoreFiltersButton().click();
  }

  getMoreFiltersCategory() {
    return this.page.locator(this.locators.moreFilterCategory);
  }

  async clickOnMoreFiltersCategory() {
    await this.getMoreFiltersCategory().first().click();
  }

  getMoreFiltersItemCheckbox() {
    return this.page.locator(this.locators.moreFilterItemCheckbox);
  }

  async clickOnMoreFiltersItem() {
    const checkbox = this.getMoreFiltersItemCheckbox().first();
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click();
  }

  async getFirstMoreFiltersItemText() {
    const item = this.getMoreFiltersItemCheckbox().first();
    await item.scrollIntoViewIfNeeded();
    const text = await item.textContent();
    return text ? text.trim() : "";
  }

  async selectFirstMoreFiltersItemAndGetText() {
    const text = await this.getFirstMoreFiltersItemText();
    await this.clickOnMoreFiltersItem();
    return text;
  }

  async toggleMoreFiltersSelectAll() {
    const box = this.getMoreFiltersSelectAll().first();
    if (await box.count()) {
      await box.click();
    }
  }

  getMoreFiltersResetButton() {
    return this.page.getByRole("button", { name: /Reset|Clear/i });
  }

  async resetMoreFiltersIfVisible() {
    const btn = this.getMoreFiltersResetButton();
    if (await btn.count()) {
      await btn.click();
    }
  }

  async closeMoreFiltersDropdown() {
    await this.page.keyboard.press("Escape");
  }

  getGroupByFilterDropdown() {
    return this.page.locator(this.locators.groupFilterDropdown);
  }

  async clickOnGroupByFilterDropdown() {
    await this.getGroupByFilterDropdown().click();
  }

  getGroupByOption(option) {
    return this.page.locator(
      `//label[normalize-space(text())="${option}"]/preceding-sibling::button[@role="checkbox"]`
    );
  }

  async clickOnGroupByOption(option) {
    await this.getGroupByOption(option).click();
  }

  async closeGroupByDropDownOption() {
    await this.page.keyboard.press("Escape");
  }

  async clickOnPlusIconToExpandGroupByOptions() {
    await this.page.locator(this.locators.plusIconOption).click();
  }

  getGroupBySubOption(option) {
    return this.page.locator(
      `(//label[normalize-space(text())="${option}"])[1]`
    );
  }

  async clickOnGroupBySubOption(option) {
    await this.getGroupBySubOption(option).first().click();
  }

  async waitForSalesDataToLoad() {
    await this.page.waitForTimeout(3000);
  }

  getSalesTable() {
    return this.page.locator(this.locators.salesTableFirstCampaign);
  }

  async getSalesType() {
    return await this.getSalesTable().isVisible();
  }

  async expectGroupedSalesData() {
    await expect(this.getSalesTable()).toBeVisible({ timeout: 6000 });
  }

  async selectCampaignFilter() {
    const campaignFilter = this.page.locator(this.locators.campaignFilter);
    await campaignFilter.click();
    await this.page.waitForTimeout(5000);
  }

  async selectCampaignOption() {
    const campaignOption = this.page.locator(this.locators.campaignOption);
    await campaignOption.click();
    await this.page.waitForTimeout(5000);
  }

  async closeFilterDropdown() {
    await this.page.keyboard.press("Escape");
  }

  async getAppliedFilterText() {
    const appliedFilter = await this.page
      .locator(this.locators.campaignOption)
      .textContent();
    return appliedFilter.trim();
  }

  async closeMoreFilterOption() {
    await this.page.keyboard.press("Escape");
  }

  getResetButton() {
    return this.page.locator(this.locators.resetButton);
  }

  async clickResetButton() {
    return await this.getResetButton().click();
  }

  expectResetButton() {
    return this.getResetButton().isVisible();
  }

  async getSalesTableFirstCampaign() {
    const campaignText = await this.salesTableFirstCampaign
      .first()
      .textContent();
    return campaignText.trim();
  }
}

export default SalesPage;
