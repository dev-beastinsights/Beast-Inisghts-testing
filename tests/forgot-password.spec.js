// @ts-nocheck
import { expect, test } from "@playwright/test";
import AllPages from "../pages/AllPages.js";
import dotenv from "dotenv";
import { waitForEmail, searchExistingEmails } from "../utils/receiveMail.js";

dotenv.config();

test.describe("Forgot Password", () => {
  /** @type {AllPages} */
  let allPages;
  let mail = "dhruvi.balar.alphabin+1@gmail.com";
  let password = process.env.GMAIL_APP_PASSWORD || "jtgs bvdq bvnv zctm";

  const imapConfig = {
    user: mail,
    password: password,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 30000,
    tlsOptions: { rejectUnauthorized: false },
  };

  test.beforeEach(async ({ page }) => {
    allPages = new AllPages(page);
  });

  test("Verify Forgot Password flow works properly ", async () => {
    const testStartTime = new Date();
    let resetLink = "";
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newPassword = `Test@${randomNumber.toString()}`;

    await test.step("Navigate to Login page", async () => {
      await allPages.loginPage.navigateToLoginPage();
      await allPages.loginPage.expectSignInModal();
    });

    await test.step("Click Forgot Password link", async () => {
      await allPages.loginPage.clickForgotPasswordLink();
      await allPages.forgotPasswordPage.expectForgotPasswordModal();
    });

    await test.step("Submit email for password reset", async () => {
      await allPages.forgotPasswordPage.fillEmailInput(
        mail
      );
      await allPages.forgotPasswordPage.clickSendMailButton();
      await allPages.forgotPasswordPage.expectSuccessToast();
    });

    await test.step("Wait for NEW password reset email (ignoring old emails)", async () => {
      const result = await waitForEmail(
        {
          imapConfig,
          from: "notifications@beastinsights.co",
          subjectContains: "password",
          extractLinkRegex: /https?:\/\/[^\s'"<>]+/gi,
          receivedAfter: testStartTime,
        },
        {
          timeout: 5 * 60 * 1000,
          pollInterval: 1000,
        }
      );

      if (result === null) {
        expect(result).not.toBeNull();
      }

      resetLink = result.value;
    });

    await test.step("Navigate to reset password page using extracted link", async () => {
      await allPages.page.goto(resetLink);
      await allPages.page.waitForLoadState("networkidle");
      await allPages.resetPasswordPage.expectResetPasswordPage();
    });

    await test.step("Fill and submit new password", async () => {
      await allPages.resetPasswordPage.fillResetPasswordForm(
        newPassword,
        newPassword
      );
      await allPages.resetPasswordPage.expectSuccessToastPasswordReset();
    });

    await test.step("Login with updated password", async () => {
      await allPages.loginPage.expectSignInModal();
      await allPages.loginPage.loginToBeastInsights(
        process.env.USERNAME1 ? process.env.USERNAME1 : 'Dhruvi1',
        newPassword
      );
      await allPages.dashboardPage.skipOnboardingTour();
      await allPages.dashboardPage.expectDashboardPage();
    });
  });
});
