// @ts-check
import { expect, test } from "@playwright/test";
import AllPages from "../pages/AllPages.js";
import dotenv from "dotenv";
import { signInToBI } from "../utils/test-setup.js";

dotenv.config();

test.describe("Reporting Setup", () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach("Login and navigate to Dashboard page", async ({ page }) => {
    allPages = new AllPages(page);
    await signInToBI(allPages);
  });

  test("Verify that user can Edit product details in Reporting Setup on Products tab", async () => {
    const testData = {
      nthRow: 2,
      subscriptionType1: "initial + rebill",
      subscriptionType2: "straight sales",
      group: `Hair Care ${Date.now()}`,
      cost: Math.floor(1000 + Math.random() * 9000).toString(),
      cpa: Math.floor(100 + Math.random() * 900).toString(),
      excluded: true,
    };

    let selectedValue = "";

    await test.step("Navigate to Reporting page", async () => {
      await allPages.reportingPage.clickOnReportingSideNav();
      await allPages.reportingPage.expectReportingHeader();
    });

    await test.step("Navigate to Products tab in Reporting Setup", async () => {
      await allPages.reportingPage.clickOnProductsTabInReportingSetup();
    });

    await test.step("Edit Subscription Type for a Product", async () => {
      selectedValue = await allPages.reportingPage.selectSubscriptionType(
        testData.nthRow,
        testData.subscriptionType1,
        testData.subscriptionType2,
      );
      
      await expect(allPages.reportingPage.getNthSubscriptionTypeValue(testData.nthRow)).toContainText(selectedValue);
    });

    await test.step("Edit Group for a Product", async () => {
      await allPages.reportingPage.editGroup(testData.nthRow, testData.group);
      await expect(allPages.reportingPage.getNthGroup(testData.nthRow)).toContainText(testData.group);
    });

    await test.step("Edit Cost for a Product", async () => {
      await allPages.reportingPage.editCost(testData.nthRow, testData.cost);
      await expect(allPages.reportingPage.getNthCost(testData.nthRow)).toContainText(testData.cost);
    });

    await test.step("Edit CPA for a Product", async () => {
      await allPages.reportingPage.editCPA(testData.nthRow, testData.cpa);
      await expect(allPages.reportingPage.getNthCPA(testData.nthRow)).toContainText(testData.cpa);
    });

    await test.step("Toggle Exclude from Reports checkbox", async () => {
      await allPages.reportingPage.toggleExcludeFromReports(testData.nthRow);
      await allPages.reportingPage.expectExcludeFromReportsToggled(testData.nthRow);
    });

    await test.step("Save changes and verify persistence", async () => {
      await allPages.reportingPage.clickSaveButton();
      await allPages.reportingPage.verifyProductEditsPersisted({
        nthRow: testData.nthRow,
        subscriptionType: selectedValue,
        group: testData.group,
        cost: testData.cost,
        cpa: testData.cpa,
      });
      await allPages.reportingPage.expectAIIndicatorIconNotVisible(testData.nthRow);
    });
  });

  test("Verify that user can Save product changes in Reporting Setup on Products tab", async () => {
    const testData = {
      nthRow: 2,
      subscriptionType1: "initial + rebill",
      subscriptionType2: "straight sales",
      group: `Hair Care ${Date.now()}`,
      cost: Math.floor(1000 + Math.random() * 9000).toString(),
      cpa: Math.floor(100 + Math.random() * 900).toString(),
      excluded: true,
    };

    let selectedValue = "";

    await test.step("Navigate to Reporting page", async () => {
      await allPages.reportingPage.clickOnReportingSideNav();
      await allPages.reportingPage.expectReportingHeader();
    });

    await test.step("Navigate to Products tab in Reporting Setup", async () => {
      await allPages.reportingPage.clickOnProductsTabInReportingSetup();
    });

    await test.step("Clear all editable product fields", async () => {
      await allPages.reportingPage.clearSubscriptionType();
      await allPages.reportingPage.clearGroup(testData.nthRow);
      await allPages.reportingPage.clearCost(testData.nthRow);
      await allPages.reportingPage.clearCPA(testData.nthRow);
      await allPages.reportingPage.clearExcludeFromReports(testData.nthRow);
    });

    await test.step("Click Save with empty fields", async () => {
      await allPages.reportingPage.clickSaveButton();
    });

    await test.step("Edit Subscription Type for a Product", async () => {
      selectedValue = await allPages.reportingPage.selectSubscriptionType(
        testData.nthRow,
        testData.subscriptionType1,
        testData.subscriptionType2,
      );
      
      await expect(allPages.reportingPage.getNthSubscriptionTypeValue(testData.nthRow)).toContainText(selectedValue);
    });

    await test.step("Edit Group for a Product", async () => {
      await allPages.reportingPage.editGroup(testData.nthRow, testData.group);
      await expect(allPages.reportingPage.getNthGroup(testData.nthRow)).toContainText(testData.group);
    });

    await test.step("Edit Cost for a Product", async () => {
      await allPages.reportingPage.editCost(testData.nthRow, testData.cost);
      await expect(allPages.reportingPage.getNthCost(testData.nthRow)).toContainText(testData.cost);
    });

    await test.step("Edit CPA for a Product", async () => {
      await allPages.reportingPage.editCPA(testData.nthRow, testData.cpa);
      await expect(allPages.reportingPage.getNthCPA(testData.nthRow)).toContainText(testData.cpa);
    });

    await test.step("Toggle Exclude from Reports checkbox", async () => {
      const isChecked = await allPages.reportingPage.toggleExcludeFromReports(testData.nthRow);
      await allPages.reportingPage.expectExcludeFromReportsToggled(
        testData.nthRow,
      );
    });

    await test.step("Save changes and verify persistence", async () => {
      await allPages.reportingPage.clickSaveButton();
      await allPages.reportingPage.verifyProductEditsPersisted({
        nthRow: testData.nthRow,
        subscriptionType: selectedValue,
        group: testData.group,
        cost: testData.cost,
        cpa: testData.cpa,
      });
      await allPages.reportingPage.expectAIIndicatorIconNotVisible(testData.nthRow);
    });
  });

  test("Verify that user can Discard a product in Reporting Setup on Products tab", async () => {
    const testData = {
      nthRow: 3,
      subscriptionType1: "initial + rebill",
      subscriptionType2: "straight sales",
      group: `Hair Care ${Date.now()}`,
      cost: Math.floor(1000 + Math.random() * 9000).toString(),
      cpa: Math.floor(100 + Math.random() * 900).toString(),
      excluded: true,
    };

    let selectedValue = "";

    await test.step("Navigate to Reporting page", async () => {
      await allPages.reportingPage.clickOnReportingSideNav();
      await allPages.reportingPage.expectReportingHeader();
    });

    await test.step("Navigate to Products tab in Reporting Setup", async () => {
      await allPages.reportingPage.clickOnProductsTabInReportingSetup();
    });

    await test.step("Clear all editable product fields", async () => {
      await allPages.reportingPage.clearSubscriptionType();
      await allPages.reportingPage.clearGroup(testData.nthRow);
      await allPages.reportingPage.clearCost(testData.nthRow);
      await allPages.reportingPage.clearCPA(testData.nthRow);
      await allPages.reportingPage.clearExcludeFromReports(testData.nthRow);
    });

    await test.step("Click Save with empty fields", async () => {
      await allPages.reportingPage.clickSaveButton();
    });

    await test.step("Edit Subscription Type for a Product", async () => {
      selectedValue = await allPages.reportingPage.selectSubscriptionType(
        testData.nthRow,
        testData.subscriptionType1,
        testData.subscriptionType2,
      );
      
      await expect(allPages.reportingPage.getNthSubscriptionTypeValue(testData.nthRow)).toContainText(selectedValue);
    });

    await test.step("Edit Group for a Product", async () => {
      await allPages.reportingPage.editGroup(testData.nthRow, testData.group);
      await expect(allPages.reportingPage.getNthGroup(testData.nthRow)).toContainText(testData.group);
    });

    await test.step("Edit Cost for a Product", async () => {
      await allPages.reportingPage.editCost(testData.nthRow, testData.cost);
      await expect(allPages.reportingPage.getNthCost(testData.nthRow)).toContainText(testData.cost);
    });

    await test.step("Edit CPA for a Product", async () => {
      await allPages.reportingPage.editCPA(testData.nthRow, testData.cpa);
      await expect(allPages.reportingPage.getNthCPA(testData.nthRow)).toContainText(testData.cpa);
    });

    await test.step("Toggle Exclude from Reports checkbox", async () => {
      const isChecked = await allPages.reportingPage.toggleExcludeFromReports(testData.nthRow);
      await allPages.reportingPage.expectExcludeFromReportsToggled(testData.nthRow);
    });

    await test.step("Click Discard with non-empty fields", async () => {
      await allPages.reportingPage.clickDiscardButton();
      await allPages.reportingPage.verifySuccessToast(
        "Changes discarded successfully"
      );
    });
    await allPages.reportingPage.expectAIIndicatorIconNotVisible(testData.nthRow);
  });

  test("Verify that user can Autofill a product in Reporting Setup on Products tab", async () => {

    await test.step("Navigate to Reporting page", async () => {
      await allPages.reportingPage.clickOnReportingSideNav();
      await allPages.reportingPage.expectReportingHeader();
    });

    await test.step("Navigate to Products tab in Reporting Setup", async () => {
      await allPages.reportingPage.clickOnProductsTabInReportingSetup();
    });

    await test.step("Clear some 'Group' fields manually", async () => {
      await allPages.reportingPage.clearGroupFields([4, 5, 6]);
    });

    await test.step("Click Save button", async () => {
      await allPages.reportingPage.clickSaveButton();
      await allPages.page.waitForTimeout(3000);
    });

    await test.step("Click Autofill button", async () => {
      await allPages.reportingPage.clickAutofillButton();
      await allPages.page.waitForTimeout(5000);
      await allPages.reportingPage.clickSaveButton();
    });

    await test.step("Validate that previously empty Group fields are autofilled", async () => {
      await allPages.reportingPage.validateAutofillForRows([4, 5, 6]);
    });

    await test.step("Save changes and verify persistence", async () => {
      await allPages.reportingPage.clickSaveButton();
      await allPages.reportingPage.verifyAutofilledGroupsPersisted();
    });
  });
});
