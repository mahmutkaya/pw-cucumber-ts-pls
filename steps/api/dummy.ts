import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getRequestBody } from "../../support/api/apiUtils";

When(
  "I send post request to {string} api with {string} data",
  async (endpoint: string, requestBodyFile: string) => {
    const response = await global.request.post(endpoint, {
      data: JSON.stringify(getRequestBody(requestBodyFile)),
      failOnStatusCode: true,
    });
    expect(response.ok()).toBeTruthy();
  }
);
