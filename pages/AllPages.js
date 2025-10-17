import DashboardPage from "./DashboardPage";
import GlobalFeaturesPage from "./GlobalFeaturesPage";
import LoginPage from "./LoginPage";
import SalesPage from "./SalesPage";
import ReportingPage from "./ReportingPage";
import BINRoutingPage from "./BINRoutingPage";
import UsersPage from "./UsersPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";

class AllPages {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.globalFeaturesPage = new GlobalFeaturesPage(page);
        this.salesPage = new SalesPage(page);
        this.reportingPage = new ReportingPage(page);
        this.binRoutingPage = new BINRoutingPage(page);
        this.usersPage = new UsersPage(page);
        this.forgotPasswordPage = new ForgotPasswordPage(page);
        this.resetPasswordPage = new ResetPasswordPage(page);
    }
}

export default AllPages;