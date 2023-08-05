import { Download, expect } from "@playwright/test";
import { REGEX, parseExcel, toCamelCase } from "./helpers";
import { DataTable } from "@cucumber/cucumber";
import { PATHS, TIMEOUTS } from "./constants";
import { testContext } from "./testFactory";

export async function takeScreenshot(screenshotName: string) {
  return await global.page.screenshot({
    path: `test-results/screenshots/${screenshotName}.png`,
    fullPage: true,
  });
}

export async function goTo(url: string) {
  await global.page.goto(global.BASE_URL + url, {
    waitUntil: "domcontentloaded",
  });
}

export async function clickOnElement(
  locators: {},
  element: string
): Promise<void> {
  await global.page.locator(locators[toCamelCase(element)]).first().click();
}

export async function clickOnButton(
  locators: {},
  buttonName: string
): Promise<void> {
  try {
    await global.page
      .getByRole("button", { name: buttonName, exact: true })
      .click({ timeout: TIMEOUTS.ELEMENT_CLICK });
  } catch (e) {
    await clickOnElement(locators, buttonName);
  }
}

export async function clickOnLink(
  locators: {},
  linkName: string
): Promise<void> {
  try {
    await global.page
      .getByRole("link", { name: linkName, exact: true })
      .click({ timeout: TIMEOUTS.ELEMENT_CLICK });
  } catch (e) {
    await clickOnElement(locators, linkName);
  }
}

/**
 * gets list of elements, filters by text then clicks to filtered element
 * @param locators
 * @param elements
 * @param text
 */
export async function clickOnFilteredElementWithText(
  locators: {},
  elements: string,
  text: string
): Promise<void> {
  await global.page
    .locator(locators[toCamelCase(elements)])
    .filter({ hasText: text })
    .click();
}

/**
 * All input elements seems to be out-of-viewport,
 * so we check if input is unchecked but click to it's label to select
 * @param locators
 * @param labelName
 * @param labelText
 */
export async function checkOption(
  locators: {},
  labelName: string,
  labelText: string
) {
  !isOptionChecked(labelText) &&
    (await global.page.locator(locators[toCamelCase(labelName)]).click());
}

/**
 * All input elements seems to be out-of-viewport,
 * so we check if input is checked but click to it's label to unselect
 * @param locators
 * @param labelName
 * @param labelText
 */
export async function uncheckOption(
  locators: {},
  labelName: string,
  labelText: string
) {
  isOptionChecked(labelText) &&
    (await global.page.locator(locators[toCamelCase(labelName)]).click());
}

/**
 * checks if option is selected
 * @param labelText
 * @returns boolean
 */
export async function isOptionChecked(labelText: string) {
  return await global.page.getByLabel(labelText).isChecked();
}

/**
 * clears an input field then sends value
 * @param locators
 * @param inputField
 * @param value
 */
export async function sendValue(
  locators: {},
  inputField: string,
  value: string
): Promise<void> {
  await global.page.locator(locators[toCamelCase(inputField)]).clear();
  await global.page.locator(locators[toCamelCase(inputField)]).fill(value);
}

/**
 * clicks an input field and sends value by pressing keyboard
 * @param locators
 * @param inputField
 * @param value
 */
export async function typeValue(
  locators: {},
  inputField: string,
  value: string,
  delay?: number
): Promise<void> {
  await global.page
    .locator(locators[toCamelCase(inputField)])
    .click({ force: true });
  await page.keyboard.type(value, { delay });
}

/**
 * assert the value of input field
 * @param locators
 * @param inputField
 * @param expectedValue
 */
export async function assertInputValue(
  locators: {},
  inputField: string,
  expectedValue: string
): Promise<void> {
  await expect(
    global.page.locator(locators[toCamelCase(inputField)]),
    `the value of ${inputField} is not ${expectedValue}`
  ).toHaveValue(expectedValue);
}

/**
 * selects an input elemnt in iframe and sends value by pressing keyboard
 * @param locators
 * @param iframeChildElement
 * @param value
 * @param delay
 */
export async function typeValueToIframe(
  locators: {},
  iframeChildElement: string,
  value: string,
  delay: number = TIMEOUTS.IFRAME_TYPE_DELAY
): Promise<void> {
  await selectIframe(locators)
    .locator(locators[toCamelCase(iframeChildElement)])
    .click({ force: true });
  await global.page.waitForTimeout(TIMEOUTS.IFRAME_CLICK);
  await page.keyboard.type(value, { delay });
}

export async function getIframeText(locators: {}, iframeChildElement: string) {
  return (
    await selectIframe(locators)
      .locator(locators[toCamelCase(iframeChildElement)])
      .innerText()
  )
    .replaceAll(REGEX.NBSP, " ")
    .trim();
}

export function selectIframe(locators: {}, iframe: string = "inhoud") {
  return global.page.frameLocator(locators[toCamelCase(iframe)]).first();
}

export async function uploadFile(filePath: string, label: string) {
  await global.page.getByLabel(label).setInputFiles(PATHS.RESOURCES + filePath);
}

export async function dragAndDrop(
  locators: {},
  itemToBeDragged: string,
  itemToDropAt: string
) {
  await global.page
    .locator(locators[toCamelCase(itemToBeDragged)])
    .dragTo(global.page.locator(locators[toCamelCase(itemToDropAt)]));
}

/**
 * asserts element text
 * @param locators
 * @param element
 * @param expectedText
 */
export async function assertElementText(
  locators: {},
  element: string,
  expectedText: string
): Promise<void> {
  await expect(
    global.page.locator(locators[toCamelCase(element)]).first(),
    `the value of ${element} is not ${expectedText}`
  ).toContainText(expectedText);
}

export async function assertElementWithTextIsDisplayed(
  locators: {},
  element: string,
  elementText: string
) {
  await expect(
    global.page.locator(locators[toCamelCase(element)](elementText)),
    `${element} with ${elementText} is not found`
  ).toBeVisible({ timeout: TIMEOUTS.TEXT_PRESENCE });
}

export async function assertElementWithTextIsNotDisplayed(
  locators: {},
  element: string,
  elementText: string
) {
  console.log();
  await expect(
    global.page.locator(locators[toCamelCase(element)](elementText)),
    `${element} with ${elementText} is displayed`
  ).not.toBeVisible({ timeout: TIMEOUTS.TEXT_ABSENCE });
}

/**
 * assert that dropdown (select tag) contains expected options
 * @param locators
 * @param dropdown
 * @param optionsDt
 */
export async function assertDropdownOptions(
  locators: {},
  dropdown: string,
  optionsDt: DataTable
) {
  const expectedOptions: string[] = optionsDt.raw().flat();
  console.log("expectedOptions", expectedOptions);
  const actualOptions: string[] = await global.page
    .locator(locators[toCamelCase(dropdown)])
    .locator("option")
    .allInnerTexts();

  console.log("actualOptions", actualOptions);

  expect(
    actualOptions,
    `dropdown does not contain some of the options: ${expectedOptions}`
  ).toMatchObject(expectedOptions);
}

/**
 * asserts excel file content
 * @param filePath
 * @param fileContentDt
 */
export async function assertExcelFile(
  filePath: string,
  fileContentDt: DataTable
) {
  const fileContent = fileContentDt.raw();
  for (const [i, expectedRow] of fileContent.entries()) {
    const actualRow: string = parseExcel(filePath)[i].join(", ");
    expect(actualRow, "Excel file content is not correct").toEqual(
      expectedRow.join()
    );
  }
}

/**
 * downloads file and stores download info to testContext
 * @param elementText
 */
export async function downloadFile(elementText: string) {
  const downloadPromise = page.waitForEvent("download");
  await page.getByText(elementText).click();
  testContext.download = await downloadPromise;
  await testContext.download.saveAs(
    PATHS.TEMP + testContext.download.suggestedFilename()
  );
}
