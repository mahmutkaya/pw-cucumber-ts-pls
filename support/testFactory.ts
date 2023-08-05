import { Download } from "@playwright/test";

import { parseJson } from "./helpers";
import { PATHS } from "./constants";

import { UserDto } from "../dto/userDto";

import { locators as baseLocators } from "../pages/basePage";

export function getLocators(page: string): {} {
  const locators = {
    default: baseLocators,
  };
  if (!locators[page]) throw new Error(`Unknown page name: ${page}`);
  return locators[page];
}

export function getUser(userType: string): UserDto {
  const users = parseJson(PATHS.CLIENTS);
  return users[userType];
}

export const testContext: {
  eventName: string;
  download: Download;
} = {} as any;
