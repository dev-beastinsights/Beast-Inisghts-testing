# BI Automation Testing Framework
A comprehensive end-to-end testing framework for Beast Insights BI platform using Playwright and JavaScript. This framework automates testing of various BI features including reporting, BIN routing, user management, filters, theme switching, and password reset flows.

## 🚀 Technologies Used
- **JavaScript (ES6+)** - Primary programming language with ES Modules
- **Playwright** (v1.54.1) - End-to-end testing framework
- **Node.js** (v16+) - Runtime environment
- **dotenv** (v17.2.1) - Environment variable management
- **imap-simple** (v5.1.0) - IMAP email client for password reset testing
- **mailparser** (v3.7.5) - Email parsing for verification flows

## 🚀 Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Create .env file with your credentials
echo "USERNAME=your_username
PASSWORD=your_password
USERNAME1=your_secondary_username
GMAIL_APP_PASSWORD=your_gmail_app_password" > .env

# 4. Run tests
npx playwright test

# 5. View test report
npx playwright show-report
```

## 📋 Prerequisites
Before running this project, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🛠️ Installation
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```
3. **Create environment file**
   Create a `.env` file in the root directory with the following variables:
   ```env
   USERNAME=your_primary_username
   PASSWORD=your_primary_password
   USERNAME1=your_secondary_username
   GMAIL_APP_PASSWORD=your_gmail_app_password
   ```
   **Note**: 
   - `USERNAME` and `PASSWORD` are used for standard test authentication
   - `USERNAME1` is used for password reset flow testing
   - `GMAIL_APP_PASSWORD` is required for forgot password tests that verify email delivery

## 🎯 Test Coverage
The framework covers the following test scenarios:

### 1. **BIN Routing Tests** (`BIN-routing.spec.js`)
- ✅ CSV report export functionality
- ✅ JSON report export functionality
- ✅ Data validation between UI and exported files (Bank Name, Approval Lift, Revenue Impact)
- ✅ Export/Share section verification

### 2. **Reporting Setup Tests** (`reporting.spec.js`)
- ✅ Product details editing (Subscription Type, Group, Cost, CPA)
- ✅ Subscription type management (initial + rebill, straight sales)
- ✅ Exclude from reports functionality
- ✅ Save operation with persistence verification
- ✅ Discard operation with proper cleanup
- ✅ Autofill functionality using AI for empty Group fields
- ✅ AI indicator icon validation

### 3. **User Management Tests** (`users.spec.js`)
- ✅ User creation with email and page permissions
- ✅ User deletion with confirmation modal
- ✅ User editing and report access management
- ✅ Page access control (Sales, Retention, MID Performance, Overview)
- ✅ Modal close functionality testing
- ✅ Success toast notifications

### 4. **Filter Tests** (`filter.spec.js`)
- ✅ Date range filtering with custom date selection
- ✅ Date preset filters (Yesterday, Last 7 days, Last calendar week, Last 4 weeks, Last 3 months, Last 6 months, Month to date)
- ✅ Clear button functionality to reset filters
- ✅ Calendar navigation (previous/next month arrows)
- ✅ Power BI advanced filter schema validation
- ✅ Group By filter (Campaign, Campaign Type, Product, Product ID, Product Group, Gateway ID, Acquirer, Gateway Alias, MID Corp, MCC, BIN, Bank, Billing Cycle, Affiliate ID)
- ✅ More Filters dropdown with Campaign selection
- ✅ Filter persistence and Reset button verification

### 5. **Theme Tests** (`dark-light-theme.spec.js`)
- ✅ Dark/Light theme switching on Dashboard
- ✅ Theme UI updates verification

### 6. **Export Embedded Visuals Tests** (`export-embedded-visuals.spec.js`)
- ✅ Export underlying data in XLSX format
- ✅ Export summarized data in CSV format
- ✅ File format verification
- ✅ Export modal functionality

### 7. **Password Reset Tests** (`forgot-password.spec.js`)
- ✅ Forgot password flow end-to-end
- ✅ Password reset email delivery verification via IMAP
- ✅ Email link extraction and navigation
- ✅ New password submission
- ✅ Login with updated password
- ✅ Email timestamp filtering to avoid old emails

## 🚀 Running Tests
### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/BIN-routing.spec.js
npx playwright test tests/reporting.spec.js
npx playwright test tests/users.spec.js
npx playwright test tests/filter.spec.js
npx playwright test tests/dark-light-theme.spec.js
npx playwright test tests/export-embedded-visuals.spec.js
npx playwright test tests/forgot-password.spec.js
```

### Run Tests in Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with Specific Browser
```bash
npx playwright test --project=chromium
```
**Note**: Currently only Chromium is configured. Firefox and WebKit are commented out in `playwright.config.js`.

## 📊 Test Reports
After running tests, you can view detailed reports:
1. **HTML Report**
   ```bash
   npx playwright show-report
   ```
   This opens an HTML report in your browser showing test results, screenshots, and videos.
2. **Report Location**
   - HTML Report: `playwright-report/index.html`
   - Screenshots: `test-results/` directory
   - Videos: `test-results/` directory

## ⚙️ Configuration
### Playwright Configuration
The `playwright.config.js` file contains:
- **Test Directory**: `./tests`
- **Base URL**: `https://app.beastinsights.co/`
- **Timeout**: 90 seconds (90000ms)
- **Retries**: 2 retries on CI, 0 locally
- **Workers**: 2 parallel workers locally, 1 on CI
- **Fully Parallel**: Tests run in parallel mode
- **Browsers**: Chromium (Desktop Chrome) - default and only enabled browser
- **Screenshots**: `only-on-failure`
- **Videos**: `retain-on-failure`
- **Traces**: `on-first-retry`
- **Reporters**: 
  - List reporter (console output)
  - HTML reporter (`playwright-report/index.html`)

### Environment Variables
Create a `.env` file with:
```env
USERNAME=your_beast_insights_username
PASSWORD=your_beast_insights_password
USERNAME1=your_secondary_username_for_password_reset
GMAIL_APP_PASSWORD=your_gmail_app_specific_password
```

### Adding New Utilities
1. Create utility functions in the `utils/` directory
2. Export functions using ES6 module syntax
3. Import utilities in test files as needed
4. Keep utilities focused and reusable (dates, downloads, filters, etc.)

## 🐛 Troubleshooting
### Common Issues

1. **Browser Installation Issues**
   ```bash
   npx playwright install --force
   ```

2. **Environment Variables Not Loading**
   - Ensure `.env` file is in the root directory
   - Check variable names match exactly: `USERNAME`, `PASSWORD`, `USERNAME1`, `GMAIL_APP_PASSWORD`
   - Restart your terminal/IDE after creating/modifying `.env`
   - Verify `dotenv.config()` is called in test files

3. **Test Timeouts**
   - Default timeout is 90 seconds (90000ms)
   - Increase timeout in `playwright.config.js` if needed
   - Check network connectivity to `https://app.beastinsights.co/`
   - Verify base URL is accessible

4. **Login Issues**
   - Verify credentials in `.env` file are correct
   - Check if the application is accessible
   - Ensure no 2FA is required

### Debug Mode
Run tests in debug mode to step through execution:
```bash
npx playwright test --debug
```