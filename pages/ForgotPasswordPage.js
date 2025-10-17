import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class ForgotPasswordPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    emailInput: "#email",
    sendMailBtn: "send-mail-button",
    forgotPwd: "Forgot Password?",
    inputField: "Enter the email that you used",
    successToast:
      "Password reset link sent successfully. You can close this window now.",
  };

  getEmailInput() {
    return this.page.locator(this.locators.emailInput);
  }

  async fillEmailInput(email) {
    await expect(this.getEmailInput()).toBeVisible({ timeout: 60000 });
    await this.getEmailInput().fill(email);
  }

  getSendMailButton() {
    return this.page.getByTestId(this.locators.sendMailBtn);
  }

  async clickSendMailButton() {
    await expect(this.getSendMailButton()).toBeVisible({ timeout: 60000 });
    await this.getSendMailButton().click();
    await this.page.waitForTimeout(2000);
  }

  async expectForgotPasswordModal() {
    await expect(this.page.getByText(this.locators.forgotPwd)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.page.getByText(this.locators.inputField)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getEmailInput()).toBeVisible({ timeout: 60000 });
    await expect(this.getSendMailButton()).toBeVisible({ timeout: 60000 });
  }

  async expectSuccessToast() {
    await expect(this.page.getByText(this.locators.successToast)).toBeVisible({
      timeout: 60000,
    });
  }
}

export default ForgotPasswordPage;
