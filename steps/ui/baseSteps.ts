import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { BasePage, locators as basePageLocators } from "../../pages/basePage";
import { expect } from "@playwright/test";
import {
  generateUniqueValueAndStore,
  getDateFromCurrentDate,
  toCamelCase,
} from "../../support/helpers";
import {
  assertDropdownOptions,
  assertElementText,
  assertElementWithTextIsDisplayed,
  assertElementWithTextIsNotDisplayed,
  assertExcelFile,
  assertInputValue,
  checkOption,
  clickOnButton,
  clickOnElement,
  clickOnFilteredElementWithText,
  clickOnLink,
  downloadFile,
  getIframeText,
  goTo,
  isOptionChecked,
  sendValue,
  takeScreenshot,
  typeValue,
  typeValueToIframe,
  uncheckOption,
  uploadFile,
} from "../../support/abstractUiSteps";
import { getLocators, testContext } from "../../support/testFactory";
import { PATHS, TIMEOUTS, URLS } from "../../support/constants";

const basePage = new BasePage();
let locators: any = {};

Given("I am on the {string} page", async (url: string) => {
  await goTo(url);
});

When("I go to {string} page", async (pageName: string) => {
  await global.page.goto(URLS[pageName.toUpperCase()]);
  await global.page.waitForLoadState("networkidle");
});

Then(
  "I verify that {string} page is displayed",
  async (expectedPageTitle: string) => {
    expect(global.page, `page title is not ${expectedPageTitle}`).toHaveTitle(
      expectedPageTitle
    );
  }
);

When("I close the modal", async () => {
  await global.page.getByRole("button", { name: "close" }).click();
});

Then(
  "I verify that {string} modal is displayed in {string} page",
  async (modal: string, pageName: string) => {
    locators = getLocators(pageName);
    await expect(
      global.page.locator(locators.modals[toCamelCase(modal)]),
      `${modal} modal is not displayed`
    ).toBeVisible({ timeout: TIMEOUTS.MODAL_PRESENCE });
  }
);

Then(
  "I verify that {string} modal is not displayed in {string} page",
  async (modal: string, pageName: string) => {
    locators = getLocators(pageName);
    await expect(
      global.page.locator(locators.modals[toCamelCase(modal)]),
      `${modal} modal is displayed`
    ).not.toBeVisible({ timeout: TIMEOUTS.MODAL_ABSENCE });
  }
);

When(
  "I click on the {string} button in {string} page",
  async (button: string, pageName: string) => {
    locators = getLocators(pageName);
    await clickOnButton(locators.buttons, button);
  }
);

When(
  "I click on the {string} link in {string} page",
  async (link: string, pageName: string) => {
    locators = getLocators(pageName);
    await clickOnLink(locators.links, link);
  }
);

When(
  "I click on the {string} option in {string} page",
  async (option: string, pageName: string) => {
    locators = getLocators(pageName);
    await clickOnElement(locators.labels, option);
  }
);

When(
  "I enter value {string} to input field {string} in {string} page",
  async (value: string, inputField: string, pageName: string) => {
    locators = getLocators(pageName);
    let uniqueValue: string;
    if (inputField == "Naam evenement") {
      uniqueValue = generateUniqueValueAndStore(inputField, value);
    }
    await sendValue(locators.inputs, inputField, uniqueValue || value);
  }
);

When(
  "I enter date {string} to {string} input field in {string} page",
  async (date: string, inputField: string, pageName: string) => {
    locators = getLocators(pageName);
    const dateValue = getDateFromCurrentDate(date);
    await typeValue(locators.inputs, inputField, dateValue);
  }
);

When(
  "I check the {string} option with label {string} in {string} page",
  async (labelName: string, labelText: string, pageName: string) => {
    locators = getLocators(pageName);
    await checkOption(locators.labels, labelName, labelText);
  }
);

When(
  "I uncheck the {string} option with label {string} in {string} page",
  async (labelName: string, labelText: string, pageName: string) => {
    locators = getLocators(pageName);
    await uncheckOption(locators.labels, labelName, labelText);
  }
);

Then(
  "I verify that the input field {string} has value {string} in {string} page",
  async (inputField: string, expectedValue: string, pageName: string) => {
    locators = getLocators(pageName);
    await assertInputValue(locators.inputs, inputField, expectedValue);
  }
);

Then(
  "I verify that the input field {string} has value {string} by default in {string} page",
  async (inputField: string, expectedValue: string, pageName: string) => {
    locators = getLocators(pageName);
    const element = "default " + inputField;
    await assertElementText(locators.others, element, expectedValue);
  }
);

Then(
  "I verify that dropdown {string} has following options in {string} page:",
  async (dropdown: string, pageName: string, optionsDt: DataTable) => {
    locators = getLocators(pageName);
    await assertDropdownOptions(locators.dropdowns, dropdown, optionsDt);
  }
);

Then(
  "I verify that expanded menu has following options:",
  async (optionsDt: DataTable) => {
    const expectedOptions: string[] = optionsDt.raw().flat();
    const actualOptions: string[] = await global.page
      .locator(basePageLocators.dropdowns.dropdownItems)
      .allInnerTexts();

    const isContains: boolean = expectedOptions.every((e) =>
      actualOptions.includes(e)
    );
    expect(
      isContains,
      "Expanded menu does not contain expected options"
    ).toEqual(true);
  }
);

When("I click on the {string} to download the file", async (elementText) => {
  await downloadFile(elementText);
});

Then(
  "I verify that file {string} is downloaded",
  async (expectedFileName: string) => {
    const downloadedFileName: string = testContext.download.suggestedFilename();
    expect(downloadedFileName, "").toEqual(expectedFileName);
  }
);

Then(
  "I verify that excel file has following rows:",
  async (fileContentDt: DataTable) => {
    assertExcelFile(
      PATHS.TEMP + testContext.download.suggestedFilename(),
      fileContentDt
    );
  }
);

When(
  "I hover over the {string} tab in {string} page",
  async (tab: string, pageName: string) => {
    locators = getLocators(pageName);
    await global.page.locator(locators.tabs[toCamelCase(tab)]).hover();
  }
);

When(
  "I click on the {string} dropdown item in {string} page",
  async (dropdownItem: string, pageName: string) => {
    locators = getLocators(pageName);
    await global.page
      .locator(locators.dropdownItems[toCamelCase(dropdownItem)])
      .click();
  }
);

Then(
  "I verify that popup is displayed with {string} message",
  async (expectedMessage: string) => {
    await expect(
      global.page.locator(basePageLocators.alerContainer),
      `${expectedMessage} is not displayed`
    ).toContainText(expectedMessage, { timeout: 2000 });
  }
);

When("I press {string} key", async (key: string) => {
  await page.keyboard.press(key);
});

Then(
  "I verify that text {string} is displayed on the page",
  async (text: string) => {
    await expect(
      global.page.getByText(text).first(),
      `${text} is not displayed`
    ).toBeVisible({ timeout: TIMEOUTS.TEXT_PRESENCE });
  }
);

Then(
  "I verify that text {string} is not displayed on the page",
  async (text: string) => {
    await expect(
      global.page.getByText(text).first(),
      `${text} is displayed`
    ).not.toBeVisible({ timeout: TIMEOUTS.TEXT_ABSENCE });
  }
);

Then(
  "I verify that header {string} is displayed",
  async (expectedHeader: string) => {
    await expect(
      global.page.locator(basePageLocators.headers.header),
      "Header is not correct"
    ).toHaveText(expectedHeader);
  }
);

Then(
  "I verify that the {string} input field is {string}",
  async (labelText: string, expectedOptionState: string) => {
    const expectedState: boolean = expectedOptionState == "checked";
    expect(
      await isOptionChecked(labelText),
      "Option select state is not correct"
    ).toEqual(expectedState);
  }
);

When(
  "I enter value {string} to iframe {string}",
  async (value: string, iframe: string) => {
    await typeValueToIframe(basePageLocators.iframes, iframe, value);
  }
);

Then(
  "I verify that iframe {string} has value",
  async (iframe: string, expectedValue: string) => {
    expect(
      await getIframeText(basePageLocators.iframes, iframe),
      "iframe text is not correct"
    ).toEqual(expectedValue);
  }
);

When(
  "I click on the {string} mentioned item",
  async (mentionedItem: string) => {
    await clickOnFilteredElementWithText(
      basePageLocators.others,
      "Mentioned Popup",
      mentionedItem
    );
  }
);

When(
  "I click on {string} element in {string} page",
  async (element: string, pageName: string) => {
    locators = getLocators(pageName);
    await clickOnElement(locators.others, element);
  }
);

When(
  "I select option {string} in list {string} in {string} page",
  async (option: string, select: string, pageName: string) => {
    locators = getLocators(pageName);
    await global.page
      .locator(locators.lists[toCamelCase(select)])
      .selectOption(option);
  }
);

Then(
  "I verify that element {string} has text {string} in {string} page",
  async (element: string, expectedText: string, pageName: string) => {
    locators = getLocators(pageName);
    await assertElementText(locators.others, element, expectedText);
  }
);

Then(
  "I verify that {string} is added to the {string} list in {string} page",
  async (item: string, list: string, pageName: string) => {
    locators = getLocators(pageName);
    await assertElementWithTextIsDisplayed(locators.lists, list, item);
  }
);

Then(
  "I verify that element {string} is not displayed with text {string} in {string} page",
  async (element: string, expectedText: string, pageName: string) => {
    locators = getLocators(pageName);
    await assertElementWithTextIsNotDisplayed(
      locators.others,
      element,
      expectedText
    );
  }
);

When(
  "I upload file {string} to input {string}",
  async (filePath: string, label: string) => {
    await uploadFile(filePath, label);
  }
);

Then("I verify that file {string} is uploaded", async (fileName: string) => {
  await expect(
    global.page.locator(basePageLocators.labels.dataFile(fileName)),
    `File ${fileName} could not be uploaded`
  ).toBeVisible({ timeout: TIMEOUTS.TEXT_PRESENCE });
});

When(
  "I upload a scrrenshot image to {string} input",
  async (inputLabel: string) => {
    const buffer = await takeScreenshot("uploadPhototest");
    await global.page.getByLabel(inputLabel).setInputFiles({
      name: "uploadPhototest.png",
      mimeType: "image/png",
      buffer: Buffer.from(buffer),
    });
  }
);

When(
  "I select following options in expanded menu:",
  async (optionsDt: DataTable) => {
    await basePage.deselectAllOptions();
    const options: string[] = optionsDt.raw().flat();
    for (const option of options) {
      await (await basePage.getOption(option)).click();
    }
  }
);

Then(
  "I verify that {string} button is displayed",
  async (buttontext: string) => {
    await expect(
      global.page.getByRole("button", { name: buttontext }),
      `${buttontext} button is not displayed`
    ).toBeVisible({ timeout: 2000 });
  }
);

When("I search for value {string}", async (searchTerm: string) => {
  await global.page.locator(basePageLocators.inputs.search).fill(searchTerm);
  await global.page.keyboard.press("Enter");
});

When(
  "I click on the table row that contains {string} value",
  async (text: string) => {
    await global.page
      .locator(basePageLocators.others.tableRowHasText(text))
      .click();
  }
);

When("I click on mobile menu-item {string}", async (id: string) => {
  await global.page.locator(basePageLocators.linkHasId(id)).click();
});
