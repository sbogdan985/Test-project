/// <reference types="cypress" />
import { slowCypressDown } from 'cypress-slow-down'
// slow down each command by the default amount
// which is 1 second
slowCypressDown()
describe('Cart and Checkout test suite', () => {
    Cypress.config("waitAfterEachCommand", 2000)
    before('Loading fixture related to testData Project', () => {
        cy.fixture('testdata').then(function (testData) {
            globalThis.testData = testData;
        })
    })
    beforeEach('navigate to the Homepage', () => {
        cy.visit('/')
    })

    it('User can add/remove a product to/from the cart', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.loginAs(testData.loginName, testData.password)
        addingProductToTheCart()
        cy.get('a[href="https://automationteststore.com/index.php?rt=checkout/cart&remove=63:545f48ecb97d7a1628419cf271302198"]').click()
        cy.contains('.contentpanel', testData.emptyCartInfo)
    })


    it('User can successfully confirm and place an Order', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.loginAs(testData.loginName, testData.password)
        addingProductToTheCart()
        cy.get('#cart_checkout2').click()
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=checkout/confirm')
        cy.get('#checkout_btn').click()
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=checkout/success')
        cy.contains('.maintext', 'Your Order Has Been Processed!')
    })

    it('User can change Payment address information at Checkout', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.loginAs(testData.loginName, testData.password)
        addingProductToTheCart()
        cy.get('#cart_checkout2').click()
        cy.get('.confirm_payment_options').contains('Edit Payment').click()
        cy.contains('.input-group', 'Change Address').click()
        fillingInNewAddress()
        cy.get('.new_address').contains('Continue').click()
        cy.get('.confirm_payment_options').then(paymentdata => {
            cy.wrap(paymentdata).contains(testData.firstName2 && testData.lastName2 && testData.address2 && testData.city2 && testData.country).should('be.visible')
        })
        cy.visit('index.php?rt=checkout/cart')
        cy.get('a[href="https://automationteststore.com/index.php?rt=checkout/cart&remove=63:545f48ecb97d7a1628419cf271302198"]').click()
        cy.contains('.contentpanel', testData.emptyCartInfo)
    })

    it('User can change Shipping address information at Checkout', () => {
        cy.contains('#customernav', 'Login or register').click()
        cy.loginAs(testData.loginName, testData.password)
        addingProductToTheCart()
        cy.get('#cart_checkout2').click()
        cy.get('.confirm_shippment_options').contains('Edit Shipping').click()
        cy.contains('.input-group', 'Change Address').click()
        fillingInNewAddress()
        cy.get('.new_address').contains('Continue').click()
        cy.get('.confirm_payment_options').then(shippingdata => {
            cy.wrap(shippingdata).contains(testData.firstName2 && testData.lastName2 && testData.address2 && testData.city2 && testData.country).should('be.visible')
        })
        cy.visit('index.php?rt=checkout/cart')
        cy.get('a[href="https://automationteststore.com/index.php?rt=checkout/cart&remove=63:545f48ecb97d7a1628419cf271302198"]').click()
        cy.contains('.contentpanel', testData.emptyCartInfo)
    })

    function addingProductToTheCart() {
        cy.get('.categorymenu').contains('Fragrance').click({ force: true })
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=product/category&path=49')
        cy.get('#maincontainer').contains('Men').click()
        cy.url().should('eq', Cypress.config().baseUrl + 'index.php?rt=product/category&path=49_51')
        cy.contains('.prdocutname', testData.productName).click()
        cy.get('.total-price').then(productPrice => {
            const productPriceValue = productPrice.text()
            console.log(productPriceValue)
            cy.contains('.productpagecart', 'Add to Cart').click()
            cy.get('table.table-bordered').find('tr').then(productInfo => {
                cy.wrap(productInfo).should('contain', testData.productName)
                cy.wrap(productInfo).should('contain', productPriceValue)
            })
        })
        cy.get('#totals_table').find('tr').eq(2).should('contain', '$90.00')
    }

    function fillingInNewAddress() {
        cy.get('#Address2Frm_firstname').type(testData.firstName2)
        cy.get('#Address2Frm_lastname').type(testData.lastName2)
        cy.get('#Address2Frm_address_1').type(testData.address2)
        cy.get('#Address2Frm_city').type(testData.city2)
        cy.get('#Address2Frm_country_id').select(testData.country)
        cy.get('#Address2Frm_zone_id').select(testData.region2)
        cy.get('#Address2Frm_postcode').type(testData.zip2)
    }
})

