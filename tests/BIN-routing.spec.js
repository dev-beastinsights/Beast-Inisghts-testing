// @ts-nocheck
import { expect, test } from "@playwright/test";
import AllPages from "../pages/AllPages.js";
import dotenv from "dotenv";
import { signInToBI } from "../utils/test-setup.js";

dotenv.config();

test.describe("BIN Routing", () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach("Login and navigate to Dashboard page", async ({ page }) => {
    allPages = new AllPages(page);
    await signInToBI(allPages);
  });

  test("Verify that BIN Routing page export CSV report successfully", async () => {
    let bankName = "";
    let approvalLift = "";
    let revenueImpact = "";
    let csvFilePath = "";

    await test.step("Navigate to BIN Routing page", async () => {
      await allPages.binRoutingPage.clickOnBINRoutingSideNav();
      await allPages.binRoutingPage.expectBankRoutingInsightsHeader();
    });

    await test.step("Verify Export/Share section is visible", async () => {
      await allPages.binRoutingPage.expectExportOrShareSection();
    });

    await test.step("Get UI values before downloading CSV", async () => {
      bankName = await allPages.binRoutingPage.getBankName();
      approvalLift = await allPages.binRoutingPage.getApprovalLift();
      revenueImpact = await allPages.binRoutingPage.getRevenueImpact();
    });

    await test.step("Download CSV file", async () => {
      csvFilePath = await allPages.binRoutingPage.downloadCSVFile(
        "bin-routing-report.csv"
      );
    });

    await test.step("Verify CSV data matches UI values", async () => {
      await allPages.binRoutingPage.verifyCSVContainsUIData(csvFilePath, {
        bankName,
        approvalLift,
        revenueImpact,
      });
    });
  });

  test("Verify that BIN Routing page export JSON report successfully", async () => {
    let bankName = "";
    let approvalLift = "";
    let revenueImpact = "";
    let jsonFilePath = "";

    await test.step("Navigate to BIN Routing page", async () => {
      await allPages.binRoutingPage.clickOnBINRoutingSideNav();
      await allPages.binRoutingPage.expectBankRoutingInsightsHeader();
    });

    await test.step("Verify Export/Share section is visible", async () => {
      await allPages.binRoutingPage.expectExportOrShareSection();
    });

    await test.step("Get UI values before downloading JSON", async () => {
      bankName = await allPages.binRoutingPage.getBankName();
      approvalLift = await allPages.binRoutingPage.getApprovalLift();
      revenueImpact = await allPages.binRoutingPage.getRevenueImpact();
    });

    await test.step("Download JSON file", async () => {
      jsonFilePath = await allPages.binRoutingPage.downloadJSONFile(
        "bin-routing-report.json"
      );
    });

    await test.step("Verify JSON data matches UI values", async () => {
      await allPages.binRoutingPage.verifyJSONContainsUIData(jsonFilePath, {
        bankName,
        approvalLift,
        revenueImpact,
      });
    });
  });
});
