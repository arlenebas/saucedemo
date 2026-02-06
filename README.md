SauceDemo Automation Suite

Installation

	1. Clone this repository.
	
	2. Run npm install to install dependencies.
	
	3. Run npx playwright install --with-deps to install required browsers.
	
Running Tests

	• Run all tests: npx playwright test
	
	• Run with UI: npx playwright test --headed
	
	• View report: npx playwright show-report
	
	
CI/CD and Reports


This project uses GitHub Actions to run tests automatically on every push.

	• To find the report, go to the Actions tab on GitHub.
	
	• Click on the latest workflow run.
	
	• Click Summary (left side)
	
	• Scroll to the bottom to find the playwright-report zip file.
	
