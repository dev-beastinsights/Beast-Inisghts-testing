// @ts-nocheck
import { expect, test } from "@playwright/test";
import AllPages from "../pages/AllPages.js";
import dotenv from "dotenv";
import { verifyFormatOfDownloadFiles } from "../utils/download.js";
import { signInToBI } from "../utils/test-setup.js";
dotenv.config();

test.describe("Export Embedded Visuals", () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach("Login and navigate to Dashboard page", async ({ page }) => {
    allPages = new AllPages(page);
    await signInToBI(allPages);
  });

  test("Verify that Add/Delete Users is working properly in Users page", async () => {
    const email = `dhruvi.alphabin+${Date.now()}@gmail.com`;

    await test.step("Open the 'All Metrics' section and click on the 'Export data' button", async () => {
      await allPages.dashboardPage.clickOnVisualMoreOptionsButton();
      await allPages.dashboardPage.clickOnExportDataBtn();
      await allPages.dashboardPage.expectExportDataModal();
    });

    await test.step("Select the 'Underlying data' option", async () => {
      await allPages.dashboardPage.clickOnDataWithCurrentOption();
    });

    await test.step("Export the data in XLSX format", async () => {
      const filePath = "testdata/exported-data.xlsx";
      await allPages.dashboardPage.clickOnExportBtn(filePath);
      await verifyFormatOfDownloadFiles(filePath, "XLSX");
    });
  });

  test("Verify that Dashboard page report exports successfully using 'Summarized data' option in All Metrics section", async () => {
    await test.step("Open the 'All Metrics' section and click on the 'Export data' button", async () => {
      await allPages.dashboardPage.clickOnVisualMoreOptionsButton();
      await allPages.dashboardPage.clickOnExportDataBtn();
      await allPages.dashboardPage.expectExportDataModal();
    });

    await test.step("Select the 'Summarized data' option and export the data in CSV format", async () => {
      await allPages.dashboardPage.clickOnSummarizedDataOption();
      await allPages.dashboardPage.selectCSVFormatForSummarizedData();
    });

    await test.step("Export the data in CSV format", async () => {
      const filePath = "testdata/exported-data-summarized.csv";
      await allPages.dashboardPage.clickOnExportBtn(filePath);
      await verifyFormatOfDownloadFiles(filePath, "CSV");
    });
  });
});
