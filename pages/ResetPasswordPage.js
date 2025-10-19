import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class ResetPasswordPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    passwordInput: "#password",
    confirmPasswordInput: "#confirmPassword",
    submitButton: "submit-button",
    setNewPwd: `Set New Password`,
    successToast: "Password changed successfully",
  };

  getPasswordInput() {
    return this.page.locator(this.locators.passwordInput);
  }

  getConfirmPasswordInput() {
    return this.page.locator(this.locators.confirmPasswordInput);
  }

  getSubmitButton() {
    return this.page.getByTestId(this.locators.submitButton);
  }

  async expectResetPasswordPage() {
    await expect(this.page.getByText(this.locators.setNewPwd)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getPasswordInput()).toBeVisible({ timeout: 60000 });
    await expect(this.getConfirmPasswordInput()).toBeVisible({
      timeout: 60000,
    });
    await expect(this.getSubmitButton()).toBeVisible({ timeout: 60000 });
  }

  async fillResetPasswordForm(password, confirmPassword) {
    await this.getPasswordInput().fill(password);
    await this.getConfirmPasswordInput().fill(confirmPassword);
    await this.getSubmitButton().click();
  }

  async expectSuccessToastPasswordReset() {
    await expect(this.page.getByText(this.locators.successToast)).toBeVisible({
      timeout: 60000,
    });
    await expect(this.page.getByText(this.locators.successToast)).toBeHidden({
      timeout: 60000,
    });
  }
}

export default ResetPasswordPage;
