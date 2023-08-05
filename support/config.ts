Object.assign(global, {
  BROWSER: process.env.BROWSER || "chromium",
  BASE_URL: process.env.BASE_URL || "https://develop.google.com",
  BASE_ENV: process.env.BASE_ENV || "dev",
  CUCUMBER_TIMEOUT: 30000,
});
