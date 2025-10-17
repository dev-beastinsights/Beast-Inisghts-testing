import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class DashboardPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    overviewReportContainer: "#overview-report-container",
    driverPopoverContent: "#driver-popover-content",
    customCloseBtn: "#custom-close-btn",
    visualMoreOptionsButton: "#overview-report-container iframe",
    div: "div",
    section: "section",
    visualMoreOptions: "visual-more-options-btn",
    exportData: "pbimenu-item.Export data",
    exportBtn: "export-btn",
    fileFormat: "File format:",
    pbiDropdown: "pbi-dropdown",
    option: "option",
  };

  async skipOnboardingTour() {
    await expect(
      this.page.locator(this.locators.driverPopoverContent)
    ).toBeVisible({ timeout: 90000 });
    if (
      await this.page.locator(this.locators.driverPopoverContent).isVisible()
    ) {
      await this.page.locator(this.locators.customCloseBtn).click();
    }
    await expect(
      this.page.locator(this.locators.driverPopoverContent)
    ).not.toBeVisible();
  }

  async expectDashboardPage() {
    await expect(
      this.page.getByRole("heading", { name: "Snapshot" })
    ).toBeVisible({ timeout: 60000 });
  }

  async clickOnVisualMoreOptionsButton() {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .locator(this.locators.div)
        .filter({ hasText: /^All Metrics$/ })
        .first()
    ).toBeVisible();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .locator(this.locators.div)
      .filter({ hasText: /^All Metrics$/ })
      .first()
      .click();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .getByTestId(this.locators.visualMoreOptions)
      .click();
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByTestId(this.locators.exportData)
    ).toBeVisible();
  }

  async clickOnExportDataBtn() {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByTestId(this.locators.exportData)
    ).toBeVisible();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .getByTestId(this.locators.exportData)
      .click();
  }

  async expectExportDataModal() {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByRole("heading", { name: "Which data do you want to" })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .locator(this.locators.section)
        .filter({ hasText: "Data with current" })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .locator(this.locators.section)
        .filter({ hasText: "Summarized dataExport the" })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .locator(this.locators.section)
        .filter({ hasText: "Underlying dataThe report" })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByTestId(this.locators.exportBtn)
    ).toBeVisible({ timeout: 10000 });
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByTestId(this.locators.visualMoreOptions)
    ).toBeVisible({ timeout: 10000 });
  }

  async clickOnDataWithCurrentOption() {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .locator(this.locators.section)
        .filter({ hasText: "Data with current" })
    ).toBeVisible({ timeout: 10000 });
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .locator(this.locators.section)
      .filter({ hasText: "Data with current" })
      .click();
  }

  async clickOnSummarizedDataOption() {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .locator(this.locators.section)
        .filter({ hasText: "Summarized dataExport the" })
    ).toBeVisible();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .locator(this.locators.section)
      .filter({ hasText: "Summarized dataExport the" })
      .click();
  }

  async selectCSVFormatForSummarizedData() {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByText(this.locators.fileFormat)
    ).toBeVisible();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .getByTestId(this.locators.pbiDropdown)
      .click();
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByRole(this.locators.option, { name: ".csv (30,000-row max)" })
    ).toBeVisible();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .getByRole(this.locators.option, { name: ".csv (30,000-row max)" })
      .click();
  }

  async clickOnExportBtn(fileName) {
    await expect(
      this.page
        .locator(this.locators.visualMoreOptionsButton)
        .contentFrame()
        .getByTestId(this.locators.exportBtn)
    ).toBeVisible();
    await this.page
      .locator(this.locators.visualMoreOptionsButton)
      .contentFrame()
      .getByTestId(this.locators.exportBtn)
      .click();
    const downloadPromise = this.page.waitForEvent("download");
    const download = await downloadPromise;
    await download.saveAs(fileName);
  }
}

export default DashboardPage;
