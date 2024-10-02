/// <reference types="cypress" />
describe('Register and Login test suite', () => {
    before('Loading fixture related to BMI', () => {
        cy.fixture('testdata').then(function (test) {
            globalThis.test = test;
        })
    })
    beforeEach('navigate to the Homepage', () => {
        cy.visit('/')
    })

it('User successfully submits registration form with valid information', () => {
    cy.contains('#customernav', 'Login or register').click()
    cy.get('.newcustomer').find('button', 'Continue').click()
    cy.get('#AccountFrm_firstname').type(test.firstName);
    cy.get('#AccountFrm_lastname').type(test.lastName);
    cy.get('#AccountFrm_email').type(test.email)
    cy.get('#AccountFrm_telephone').type(test.telephone)
    cy.get('#AccountFrm_company').type(test.company)
    cy.get('#AccountFrm_address_1').type(test.address)
    cy.get('#AccountFrm_city').type(test.city)
    cy.get('[name=zone_id]').type(test.region)
    cy.get('#AccountFrm_postcode').type(test.zip)
    cy.get("[name=country_id]").select(test.country, {force: true})
    cy.get('#AccountFrm_loginname').type(test.loginName)
    cy.get('#AccountFrm_password').type(test.password)
    cy.get('#AccountFrm_confirm').type(test.password)



    



})
  


})