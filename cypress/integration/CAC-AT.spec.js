/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function() {
    this.beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it("Verifica o título da aplicação", function(){       
        cy.title().should("be.equal","Central de Atendimento ao Cliente TAT")
    })

    it("Preenche os campos obrigatórios e envia o formulário", function(){
        cy.get("[id=firstName]")
          .type("Gustavo")

        cy.get("[id=lastName]")
          .type("Alves")

        cy.get("[id=email]")
          .type("bsb@gmail.com")  
          
        cy.get("[id=open-text-area]")
          .type("Teste de inclusão.") 
          
        cy.get("button[type=submit]")
          .click()
          .wait(500) 
          
        cy.get(".success") 
          .should("be.visible")  
    })
})
