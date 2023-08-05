@regression @login
Feature: Login

    @login1
    Scenario Outline: DESKTOP - As a user I should be able to login with valid credentials
        When I login as '<user>' user
        Then I verify that 'Dashboard' page is displayed
        Then I verify that username is displayed as '<username>'

        Examples:
            | user              | username                |
            | testuser1             | testuser1@test.com  |

    @login2 @mobile
    Scenario Outline: MOBILE - As a user I should be able to login with valid credentials
        When I login as '<user>' user
        Then I verify that username is displayed as '<message>'

        Examples:
            | user              | message                        |
            | testuser1             | testuser1@test.com  |