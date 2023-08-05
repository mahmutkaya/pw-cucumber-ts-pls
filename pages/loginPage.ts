export const locators = {
  continueBtn: '[value="Ga verder"]',
  passwordInput: "#tbCode",
  submitBtn: "#buttonInloggen",
  userNameInput: "#tbAccount",
  userNameText: "[name=widgetpersonal] h1.name, #voornaam",
};

export class LoginPage {
  async login(userName: string, password?: string) {
    await global.page.locator(locators.userNameInput).fill(userName);
    password &&
      (await global.page.locator(locators.passwordInput).fill(password));
    await global.page.locator(locators.submitBtn).click();

    await global.page.waitForLoadState("networkidle");
  }
}
