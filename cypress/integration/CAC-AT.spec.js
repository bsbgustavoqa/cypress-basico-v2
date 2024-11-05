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
          .type("Teste de inclusão.", {dealy: 0}) 
          
        cy.get("button[type=submit]")
          .click()
          .wait(500) 
          
        cy.get(".success") 
          .should("be.visible")  
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function(){
      cy.get("[id=firstName]")
      .type("Gustavo")

      cy.get("[id=lastName]")
      .type("Alves")

      cy.get("button[type=submit]")
          .click()

      cy.get(".error")
        .should("be.visible")

    })

    it.only("campo telefone continua vazio quando preenchido com valor não-numérico", function(){
      cy.get("#phone")
      .type("abcder")
      .should("have.value", "")
    })
    
})
