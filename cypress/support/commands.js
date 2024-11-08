// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function() {
    cy.get("[id=firstName]").type("Gustavo")
    cy.get("[id=lastName]").type("Alves")
    cy.get("[id=email]").type("bsb@gmail.com")  
    cy.get("[id=open-text-area]").type("Teste de inclusão.", {dealy: 0})
    cy.contains("button[type=submit]", "Enviar").click() //cy.get("button[type=submit]").contains("Enviar").click().wait(500)
})