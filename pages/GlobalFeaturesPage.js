import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

class GlobalFeaturesPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
  }

  locators = {
    themeSwitchToggle: "theme-switch",
    attributeType: "aria-checked",
    darkTheme: "//html",
  };

  getThemeSwitchToggleButton() {
    return this.page.getByTestId(this.locators.themeSwitchToggle);
  }

  async changeThemeToDark() {
    await this.page.waitForTimeout(1000);
    if (
      (await this.getThemeSwitchToggleButton().getAttribute(
        this.locators.attributeType
      )) === "false"
    ) {
      await this.getThemeSwitchToggleButton().click();
    }
    await expect(this.getThemeSwitchToggleButton()).toHaveAttribute(
      this.locators.attributeType,
      "true"
    );
  }

  async expectDarkThemeOfDashboardPage() {
    await expect(this.page.locator(this.locators.darkTheme)).toHaveAttribute(
      "class",
      "dark"
    );

    const backgroundColor = await this.page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    const fontColor = await this.page.evaluate(() => {
      return getComputedStyle(document.body).color;
    });

    expect(backgroundColor).toBe("rgb(18, 19, 26)");
    expect(fontColor).toBe("rgb(255, 255, 255)");
  }

  async changeThemeToLight() {
    await this.page.waitForTimeout(1000);
    if (
      (await this.getThemeSwitchToggleButton().getAttribute(
        this.locators.attributeType
      )) === "true"
    ) {
      await this.getThemeSwitchToggleButton().click();
    }
    await expect(this.getThemeSwitchToggleButton()).toHaveAttribute(
      this.locators.attributeType,
      "false"
    );
  }

  async expectLightThemeOfDashboardPage() {
    await expect(this.page.locator(this.locators.darkTheme)).toHaveAttribute(
      "class",
      "light"
    );
    const backgroundColor = await this.page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    const fontColor = await this.page.evaluate(() => {
      return getComputedStyle(document.body).color;
    });

    expect(backgroundColor).toBe("rgb(255, 255, 255)");
    expect(fontColor).toBe("rgba(0, 8, 38, 0.9)");
  }
}

export default GlobalFeaturesPage;
