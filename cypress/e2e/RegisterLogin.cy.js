/// <reference types="cypress" />
import { slowCypressDown } from 'cypress-slow-down'
// slow down each command by the default amount
// which is 1 second
slowCypressDown()
describe('Register and Login test suite', () => {
    before('Loading fixture related to testData Project', () => {
        cy.fixture('testdata').then(function (testData) {
            globalThis.testData = testData;
        })
    })
    beforeEach('navigate to the Homepage', () => {
        cy.visit('/')
    })

    it('User successfully submits the registration form with valid information', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.get('.newcustomer').find('button', 'Continue').click()
        cy.get('#AccountFrm_firstname').type(testData.firstName)
        cy.get('#AccountFrm_lastname').type(testData.lastName)
        cy.get('#AccountFrm_email').type(testData.email)
        cy.get('#AccountFrm_telephone').type(testData.telephone)
        cy.get('#AccountFrm_company').type(testData.company)
        cy.get('#AccountFrm_address_1').type(testData.address)
        cy.get('#AccountFrm_city').type(testData.city)
        cy.get("[name=country_id]").select(testData.country, { force: true })
        cy.get('[name=zone_id]').select(testData.region)
        cy.get('#AccountFrm_postcode').type(testData.zip)
        cy.get('#AccountFrm_loginname').type(testData.loginName)
        cy.get('#AccountFrm_password').type(testData.password)
        cy.get('#AccountFrm_confirm').type(testData.password)
        cy.get('#AccountFrm_newsletter0').check()
        cy.get('#AccountFrm_agree').check()
        cy.contains('.btn', 'Continue').click()
        cy.get('.maintext').should('contain', testData.sucessfullyRegistrationText)
        cy.contains('.menu_text', 'Welcome back Slaven').should('be.visible')
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=account/success')
    })

    it('User successfully logs in with a valid email and password', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.loginAs(testData.firstName, testData.password)
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=account/account')
        cy.contains('.menu_text', 'Welcome back Slaven').should('be.visible')
        cy.get('.side_account_list').contains('Logoff').click()
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=account/logout')
        cy.contains('.contentpanel', 'You have been logged off your account. It is now safe to leave the computer.').should('be.visible')
    })

    it('User logs in as an existing user by entering invalid email and invalid password', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.loginAs('slavenn', 'testData123456')
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=account/login')
        cy.contains('.alert', 'Error: Incorrect login or password provided.').should('be.visible')
    })

})