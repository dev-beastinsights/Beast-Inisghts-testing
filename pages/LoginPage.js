import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    beastInsightsLogo: "beastinsights-logo",
    userNameOrEmailLabel: '[for="usernameOrEmail"]',
    userNameOrEmailInput: "#usernameOrEmail",
    passwordLabel: '[for="password"]',
    passwordInput: "#password",
    forgotPasswordLink: "Forgot Password?",
    loginButton: "login-button",
    signInText: "Sign in to your Account",
    loginSuccessToast: "Logged in successfully",
  };

  async navigateToLoginPage() {
    await this.navigateTo("/");
  }

  getBeastInsightsLogo() {
    return this.page.getByAltText(this.locators.beastInsightsLogo).nth(0);
  }

  getUserNameOrEmailLabel() {
    return this.page.locator(this.locators.userNameOrEmailLabel);
  }

  getUserNameOrEmailInput() {
    return this.page.locator(this.locators.userNameOrEmailInput);
  }

  getPasswordLabel() {
    return this.page.locator(this.locators.passwordLabel);
  }

  getPasswordInput() {
    return this.page.locator(this.locators.passwordInput);
  }

  getForgotPasswordLink() {
    return this.page.getByText(this.locators.forgotPasswordLink);
  }

  async clickForgotPasswordLink() {
    await expect(this.getForgotPasswordLink()).toBeVisible({ timeout: 60000 });
    await this.getForgotPasswordLink().click();
  }

  getLoginButton() {
    return this.page.getByTestId(this.locators.loginButton);
  }

  async expectSignInModal() {
    await expect(this.getBeastInsightsLogo()).toBeVisible();
    await expect(this.page.getByText(this.locators.signInText)).toBeVisible();
    await expect(this.getUserNameOrEmailLabel()).toBeVisible();
    await expect(this.getUserNameOrEmailInput()).toBeVisible();
    await expect(this.getPasswordLabel()).toBeVisible();
    await expect(this.getPasswordInput()).toBeVisible();
    await expect(this.getForgotPasswordLink()).toBeVisible();
    await expect(this.getLoginButton()).toBeVisible();
  }

  async loginToBeastInsights(usernameOrEmail, password) {
    await this.expectSignInModal();
    await this.getUserNameOrEmailInput().pressSequentially(usernameOrEmail, {
      delay: 100,
    });
    await this.getPasswordInput().pressSequentially(password, { delay: 100 });
    await this.getLoginButton().click();
    await expect(
      this.page.getByText(this.locators.loginSuccessToast)
    ).toBeVisible({ timeout: 30000 });
  }
}

export default LoginPage;
