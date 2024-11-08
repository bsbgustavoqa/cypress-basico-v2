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
          
        cy.contains("button[type=submit]", "Enviar")
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

      cy.contains("button[type=submit]", "Enviar")
        .click()

      cy.get(".error")
        .should("be.visible")

    })

    it("campo telefone continua vazio quando preenchido com valor não-numérico", function(){
      cy.get("#phone")
      .type("abcder")
      .should("have.value", "")
    })

    it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){
      cy.get("[id=firstName]")
          .type("Gustavo")
          .should("have.value", "Gustavo")
          .clear()
          .should("have.value", "")

        cy.get("[id=lastName]")
          .type("Alves")
          .should("have.value", "Alves")
          .clear()
          .should("have.value", "")

        cy.get("[id=email]")
          .type("bsb@gmail.com")
          .should("have.value", "bsb@gmail.com")
          .clear()
          .should("have.value", "")
          
        cy.get("#phone")
          .type("619995555")
          .should("have.value", "619995555")
          .clear()
          .should("have.value", "")  
  
    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function(){
        cy.contains(".button", "Enviar")
          .click()

        cy.get(".error")
          .should("be.visible")  
    })

    it("Envia o formuário com sucesso usando um comando customizado", function(){

      cy.fillMandatoryFieldsAndSubmit()

      cy.get(".success").should("be.visible") 

    })
    
})
