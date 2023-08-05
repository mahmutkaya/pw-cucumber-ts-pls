/* eslint-disable no-var */
import type { APIRequestContext, Browser, BrowserContext, Page } from "@playwright/test";

declare global {
  var browser: Browser;
  var context: BrowserContext;
  var page: Page;
  var request: APIRequestContext;
  var BROWSER: string;
  var BASE_URL: string;
  var BASE_ENV: string;
  var CUCUMBER_TIMEOUT: number;
}