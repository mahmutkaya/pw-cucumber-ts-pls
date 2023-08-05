import { After, Before } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { testContext } from "../testFactory";
import { getEventByName } from "./queries";
import { callStoredProcedure, getQueryRecordSet } from "./utils";
import { SP } from "./storedProcedures";

After("@deleteEvent", async () => {
  let res = await getQueryRecordSet('getEventByName(testContext.naamEvenement)');
  expect(res.length).toEqual(1);
  await callStoredProcedure(SP.DeleteEvent, { Id: res[0].Id });
  res = await getQueryRecordSet('getEventByName(testContext.naamEvenement)');
  expect(res.length).toEqual(0);
});
