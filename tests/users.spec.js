// @ts-nocheck
import { expect, test } from "@playwright/test";
import AllPages from "../pages/AllPages.js";
import dotenv from "dotenv";
import { signInToBI } from "../utils/test-setup.js";
dotenv.config();

test.describe("Users", () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach("Login and navigate to Dashboard page", async ({ page }) => {
    allPages = new AllPages(page);
    await signInToBI(allPages);
  });

  test("Verify that Add/Delete Users is working properly in Users page", async () => {
    const email = `dhruvi.alphabin+${Date.now()}@gmail.com`;

    await test.step("Navigate to Users page", async () => {
      await allPages.usersPage.clickOnUsersSideNav();
      await allPages.usersPage.expectUsersHeader();
    });

    await test.step("Open Add Users modal", async () => {
      await allPages.usersPage.clickOnAddUsersButton();
      await allPages.usersPage.expectUsersDetailsModal();
    });

    await test.step("Remove 'Sales' page and add user", async () => {
      await allPages.usersPage.clickRemoveIconOfPageInUserDetailsModal("Sales");
      await expect(allPages.usersPage.getPageInUserDetailsModalByName("Sales")).toBeHidden({ timeout: 60000 });
      await allPages.usersPage.fillUserDetailsModal(email);
      await allPages.usersPage.expectSuccessToast();
    });

    await test.step("Verify user added and 'Sales' removed", async () => {
      await allPages.usersPage.expectUserAddedInUsersList(email);
      await allPages.usersPage.expectRemovedPageFromUserDetailsModal(email, "Sales");
    });

    await test.step("Test closing Delete User modal", async () => {
      await allPages.usersPage.clickDeleteButtonByEmail(email);
      await allPages.usersPage.expectDeleteUserModal();
      await allPages.usersPage.clickCloseButtonInDeleteUserModal();
      await allPages.usersPage.expectDeleteUserModalIsClosed();

      await allPages.usersPage.clickDeleteButtonByEmail(email);
      await allPages.usersPage.expectDeleteUserModal();
      await allPages.usersPage.clickCloseIconInDeleteUserModal();
      await allPages.usersPage.expectDeleteUserModalIsClosed();
    });

    await test.step("Delete user and verify deletion", async () => {
      await allPages.usersPage.clickDeleteButtonByEmail(email);
      await allPages.usersPage.expectDeleteUserModal();
      await allPages.usersPage.clickDeleteButtonInDeleteUserModal();
      await allPages.usersPage.expectDeleteUserSuccessToast();
      await allPages.usersPage.expectUserDeleted(email);
    });
  });

  test("Verify that Users is able to Edit existing Users", async () => {
    const email = `dhruvi.alphabin+${Date.now()}@gmail.com`;
    const pages = ["Sales", "Retention", "MID Performance", "Overview"];

    await test.step("Navigate to Users page", async () => {
      await allPages.usersPage.clickOnUsersSideNav();
      await allPages.usersPage.expectUsersHeader();
    });

    await test.step("Open Add Users modal", async () => {
      await allPages.usersPage.clickOnAddUsersButton();
      await allPages.usersPage.expectUsersDetailsModal();
    });

    await test.step("Remove pages and add user", async () => {
      for (const page of pages) {
        await allPages.usersPage.clickRemoveIconOfPageInUserDetailsModal(page);
        await expect(allPages.usersPage.getPageInUserDetailsModalByName(page)).toBeHidden({ timeout: 60000 });
      }
      await allPages.usersPage.fillUserDetailsModal(email);
      await allPages.usersPage.expectSuccessToast();
    });

    await test.step("Verify user added and pages removed", async () => {
      await allPages.usersPage.expectUserAddedInUsersList(email);
      for (const page of pages) {
        await allPages.usersPage.expectRemovedPageFromUserDetailsModal(email, page);
      }
      await allPages.usersPage.clickReportsInUsersList(email);
    });

    await test.step("Edit user reports", async () => {
      await allPages.usersPage.expectSelectReportsModal();
      for (const page of pages) {
        await allPages.usersPage.clickReportsInSelectReportsModal(page);
      }
      await allPages.usersPage.clickSaveButtonInSelectReportsModal();
      await allPages.usersPage.expectSuccessToastForUserUpdate();
    });

    await test.step("Verify updated pages in user details", async () => {
      for (const page of pages) {
        await allPages.usersPage.expectPagesFromUserDetailsModal(email, page);
      }
    });

    await test.step("Delete user and verify deletion", async () => {
      await allPages.usersPage.clickDeleteButtonByEmail(email);
      await allPages.usersPage.expectDeleteUserModal();
      await allPages.usersPage.clickDeleteButtonInDeleteUserModal();
      await allPages.usersPage.expectDeleteUserSuccessToast();
      await allPages.usersPage.expectUserDeleted(email);
    });
  });
});
