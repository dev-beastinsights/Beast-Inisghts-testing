// @ts-check
import { expect, test } from "@playwright/test";
import AllPages from "../pages/AllPages.js";
import dotenv from "dotenv";
import { signInToBI } from "../utils/test-setup.js";  
import {
      getCurrentMonth,
      getCurrentMonthNumber,
      getCurrentMonthShortName,
      getNextMonth,
      getNextMonthNumber,
      getNextMonthShortName,
      getCurrentYear,
} from "../utils/date.js";

import { 
      getAppliedAdvancedDateRange,
      getAdvancedFilter,
      getPreviousMonth,
      getPreviousMonthNumber,
      getPreviousMonthShortName,
 } from "../utils/filter.js";

dotenv.config();

test.describe("", () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach("Login and navigate to Dashboard page", async ({ page }) => {
    allPages = new AllPages(page);
    await signInToBI(allPages);
  });

  test("Verify that clicking the Clear button after applying a date filter resets the filter and Sales data to default", async () => {
    const currentMonth = getCurrentMonth();
    const currentMonthNumber = getCurrentMonthNumber();
    const currentMonthShortName = getCurrentMonthShortName();
    const nextMonthNumber = getNextMonthNumber();
    const nextMonthShortName = getNextMonthShortName();
    const nextMonth = getNextMonth();
    const currentYear = getCurrentYear();
    const startDate = "1";
    const endDate = "25";
    const datePreset = [
      "Yesterday",
      "Last 7 days",
      "Last calendar week",
      "Last 4 weeks",
      "Last 3 months",
      "Last 6 months",
      "Month to date",
    ];

    await test.step("Navigate to Sales page and click date range filter dropdown", async () => {
      await allPages.salesPage.clickOnSalesSideNav();
      await allPages.salesPage.expectSalesHeader();
      await expect(allPages.salesPage.getDateRangeFilterDropdown()).toBeVisible(
        { timeout: 60000 }
      );
      await allPages.salesPage.clickOnDateRangeFilterDropdown();
      for (const date of datePreset) {
        const formattedDate = date.replace(/ /g, "-");
        await allPages.salesPage.expectDateRangeFilterModal(formattedDate);
      }
    });

    await test.step("Click Clear and verify date presets remain available", async () => {
      await allPages.salesPage.clickOnClearButton();
      await allPages.salesPage.expectClearedDateRangeLabel();
      await allPages.salesPage.clickOnDateRangeFilterDropdown();
      for (const date of datePreset) {
        const formattedDate = date.replace(/ /g, "-");
        await allPages.salesPage.expectDateRangeFilterModal(formattedDate);
      }
    });

    await test.step("Verify default calendar months after reset", async () => {
      const startRdpMonth = await allPages.salesPage.getStartRdpMonth();
      expect(startRdpMonth).toBe(currentMonth);

      const endRdpMonth = await allPages.salesPage.getEndRdpMonth();
      expect(endRdpMonth).toBe(nextMonth);
    });

    await test.step("Manually apply a custom date range", async () => {
      await allPages.salesPage.clickOnStartDate("1");
      await allPages.salesPage.clickOnEndDate(nextMonth, "25");
    });

    await test.step("Verify auto selected start and end date inputs", async () => {
      const paddedStartDate = startDate.toString().padStart(2, "0");
      const paddedEndDate = endDate.toString().padStart(2, "0");
      await allPages.salesPage.expectStartDateInputValue(
        currentYear,
        currentMonthNumber,
        paddedStartDate
      );
      await allPages.salesPage.expectEndDateInputValue(
        currentYear,
        nextMonthNumber,
        paddedEndDate
      );
    });

    await test.step("Schema before applying filter (advanced)", async () => {
      const beforeFilter = await getAdvancedFilter(allPages.page);
      expect(beforeFilter?.$schema?.toLowerCase()).toContain("advanced");
    });

    await test.step("After clicking apply button, verify date range filter modal is closed", async () => {
      await allPages.salesPage.clickOnApplyButton();
      await allPages.salesPage.expectDateRangeFilterModalClosed();
    });

    await test.step("Verify date range label shows selected range on Sales page", async () => {
      const paddedStartDate = startDate.toString().padStart(2, "0");
      const paddedEndDate = endDate.toString().padStart(2, "0");
      await allPages.salesPage.expectSelectedDatesOnDropdownAsLabel(
        currentMonthShortName,
        paddedStartDate,
        nextMonthShortName,
        paddedEndDate,
        currentYear
      );
    });

    await test.step("Reopen date filter and verify date filter dialog", async () => {
      await allPages.salesPage.clickOnDateRangeFilterDropdown();
      for (const date of datePreset) {
        const formattedDate = date.replace(/ /g, "-");
        await allPages.salesPage.expectDateRangeFilterModal(formattedDate);
      }
    });

    await test.step("Validate start and end date values persist in calendar inputs", async () => {
      const paddedStartDate = startDate.toString().padStart(2, "0");
      const paddedEndDate = endDate.toString().padStart(2, "0");
      await allPages.salesPage.expectStartDateInputValue(
        currentYear,
        currentMonthNumber,
        paddedStartDate
      );
      await allPages.salesPage.expectEndDateInputValue(
        currentYear,
        nextMonthNumber,
        paddedEndDate
      );
    });

    await test.step("Click Clear again and verify date range is reset", async () => {
      await allPages.salesPage.clickOnClearButton();
      await allPages.salesPage.expectClearedDateRangeLabel();
    });
  });

  test("Verify that clicking the Apply button after applying a date filter resets the filter and Sales data to default", async () => {
    const currentMonth = getCurrentMonth();
    const currentMonthNumber = getCurrentMonthNumber();
    const currentMonthShortName = getCurrentMonthShortName();
    const nextMonthNumber = getNextMonthNumber();
    const nextMonthShortName = getNextMonthShortName();
    const nextMonth = getNextMonth();
    const currentYear = getCurrentYear();
    const startDate = "1";
    const endDate = "25";
    const datePreset = [
      "Yesterday",
      "Last 7 days",
      "Last calendar week",
      "Last 4 weeks",
      "Last 3 months",
      "Last 6 months",
      "Month to date",
    ];

    await test.step("Navigate to Sales page and click date range filter dropdown", async () => {
      await allPages.salesPage.clickOnSalesSideNav();
      await allPages.salesPage.expectSalesHeader();
      await expect(allPages.salesPage.getDateRangeFilterDropdown()).toBeVisible(
        { timeout: 60000 }
      );
      await allPages.salesPage.clickOnDateRangeFilterDropdown();
      for (const date of datePreset) {
        const formattedDate = date.replace(/ /g, "-");
        await allPages.salesPage.expectDateRangeFilterModal(formattedDate);
      }
    });

    await test.step("Click Clear and verify date presets remain available", async () => {
      await allPages.salesPage.clickOnClearButton();
      await allPages.salesPage.expectClearedDateRangeLabel();
      await allPages.salesPage.clickOnDateRangeFilterDropdown();
      for (const date of datePreset) {
        const formattedDate = date.replace(/ /g, "-");
        await allPages.salesPage.expectDateRangeFilterModal(formattedDate);
      }
    });

    await test.step("Verify default calendar months after reset", async () => {
      const startRdpMonth = await allPages.salesPage.getStartRdpMonth();
      expect(startRdpMonth).toBe(currentMonth);

      const endRdpMonth = await allPages.salesPage.getEndRdpMonth();
      expect(endRdpMonth).toBe(nextMonth);
    });

    await test.step("Manually apply a custom date range", async () => {
      await allPages.salesPage.clickOnStartDate("1");
      await allPages.salesPage.clickOnEndDate(nextMonth, "25");
    });

    await test.step("Schema before applying filter (advanced)", async () => {
      const beforeFilter = await getAdvancedFilter(allPages.page);
      expect(beforeFilter?.$schema?.toLowerCase()).toContain("advanced");
    });

    await test.step("Verify auto selected start and end date inputs", async () => {
      const paddedStartDate = startDate.toString().padStart(2, "0");
      const paddedEndDate = endDate.toString().padStart(2, "0");
      await allPages.salesPage.expectStartDateInputValue(
        currentYear,
        currentMonthNumber,
        paddedStartDate
      );
      await allPages.salesPage.expectEndDateInputValue(
        currentYear,
        nextMonthNumber,
        paddedEndDate
      );
    });

    await test.step("After clicking apply button, verify date range filter modal is closed", async () => {
      await allPages.salesPage.clickOnApplyButton();
      await allPages.salesPage.expectDateRangeFilterModalClosed();
    });

    await test.step("Verify date range label shows selected range on Sales page", async () => {
      const paddedStartDate = startDate.toString().padStart(2, "0");
      const paddedEndDate = endDate.toString().padStart(2, "0");
      await allPages.salesPage.expectSelectedDatesOnDropdownAsLabel(
        currentMonthShortName,
        paddedStartDate,
        nextMonthShortName,
        paddedEndDate,
        currentYear
      );
    });
    
    await test.step("Verify after applied Date filter (advanced schema) via Power BI filters", async () => {
      const { appliedStart, appliedEnd } = await getAppliedAdvancedDateRange(allPages.page);

      expect(appliedStart, "No advanced (date) filter found").toBeTruthy();

      const expectedStart = `${currentYear}-${String(currentMonthNumber).padStart(2, "0")}-${String(startDate).padStart(2, "0")}`;
      const expectedEnd = `${currentYear}-${String(nextMonthNumber).padStart(2, "0")}-${String(endDate).padStart(2, "0")}`;

      expect(appliedStart).toBe(expectedStart);
      expect(appliedEnd).toBe(expectedEnd);
    });
  });

  test("Verify the functionality of the calendar navigation arrows to adjust month view and apply filters in Sales page test", async () => {
    const currentMonth = getCurrentMonth();
    const previousMonth = getPreviousMonth();
    const previousMonthNumber = getPreviousMonthNumber();
    const nextMonthNumber = getNextMonthNumber();
    const nextMonth = getNextMonth();
    const currentYear = getCurrentYear();
    const startDate = "1";
    const endDate = "25";

   await test.step("Navigate to Sales page and open date range filter", async () => {
      await allPages.salesPage.clickOnSalesSideNav();
      await allPages.salesPage.expectSalesHeader();
      await expect(allPages.salesPage.getDateRangeFilterDropdown()).toBeVisible({
        timeout: 60000,
      });
      await allPages.salesPage.clickOnDateRangeFilterDropdown();
    });

    await test.step("Verify default calendar months after reset", async () => {
      const startRdpMonth = await allPages.salesPage.getStartRdpMonth();
      expect(startRdpMonth).toBe(currentMonth);

      const endRdpMonth = await allPages.salesPage.getEndRdpMonth();
      expect(endRdpMonth).toBe(nextMonth);
    });

    await test.step("Navigate to previous month, apply filter and verify Power BI schema", async () => {
      await allPages.salesPage.clickOnPreviousMonthArrow();
      const prevMonthVisible = await allPages.salesPage.getStartRdpMonth();
      expect(prevMonthVisible).toBe(previousMonth);

      await allPages.salesPage.clickOnStartDate("1");
      await allPages.salesPage.clickOnEndDate(previousMonth, "25");

      await allPages.salesPage.clickOnApplyButton();
      await allPages.salesPage.expectDateRangeFilterModalClosed();

      const { appliedStart, appliedEnd } = await getAppliedAdvancedDateRange(allPages.page);
      expect(appliedStart, "No advanced (date) filter found").toBeTruthy();

      const expectedStart = `${currentYear}-${String(previousMonthNumber).padStart(2, "0")}-${String(startDate).padStart(2, "0")}`;
      const expectedEnd = `${currentYear}-${String(previousMonthNumber).padStart(2, "0")}-${String(endDate).padStart(2, "0")}`;

      expect(appliedStart).toBe(expectedStart);
      expect(appliedEnd).toBe(expectedEnd);

      await allPages.salesPage.clickOnDateRangeFilterDropdown();
    });

    await test.step("Navigate to next month, apply filter and verify Power BI schema", async () => {
    let guard = 0;
    let nextMonthVisible = await allPages.salesPage.getStartRdpMonth();
    while (nextMonthVisible !== nextMonth && guard < 6) {
      await allPages.salesPage.clickOnNextMonthArrow();
      nextMonthVisible = await allPages.salesPage.getStartRdpMonth();
      guard++;
    }
    expect(nextMonthVisible).toBe(nextMonth);

    // Select start date "1" in next month
    await allPages.salesPage.clickOnStartDate("1");
    await allPages.salesPage.clickOnEndDate(nextMonth, "25");

    await allPages.salesPage.clickOnApplyButton();
    await allPages.salesPage.expectDateRangeFilterModalClosed();

    const { appliedStart, appliedEnd } = await getAppliedAdvancedDateRange(allPages.page);
    expect(appliedStart, "No advanced (date) filter found").toBeTruthy();

    const expectedEnd = `${currentYear}-${String(nextMonthNumber).padStart(2, "0")}-${String(endDate).padStart(2, "0")}`;

    expect(appliedEnd).toBe(expectedEnd);
    });
  });

  test("Verify Group By Filter Correctly Groups and Displays Data on Sales page", async () => {
    const groupByOptions = [
      "Campaign",
      "Campaign Type",
      "Product",
      "Product ID",
      "Product Group",
      "Gateway ID",
      "Acquirer",
      "Gateway Alias",
      "MID Corp",
      "MCC",
      "BIN",
      "Bank",
      "Billing Cycle",
      "Affiliate ID"
    ];

    await test.step("Navigate to Sales page and open date range filter", async () => {
      await allPages.salesPage.clickOnSalesSideNav();
      await allPages.salesPage.expectSalesHeader();
    });

    await test.step("Open Group By filter dropdown", async () => {
      await expect(allPages.salesPage.getGroupByFilterDropdown()).toBeVisible({ timeout: 60000 });
      await allPages.salesPage.clickOnGroupByFilterDropdown();
    });

    for (const option of groupByOptions) {
      await test.step(`Select in Group By filter and verify grouping`, async () => {
        await allPages.salesPage.getGroupByOption(option);
        await allPages.salesPage.getGroupBySubOption(option);
        await allPages.salesPage.closeGroupByDropDownOption();
      
      });
    }
  });

  test("Verify More Filters Dropdown Applies Selected Filters Correctly on Sales Page", async () => {
    const selectedFilterValue = "Testing Campaign - 10";

    await test.step("Navigate to Sales page and open date range filter", async () => {
      await allPages.salesPage.clickOnSalesSideNav();
      await allPages.salesPage.expectSalesHeader();
    });

    await test.step("Open More Filters dropdown and select Campaign", async () => {
      await allPages.salesPage.clickOnMoreFiltersButton();
      await allPages.salesPage.selectCampaignFilter();
      await allPages.salesPage.selectCampaignOption();
      await allPages.salesPage.closeFilterDropdown();
    });
  
    await test.step("Verify selected filter appears on top summary section", async () => {
      await allPages.salesPage.closeMoreFilterOption();
      const appliedFilter = await allPages.salesPage.getAppliedFilterText();
      console.log("Applied Filter:", appliedFilter);
      expect(appliedFilter).toContain(selectedFilterValue);
    });

    await test.step("Verify Reset button appears after applying filter", async () => {
      await allPages.salesPage.clickResetButton();
      const isResetVisible = await allPages.salesPage.expectResetButton();
      expect(isResetVisible).toBeTruthy();
    });
  });
});