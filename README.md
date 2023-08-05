# About

- Automation Testing for xxx using Playwright, Cucumber and Typescript

- Environment and specs: [develop.google](https://develop.google.nl/)

- Test results [reports.cucumber](https://reports.cucumber.io/profile)


### dependencies:
- [playwright](https://playwright.dev/docs/intro#installing-playwright)
- [cucumber-js](https://cucumber.io/docs/installation/javascript/)
- [typescript](https://www.typescriptlang.org/download)
- [ts-node](https://typestrong.org/ts-node/docs/)
- [tsconfig-paths](https://github.com/dividab/tsconfig-paths#readme)

<hr></hr>

### Setting Up
These instructions will get you a copy of the project up and running on your local machine.

- [vs code](https://code.visualstudio.com/)
- [git-bash](https://git-scm.com/downloads): Install git-bash with pre-defined configurations (next.., next.. and finish).
- [node.js](https://nodejs.org/en): We use v18.x for this project. You can install it directly from node.js oficial website or via *nvm* which is recommended to install different versions of nodejs and switch easly between them in case you have another project require a different version.
  + **Install node.js via nvm:** Open git-bash and execute following command
    ```shell
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    ```
  + Open .bashrc file with your prefered editor an paste the following source lines *(nano ~/.bashrc)*:
    ```shell
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    ```
    - save the file (ctrl+o then enter) and exit from the editor (ctrl+x)
    - Now you should see nvm version if you type *nvm -v* in terminal

<br>

  + Execute following command to install node.js v18.x:
    ```shell
    nvm i 18
    ```
    + After installation is completed you should see node.js version if you type *node -v* and npm version *npm -v* in terminal.

<br>

- Download the automation project [TestAutomationPlaywright](https://github.com/mahmutkaya/ui-api-db-pw-cucumber-ts)
    
- Open project in VS Code and open terminal *ctrl+shift+`*. Select Git Bash in the dropdown menu on the right side of + icon on the top-right of terminal. And execute following command to install dependencies:
    ```shell
    npm i
    ```
- After installation is completed you can run tests via bash-terminal:
    ```shell
    npm run test
    ```
    *This will execute the regression suite, so if you want to run a specific test suite or a scenario, add tags=@desiredTag before test script*
    ```shell
    tags=@loginSuccess npm run test
    ```
- You can also run tests via Run button in vs-code:
  + Click Run and Debug button on the left nav-bar of vs-code or press Ctrl+shift+d
  + Select a mode in the Run and Debug dropdown menu and click Run (green button)
  *if you see error like `'npm' is not recognized as the name of a cmdlet..`*
  *then add `C:\Users\{yourUserName}\.nvm\versions\node\v18.16.1\bin` To the end of your Path variable on the "User variable" section of the Environment Variables on the System Properties. After that, reopen your vs-code and try again*


Running tests in CI/CD pipeline:
- ...


<br><hr>
TO-DO:
- Test project structure and code convention
- Branch naming and pr flow
