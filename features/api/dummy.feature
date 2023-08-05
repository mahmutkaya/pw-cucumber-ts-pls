@api @dummy
Feature: Opdrachtgever

    @dummy1
    Scenario: Verify that user is created with correct data
        When I send post request to 'xxx' api with 'user' data
        Then I verify that opdrachtgever is saved with following details to db:
            | name  | testuser          |
            | email | testuser@test.com |
