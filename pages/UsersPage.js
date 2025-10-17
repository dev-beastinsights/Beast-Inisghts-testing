import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class UsersPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    usersSideNav: '[data-test-id="nav-item-users"]',
    userDetailsModal: '[role="dialog"]',
    pagesInUserDetailsModal: '[role="dialog"] span.truncate',
    removePageIcon: "+ svg",
    pagesInUsersList: '//label[text()="Pages"]',
    userDetailModal: '[role="dialog"] span.truncate',
    emailInput: '//label[text()="Email"]',
    reportUserList: "//ancestor::tr//td/div",
    reportModal: '[role="dialog"]',
    deleteButton: "//ancestor::tr//td/button",
    closeIconInDeleteUserModal: '[role="dialog"] > button',
    enterEmail: "Enter email address",
    sendBtn: "add-user-modal-send-button",
    successToast: "User added successfully",
    saveBtn: "edit-pages-modal-save-button",
    updatedSuccessToast: "User updated successfully",
    closeUserModal: "delete-modal-close-button",
    deleteSuccessToast: "User deleted successfully",
    deleteUserModal: "delete-modal-delete-button",
    deleteUserText: "Are you sure you want to delete this user?",
  };

  getUsersSideNav() {
    return this.page.locator(this.locators.usersSideNav);
  }

  async clickOnUsersSideNav() {
    await expect(this.getUsersSideNav()).toBeVisible({ timeout: 60000 });
    await this.getUsersSideNav().click();
  }

  async expectUsersHeader() {
    await expect(this.page.getByRole("heading", { name: "Users" })).toBeVisible(
      { timeout: 60000 }
    );
  }

  getAddUsersButton() {
    return this.page.getByRole("button", { name: "Add Users" });
  }

  async clickOnAddUsersButton() {
    await expect(this.getAddUsersButton()).toBeVisible({ timeout: 60000 });
    await this.getAddUsersButton().click();
  }

  getPageInUserDetailsModalByName(name) {
    return this.page
      .locator(this.locators.pagesInUserDetailsModal)
      .filter({ hasText: name })
      .first();
  }

  async clickRemoveIconOfPageInUserDetailsModal(pageName) {
    await expect(this.getPageInUserDetailsModalByName(pageName)).toBeVisible({
      timeout: 60000,
    });
    await this.getPageInUserDetailsModalByName(pageName)
      .locator(this.locators.removePageIcon)
      .first()
      .click();
  }

  getEmailInput() {
    return this.page.getByPlaceholder(this.locators.enterEmail);
  }

  async fillEmailInput(email) {
    await expect(this.getEmailInput()).toBeVisible({ timeout: 60000 });
    await this.getEmailInput().fill(email);
  }

  getSendButton() {
    return this.page.getByTestId(this.locators.sendBtn);
  }

  async clickSendButton() {
    await expect(this.getSendButton()).toBeVisible({ timeout: 60000 });
    await this.getSendButton().click();
  }

  async expectUsersDetailsModal() {
    await expect(
      this.page.getByRole("heading", { name: "User Details" })
    ).toBeVisible({ timeout: 60000 });
    await expect(this.page.locator(this.locators.pagesInUsersList)).toBeVisible(
      { timeout: 60000 }
    );

    const pages = await this.page
      .locator(this.locators.userDetailModal)
      .count();
    expect(pages).toBeGreaterThan(0);
    for (let i = 1; i <= pages; i++) {
      await expect(
        this.page.locator(this.locators.userDetailModal).nth(i - 1)
      ).toBeVisible({ timeout: 60000 });
    }

    await expect(this.page.locator(this.locators.emailInput)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getEmailInput()).toBeVisible({ timeout: 60000 });
    await expect(this.getSendButton()).toBeVisible({ timeout: 60000 });
  }

  async fillUserDetailsModal(email) {
    await this.fillEmailInput(email);
    await this.clickSendButton();
  }

  async expectSuccessToast() {
    await expect(this.page.getByText(this.locators.successToast)).toBeVisible({
      timeout: 60000,
    });
  }

  getAddedEmailInUsersList(email) {
    return this.page.locator(`//td[text()='${email}']`);
  }

  async expectUserAddedInUsersList(email) {
    await expect(this.getAddedEmailInUsersList(email)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getDeleteButtonByEmail(email)).toBeVisible({
      timeout: 60000,
    });
  }

  getReportsInUsersList(email) {
    return this.getAddedEmailInUsersList(email)
      .locator(this.locators.reportUserList)
      .first();
  }

  async clickReportsInUsersList(email) {
    await expect(this.getReportsInUsersList(email)).toBeVisible({
      timeout: 60000,
    });
    await this.getReportsInUsersList(email).click();
  }

  async clickReportsInSelectReportsModal(reportName) {
    await this.page.locator(`//label[text()="${reportName}"]`).first().click();
  }

  getSaveButtonInSelectReportsModal() {
    return this.page.getByTestId(this.locators.saveBtn);
  }

  async clickSaveButtonInSelectReportsModal() {
    await expect(this.getSaveButtonInSelectReportsModal()).toBeVisible({
      timeout: 60000,
    });
    await this.getSaveButtonInSelectReportsModal().click();
  }

  async expectSuccessToastForUserUpdate() {
    await expect(
      this.page.getByText(this.locators.updatedSuccessToast)
    ).toBeVisible({ timeout: 60000 });
  }

  async expectSelectReportsModal() {
    await expect(this.page.locator(this.locators.reportModal)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getSaveButtonInSelectReportsModal()).toBeVisible({
      timeout: 60000,
    });
  }

  getPageInUsersList(email, pageName) {
    return this.getAddedEmailInUsersList(email)
      .locator(this.locators.reportUserList)
      .filter({ hasText: pageName })
      .first();
  }

  async expectRemovedPageFromUserDetailsModal(email, pageName) {
    await expect(this.getPageInUsersList(email, pageName)).toBeHidden({
      timeout: 60000,
    });
  }

  async expectPagesFromUserDetailsModal(email, pageName) {
    await expect(this.getPageInUsersList(email, pageName)).toBeVisible({
      timeout: 60000,
    });
  }

  async expectUserDeleted(email) {
    await expect(this.getAddedEmailInUsersList(email)).toBeHidden({
      timeout: 60000,
    });
  }

  getDeleteButtonByEmail(email) {
    return this.getAddedEmailInUsersList(email)
      .locator(this.locators.deleteButton)
      .first();
  }

  async clickDeleteButtonByEmail(email) {
    await expect(this.getDeleteButtonByEmail(email)).toBeVisible({
      timeout: 60000,
    });
    await this.getDeleteButtonByEmail(email).click();
  }

  getCloseButtonInDeleteUserModal() {
    return this.page.getByTestId(this.locators.closeUserModal);
  }

  async clickCloseButtonInDeleteUserModal() {
    await expect(this.getCloseButtonInDeleteUserModal()).toBeVisible({
      timeout: 60000,
    });
    await this.getCloseButtonInDeleteUserModal().click();
  }

  getDeleteButtonInDeleteUserModal() {
    return this.page.getByTestId(this.locators.deleteUserModal);
  }

  async clickDeleteButtonInDeleteUserModal() {
    await expect(this.getDeleteButtonInDeleteUserModal()).toBeVisible({
      timeout: 60000,
    });
    await this.getDeleteButtonInDeleteUserModal().click();
  }

  async expectDeleteUserSuccessToast() {
    await expect(
      this.page.getByText(this.locators.deleteSuccessToast)
    ).toBeVisible({ timeout: 60000 });
  }

  getCloseIconInDeleteUserModal() {
    return this.page.locator(this.locators.closeIconInDeleteUserModal);
  }

  async clickCloseIconInDeleteUserModal() {
    await expect(this.getCloseIconInDeleteUserModal()).toBeVisible({
      timeout: 60000,
    });
    await this.getCloseIconInDeleteUserModal().click();
  }

  async expectDeleteUserModal() {
    await expect(
      this.page.getByRole("heading", { name: "Delete" })
    ).toBeVisible({ timeout: 60000 });
    await expect(this.page.getByText(this.locators.deleteUserText)).toBeVisible(
      { timeout: 60000 }
    );
    await expect(this.getCloseButtonInDeleteUserModal()).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getDeleteButtonInDeleteUserModal()).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getCloseIconInDeleteUserModal()).toBeVisible({
      timeout: 60000,
    });
  }

  async expectDeleteUserModalIsClosed() {
    await expect(this.page.getByRole("heading", { name: "Delete" })).toBeHidden(
      { timeout: 60000 }
    );
  }
}

export default UsersPage;
