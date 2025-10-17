import AllPages from "../pages/AllPages.js";

/** @type {AllPages} */

export async function signInToBI(allPages) {
    await allPages.loginPage.navigateToLoginPage();
    await allPages.loginPage.loginToBeastInsights(
        process.env.USERNAME,
        process.env.PASSWORD
    );
    await allPages.dashboardPage.skipOnboardingTour();
}