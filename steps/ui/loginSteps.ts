import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage, locators } from "../../pages/loginPage";
import { UserDto } from "../../dto/userDto";
import { goTo } from "../../support/abstractUiSteps";
import { BasePage } from "../../pages/basePage";
import { getUser } from "../../support/testFactory";

const loginPage = new LoginPage();
const basePage = new BasePage();

When("I login as {string} user", async (userType: string) => {
  const user: UserDto = getUser(userType);

  await basePage.setCookies(user.loginname);
  await goTo("login");
  await loginPage.login(user.loginname, user.password);
});
