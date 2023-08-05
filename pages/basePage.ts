import { Locator } from "@playwright/test";
import { goTo } from "../support/abstractUiSteps";

export const locators = {
  dropdowns: {
    dropdownItems: "[role=menu] [class*=dropdown-item]",
  },
  headers: {
    header: "header h1, header h2",
  },
  iframes: {
    nieuwBericht: "#tinymce",
    inhoud: "#Inhoud_ifr",
  },
  inputs: {
    search: "input[type=search]",
  },
  labels: {
    dataFile: (text: string) => `[data-files] label:has-text('${text}')`,
  },
  others: {
    mentionedPopup: ".mention-popup mention",
    tableRowHasText: (text: string) => `tbody tr:has-text('${text}')`,
  },
  alerContainer: "#global-alert-container",
  buttonHasText: (text: string) => `button:has-text("${text}")`,
  departmentsModal: "#AfdelingenModal_ModalId-content",
  divWithId: (id: string) => `div#${id}`,
  linkHasId: (id: string) => `a#${id}`,
  linkHasText: (text: string) => `a:has-text("${text}")`,
  listitemWithId: (id: string) => `li#${id}`,
  loginNameInput: "#LoginName",
  modalWithHeader: (headerText: string) =>
    `div[class='modal-header']:has-text("${headerText}")`,
  regtestFunction: (name: string) => `[data-search-name="${name}"]`,
  removeAllCookies: "#btn_RemoveAll",
  setCookieBtn: "#btnZetCookie",
  spanHasText: (text: string) => `span:has-text("${text}")`,
  textBox: ".tox-edit-area",
  workplaceNameInput: "#WerkplekAanmakenModal_ModalId-body #Naam",
};

export class BasePage {
  async setCookies(userName: string) {
    await goTo("test/cookies");
    await global.page.locator(locators.removeAllCookies).click();
    await global.page.locator(locators.loginNameInput).fill(userName);
    await global.page.locator(locators.setCookieBtn).click();
    await global.page.waitForLoadState("networkidle");
  }

  async getOption(option: string) {
    return global.page
      .locator(locators.dropdowns.dropdownItems)
      .filter({ hasText: option });
  }

  async deselectAllOptions() {
    const options: Locator[] = await global.page
      .locator(locators.dropdowns.dropdownItems)
      .all();
    for (const option of options) {
      (await option.getAttribute("class")).includes("active") &&
        (await option.click());
    }
  }
}
