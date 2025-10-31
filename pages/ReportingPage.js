import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class ReportingPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    reportingSideNav: '[data-test-id="nav-item-reporting setup"]',
    clearSubscriptionType: '[class*="spreadsheet-cell"][aria-colindex="3"]',
    clearGroup: '[class*="spreadsheet-cell"][aria-colindex="4"]',
    clearCost: '[class*="spreadsheet-cell"][aria-colindex="5"]',
    clearCPA: '[class*="spreadsheet-cell"][aria-colindex="6"]',
    clearExcludeFromReports: '[class*="spreadsheet-cell"][aria-colindex="7"]',
    subscriptionTypeValue:
      ".spreadsheet-cell.spreadsheet-cell-checkbox.htAutocomplete",
    selectSubscriptionType: `[role="listbox"] td`,
    nthGroup: `[class*="spreadsheet-cell"][aria-colindex="4"]`,
    nthCost: `[class*="spreadsheet-cell"][aria-colindex="5"]`,
    nthCPA: `[class*="spreadsheet-cell"][aria-colindex="6"]`,
    nthExcludeFromReports: ".htCheckboxRendererInput",
    productEditsPersisted: `td[role="gridcell"][aria-colindex="4"]`,
    checkedType: "aria-checked",
    productTab: "custom-tab-products",
    aiIndicator: "img",
  };

  getReportingSideNav() {
    return this.page.locator(this.locators.reportingSideNav);
  }

  async clickOnReportingSideNav() {
    await expect(this.getReportingSideNav()).toBeVisible({ timeout: 20000 });
    await this.getReportingSideNav().click();
  }

  async expectReportingHeader() {
    await expect(
      this.page.getByRole("heading", { name: "Reporting Setup" })
    ).toBeVisible({ timeout: 60000 });
  }

  getProductsTabInReportingSetup() {
    return this.page.getByTestId(this.locators.productTab);
  }

  async clickOnProductsTabInReportingSetup() {
    await expect(this.getProductsTabInReportingSetup()).toBeVisible({
      timeout: 20000,
    });
    await this.getProductsTabInReportingSetup().click();
  }

  async clearSubscriptionType() {
    const cells = this.page.locator(this.locators.clearSubscriptionType);
    const count = await cells.count();

    for (let i = 0; i < count; i++) {
      const cell = cells.nth(i);
      await expect(cell).toBeVisible();

      let currentValue = (await cell.textContent())?.replace(/▼/g, "").trim();
      if (currentValue && currentValue !== "") {
        await cell.dblclick();
        await this.page.keyboard.press(
          process.platform === "darwin" ? "Meta+A" : "Control+A"
        );
        await this.page.keyboard.press("Backspace");
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(400);

        let updatedValue = (await cell.textContent())?.replace(/▼/g, "").trim();
        expect(updatedValue).toBe("");
      }
    }
  }

  async clearGroup(n = 2) {
    const cell = this.page.locator(this.locators.clearGroup).nth(n - 1);
    await expect(cell).toBeVisible();
    await cell.dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.press("Backspace");
  }

  async clearCost(n = 2) {
    const cell = this.page.locator(this.locators.clearCost).nth(n - 1);
    await expect(cell).toBeVisible();
    await cell.dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.press("Backspace");
  }

  async clearCPA(n = 2) {
    const cell = this.page.locator(this.locators.clearCPA).nth(n - 1);
    await expect(cell).toBeVisible();
    await cell.dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.press("Backspace");
  }

  async clearExcludeFromReports(n = 2) {
    const cell = this.page
      .locator(this.locators.clearExcludeFromReports)
      .nth(n - 1);
    await expect(cell).toBeVisible();
    await cell.dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.press("Backspace");
  }

  getNthSubscriptionType(n) {
    return this.page.locator(`(//div[@class="htAutocompleteArrow"])[${n}]`);
  }

  getNthSubscriptionTypeValue(n) {
    return this.page.locator(this.locators.subscriptionTypeValue).nth(n - 1);
  }

  async selectSubscriptionType(n, value1, value2) {
    await this.getNthSubscriptionType(n).click();

    const existingSubscriptionType = await this.getNthSubscriptionTypeValue(
      n
    ).textContent();

    let selectedValue;
    if (existingSubscriptionType.includes(value1)) {
      selectedValue = value2;
    } else if (existingSubscriptionType.includes(value2)) {
      selectedValue = value1;
    } else {
      selectedValue = value2;
    }

    await this.page
      .locator(this.locators.selectSubscriptionType)
      .filter({ hasText: selectedValue })
      .first()
      .click();
    return selectedValue;
  }

  async expectSubscriptionTypeUpdated(n, expectedValue) {
    await expect(this.getNthSubscriptionTypeValue(n)).toContainText(
      expectedValue
    );
  }

  getNthGroup(n) {
    return this.page.locator(this.locators.nthGroup).nth(n - 1);
  }

  async editGroup(n, newGroup) {
    await expect(this.getNthGroup(n)).toBeVisible();
    await this.getNthGroup(n).dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(500);
    await this.page.keyboard.type(newGroup, { delay: 100 });
    await this.page.keyboard.press("Enter");
  }

  getNthAiIndicatorIcon(n) {
    return this.getNthGroup(n).locator(this.locators.aiIndicator);
  }

  async expectAiIndicatorIconUpdated() {
    const aiIconVisibility = this.getNthAiIndicatorIcon(n);
    await expect(aiIconVisibility).toBeVisible();
    const aiIcon = await this.getNthAiIndicatorIcon(n).getAttribute("alt");
    expect(aiIcon).toContain("AI");
  }

  async expectAIIndicatorIconNotVisible(n) {
    const aiIcon = this.getNthAiIndicatorIcon(n);
    await expect(aiIcon).not.toBeVisible();
  }

  getNthCost(n) {
    return this.page.locator(this.locators.nthCost).nth(n - 1);
  }

  async editCost(n, value) {
    const costCell = this.getNthCost(n);
    await expect(costCell).toBeVisible();
    await costCell.dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.type(value, { delay: 50 });
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(500);
  }

  getNthCPA(n) {
    return this.page.locator(this.locators.nthCPA).nth(n - 1);
  }

  async editCPA(n, value) {
    const cpaCell = this.getNthCPA(n);
    await cpaCell.dblclick();
    await this.page.keyboard.press(
      process.platform === "darwin" ? "Meta+A" : "Control+A"
    );
    await this.page.keyboard.type(value, { delay: 50 });
    await this.page.keyboard.press("Enter");
  }

  getExcludeCheckbox(n) {
    return this.page.locator(this.locators.nthExcludeFromReports).nth(n - 1);
  }

  async toggleExcludeFromReports(n) {
    const checkbox = this.getExcludeCheckbox(n);
    await expect(checkbox).toBeVisible();

    let isChecked = false;
    try {
      isChecked = await checkbox.isChecked();
    } catch (e) {
      const ariaChecked = await checkbox.getAttribute(
        this.locators.checkedType
      );
      isChecked = ariaChecked === "true";
    }

    if (!isChecked) {
      const elementHandle = await checkbox.elementHandle();
      if (elementHandle) {
        await this.page.evaluate((el) => el.click(), elementHandle);
      }
      return true;
    }
    return true;
  }

  async expectExcludeFromReportsToggled(n) {
    const ariaChecked = await this.getExcludeCheckbox(n).getAttribute(
      this.locators.checkedType
    );
    const isChecked = ariaChecked === "true";
    expect(isChecked).toBe(true);
  }

  async clickSaveButton() {
    await this.page.waitForTimeout(5000);
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async verifySuccessToast(expectedMessage) {
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
  }

  async verifyProductEditsPersisted({
    nthRow,
    subscriptionType,
    group,
    cost,
    cpa,
  }) {
    if (subscriptionType) {
      await this.expectSubscriptionTypeUpdated(nthRow, subscriptionType);
    }
    if (group) {
      const groupCell = this.page
        .locator(this.locators.productEditsPersisted)
        .filter({ hasText: group })
        .first();
      await expect(groupCell).toBeVisible();
    }
    if (cost) {
      await expect(this.getNthCost(nthRow)).toContainText(cost);
    }
    if (cpa) {
      await expect(this.getNthCPA(nthRow)).toContainText(cpa);
    }
    if (typeof excluded === "boolean") {
      await this.expectExcludeFromReportsToggled(nthRow);
    }
  }

  async clickDiscardButton() {
    await this.page.getByRole("button", { name: "Discard" }).click();
  }

  async clearGroupFields(rows) {
    for (const row of rows) {
      const targetRowIndex = row + 1;
      const cell = this.page
        .locator(
          `tr[role="row"][aria-rowindex="${targetRowIndex}"] td[role="gridcell"]`
        )
        .nth(3);

      await expect(cell).toBeVisible();
      await cell.dblclick();
      await this.page.keyboard.press(
        process.platform === "darwin" ? "Meta+A" : "Control+A"
      );
      await this.page.keyboard.press("Backspace");
      await this.page.waitForTimeout(500);
    }
  }

  async clickAutofillButton() {
    await this.page.getByRole("button", { name: "Autofill" }).click();
  }

  async getGroupValueByRow(row) {
    const targetRowIndex = row + 1;

    let cell = this.page
      .locator(
        `tr[role="row"][aria-rowindex="${targetRowIndex}"] td[role="gridcell"]`
      )
      .nth(3);

    const cellCount = await cell.count();

    if (cellCount === 0) {
      cell = this.page
        .locator(`tr[role="row"][aria-rowindex="${row}"] td[role="gridcell"]`)
        .nth(3);
    }

    await expect(cell).toBeVisible();
    const textContent = await cell.textContent();
    return textContent ? textContent.trim() : "";
  }

  async isAIGeneratedIconVisibleByRow(row) {
    const targetRowIndex = row + 1;
    const cell = this.page
      .locator(
        `tr[role="row"][aria-rowindex="${targetRowIndex}"] td[role="gridcell"]:has(.ai-indicator-icon)`
      )
      .first();
    return await cell.isVisible();
  }

  async verifyAutofilledGroupsPersisted() {
    const rowsToCheck = [2, 4, 6];
    for (const row of rowsToCheck) {
      const groupValue = await this.getGroupValueByRow(row);
      expect(groupValue).not.toBe("");
    }
  }

  async validateAutofillForRows(rows) {
    for (const row of rows) {
      const groupValue = await this.getGroupValueByRow(row);
      expect(groupValue).not.toBe("");

      const hasAIGeneratedIcon = await this.isAIGeneratedIconVisibleByRow(row);
      expect(hasAIGeneratedIcon).toBeTruthy();
    }
  }
}

export default ReportingPage;
