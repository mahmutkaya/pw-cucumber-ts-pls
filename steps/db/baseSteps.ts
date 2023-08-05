import { Then } from "@cucumber/cucumber";
import { getLastDashboardNotificationWithText } from "../../support/db/queries";
import { getLastEmailWithText } from "../../support/db/queries";
import { getLastPushNotificationWithText } from "../../support/db/queries";
import { getQueryRecordSet } from "../../support/db/utils";
import { expect } from "@playwright/test";
import { executeWithDelay } from "../../support/helpers";
import { TIMEOUTS } from "../../support/constants";

Then(
  /^I verify that email is(?: (.*))? sent to '([^']*)' and saved with text '([^']*)' to DB$/,
  async (isNotSent: string, emailadres: string, tekst: string) => {
    const getEmails = async () => await getQueryRecordSet(getLastEmailWithText(emailadres, tekst));
    let res = await getEmails();
    let startDate = new Date().getTime();
    let ellapsedTime = 0;
    while (!res.length && ellapsedTime < TIMEOUTS.EMAILS_PRESENCE) {
      res = await executeWithDelay(await getEmails(), TIMEOUTS.QUERY_DELAY);
      ellapsedTime = +new Date().getTime() - startDate;
    }

    isNotSent && expect(res.length).toEqual(0);
    !isNotSent && expect(res.length).toEqual(1);
  }
);

Then(
  /^I verify that pushnotification is(?: (.*))? sent to '([^']*)' and saved with text '([^']*)' to DB$/,
  async (isNotSent: string, loginNaam: string, tekst: string) => {
    const getPushNotification = async () => await getQueryRecordSet(getLastPushNotificationWithText(loginNaam, tekst));
    let res = await getPushNotification();
    let startDate = new Date().getTime();
    let ellapsedTime = 0;
    while (!res.length && ellapsedTime < TIMEOUTS.EMAILS_PRESENCE) {
      res = await executeWithDelay(await getPushNotification(), TIMEOUTS.QUERY_DELAY);
      ellapsedTime = +new Date().getTime() - startDate;
    }

    isNotSent && expect(res.length).toEqual(0);
    !isNotSent && expect(res.length).toEqual(1);
  }
);

Then(
  /^I verify that dashboardnotification is(?: (.*))? sent to '([^']*)' and saved with text '([^']*)' to DB$/,
  async (isNotSent: string, loginNaam: string, tekst: string) => {
    const getDashboardNotification = async () => await getQueryRecordSet(getLastDashboardNotificationWithText(loginNaam, tekst));
    let res = await getDashboardNotification();
    let startDate = new Date().getTime();
    let ellapsedTime = 0;
    while (!res.length && ellapsedTime < TIMEOUTS.EMAILS_PRESENCE) {
      res = await executeWithDelay(await getDashboardNotification(), TIMEOUTS.QUERY_DELAY);
      ellapsedTime = +new Date().getTime() - startDate;
    }

    isNotSent && expect(res.length).toEqual(0);
    !isNotSent && expect(res.length).toEqual(1);
  }
);
