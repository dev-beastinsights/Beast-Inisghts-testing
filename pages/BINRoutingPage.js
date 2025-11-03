import {
  downloadFile,
  verifyFormatOfDownloadFiles,
  verifyCSVData,
  verifyJSONData,
} from "../utils/download.js";
import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class BINRoutingPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    beastInsightsLogo: "beastinsights-logo",
    binRoutingSideNav: '[data-test-id="nav-item-bin routing"]',
    csvExportButton: '[data-testid="export-csv-button"]',
    jsonExportButton: '[data-testid="export-json-button"]',
    bankName: `((//h3/following-sibling::p)[1]//span)[2]`,
    approvalLift: `//div[text()="Approval Lift"]/following-sibling::div`,
    revenueImpact: `//div[text()="Revenue Impact"]/following-sibling::div`,
    bankRoutingInsightsHeader: `BIN Routing Insights`,
    csvExport: "export-csv-button",
    jsonExport: "export-json-button",
    exportOrSection: "Export/Share",
  };

  getBINRoutingSideNav() {
    return this.page.locator(this.locators.binRoutingSideNav);
  }

  async clickOnBINRoutingSideNav() {
    await expect(this.getBINRoutingSideNav()).toBeVisible({ timeout: 60000 });
    await this.getBINRoutingSideNav().click();
  }

  getBankRoutingInsightsHeader() {
    return this.page.getByText(this.locators.bankRoutingInsightsHeader);
  }

  async expectBankRoutingInsightsHeader() {
    await expect(this.getBankRoutingInsightsHeader()).toBeVisible({
      timeout: 60000,
    });
  }

  getCSVExportButton() {
    return this.page.getByTestId(this.locators.csvExport);
  }

  async downloadCSVFile(fileName) {
    const filePath = await downloadFile(
      this.page,
      this.locators.csvExportButton,
      "testdata",
      fileName
    );
    await verifyFormatOfDownloadFiles(filePath, "CSV");
    return filePath;
  }

  async downloadJSONFile(fileName) {
    const filePath = await downloadFile(
      this.page,
      this.locators.jsonExportButton,
      "testdata",
      fileName
    );
    await verifyFormatOfDownloadFiles(filePath, "JSON");
    return filePath;
  }

  getJSONExportButton() {
    return this.page.getByTestId(this.locators.jsonExport);
  }

  async expectExportOrShareSection() {
    await expect(
      this.page.getByText(this.locators.exportOrSection)
    ).toBeVisible({ timeout: 60000 });
    await expect(this.getCSVExportButton()).toBeVisible({ timeout: 60000 });
    await expect(this.getJSONExportButton()).toBeVisible({ timeout: 60000 });
  }

  async getBankName() {
    await expect(this.page.locator(this.locators.bankName).first()).toBeVisible({
      timeout: 60000,
    });
    return await this.page.locator(this.locators.bankName).first().textContent();
  }

  async getApprovalLift() {
    await expect(this.page.locator(this.locators.approvalLift).first()).toBeVisible({
      timeout: 60000,
    });
    return await this.page.locator(this.locators.approvalLift).first().textContent();
  }

  async getRevenueImpact() {
    await expect(this.page.locator(this.locators.revenueImpact).first()).toBeVisible({
      timeout: 60000,
    });
    return await this.page.locator(this.locators.revenueImpact).first().textContent();
  }

  async verifyCSVContainsUIData(csvFilePath, expectedValues) {
    return verifyCSVData(csvFilePath, expectedValues);
  }

  async verifyJSONContainsUIData(jsonFilePath, expectedValues) {
    return verifyJSONData(jsonFilePath, expectedValues);
  }
}

export default BINRoutingPage;
