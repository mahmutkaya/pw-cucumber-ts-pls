const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "test-results/cucumber-json-report.json",
  output: "test-results/cucumber-html-report.html",
  screenshotsDirectory: "test-results/screenshots/",
  launchReport: !process.env.CI,
  noInlineScreenshots: false,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  storeScreenshots: false,
};

reporter.generate(options);
