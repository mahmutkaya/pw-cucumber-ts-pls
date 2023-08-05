import { Before } from "@cucumber/cucumber";
import { request } from "@playwright/test";

Before('@api @opdrachtgever', async () => {
  global.request = await request.newContext({
    baseURL: "https://develop.aybler.nl",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      "x-hubspot-request-timestamp": "1690289265201",
      "x-hubspot-signature-v3": "6JL8gwt6oJEuDRLWt2IhYZUqv7YULWBY/1kNH9/T/IQ=",
    },
  });
});

Before('@mailhogApi', async () => {
  global.request = await request.newContext({
    baseURL: "http://192.168.242.232:8025/api/v2/",
    // extraHTTPHeaders: {
    //   "Content-Type": "application/json",
    //   "x-hubspot-request-timestamp": "1690289265201",
    //   "x-hubspot-signature-v3": "6JL8gwt6oJEuDRLWt2IhYZUqv7YULWBY/1kNH9/T/IQ=",
    // },
  });
});
