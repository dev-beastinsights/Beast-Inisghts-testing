// @ts-check
import { test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';
import { signInToBI } from "../utils/test-setup.js";
dotenv.config();

test.describe('Dark light theme', () => {
  /** @type {AllPages} */
  let allPages;

  test.beforeEach("Login and navigate to Dashboard page", async ({ page }) => {
    allPages = new AllPages(page);
    await signInToBI(allPages);
  });

  test('Verify that Dashboard page UI updates correctly when switching themes.', async () => {
    await test.step('Switch to Light Theme and verify Dashboard UI updates', async () => {
      await allPages.globalFeaturesPage.changeThemeToLight();
      await allPages.globalFeaturesPage.expectLightThemeOfDashboardPage();
    })

    await test.step('Switch to Dark Theme and verify Dashboard UI updates', async () => {
      await allPages.globalFeaturesPage.changeThemeToDark();
      await allPages.globalFeaturesPage.expectDarkThemeOfDashboardPage();
    })
  })
})
