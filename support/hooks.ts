import {
  BeforeAll,
  AfterAll,
  After,
  Before,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, firefox, webkit, LaunchOptions } from "@playwright/test";
import { takeScreenshot } from "./abstractUiSteps";
import { testContext } from "./testFactory";
import { deleteFile } from "./helpers";
import { PATHS } from "./constants";

const options: LaunchOptions = {
  args: ["--remote-allow-origins=*"],
  headless: false,
  slowMo: 500,
};

//remove colors from test results due to encoding ANSI colors format issue of current cucumber version
process.env["FORCE_COLOR"] = "0";

setDefaultTimeout(global.CUCUMBER_TIMEOUT);

BeforeAll(async () => {
  console.log("starting browser");
  switch (process.env.BROWSER) {
    case "firefox":
      global.browser = await firefox.launch(options);
      break;
    case "webkit":
      global.browser = await webkit.launch(options);
      break;
    default:
      global.browser = await chromium.launch(options);
  }
});

AfterAll(async () => {
  await global.browser.close();
});

Before(async () => {
  global.context = await global.browser.newContext({ ignoreHTTPSErrors: true });
  global.page = await global.context.newPage();
});

After(async function (scenario) {
  if (scenario.result!.status === Status.FAILED) {
    const buffer = await takeScreenshot(scenario.pickle.name);
    await this.attach(buffer, "image/png");
  }
  await global.page.close();
  await global.context.close();
});

Before("@mobile", async () => {
  global.context = await browser.newContext({
    viewport: { width: 360, height: 720 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
    ignoreHTTPSErrors: true,
  });
  global.page = await global.context.newPage();
});

After("@deleteFile", async () => {
  //delete file from pw temp directory
  await testContext.download.delete();
  //delete file from project temp directory
  deleteFile(PATHS.TEMP + testContext.download.suggestedFilename());
});
