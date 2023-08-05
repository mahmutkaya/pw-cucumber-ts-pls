const requiredPaths = [
  "support/**",
  "support/*",
  "steps/**",
  "pages/**",
  "resources/**/*.ts",
  "dto/*.ts",
  "db/*.ts",
  "test.setup.js",
];

const common = {
  requireModule: ["ts-node/register", "tsconfig-paths/register"],
  require: requiredPaths,
  path: "features/**/*.feature",
  tags: process.env.tags || "@regression",
};

module.exports = {
  default: {
    ...common,
    format: ["progress-bar", "json:test-results/cucumber-json-report.json"],
    retry: 0,
  },
  ci: {
    ...common,
    format: [
      "json:test-results/cucumber-json-report.json",
      "junit:test-results/cucumber-junit-report.xml",
    ],
    publish: true,
    parallel: 4,
    retry: 1,
  },
};
