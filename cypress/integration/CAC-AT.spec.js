/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function() {
    const TRES_SEGUNDOS_ESPERA = 3000
    this.beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it("Verifica o título da aplicação", function(){       
        cy.title().should("be.equal","Central de Atendimento ao Cliente TAT")
    })

    it("Preenche os campos obrigatórios e envia o formulário", function(){

        cy.clock()
        cy.get("[id=firstName]").type("Gustavo")
        cy.get("[id=lastName]").type("Alves")
        cy.get("[id=email]").type("bsb@gmail.com")    
        cy.get("[id=open-text-area]").type("Teste de inclusão.", {dealy: 0}) 
        cy.contains("button[type=submit]", "Enviar").click() 
        cy.get(".success") .should("be.visible") 
        cy.tick(TRES_SEGUNDOS_ESPERA)
        cy.get(".success").should("not.be.visible")
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function(){

      cy.clock()
      cy.get("[id=firstName]").type("Gustavo")
      cy.get("[id=lastName]").type("Alves")
      cy.contains("button[type=submit]", "Enviar").click()
      cy.get(".error").should("be.visible")
      cy.tick(TRES_SEGUNDOS_ESPERA)
      cy.get(".error").should("not.be.visible")

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
        cy.clock()
        cy.contains(".button", "Enviar") .click()
        cy.get(".error").should("be.visible")
        cy.tick(TRES_SEGUNDOS_ESPERA)
        cy.get(".error").should("not.be.visible")  
    })

    it("Envia o formuário com sucesso usando um comando customizado", function(){
      cy.clock()

      cy.fillMandatoryFieldsAndSubmit()
      cy.get(".success").should("be.visible")
      cy.tick(TRES_SEGUNDOS_ESPERA)
      cy.get(".success").should("not.be.visible")
    })

    it("seleciona um produto (YouTube) por seu texto", function(){
      cy.get("#product").select("YouTube").contains("YouTube")

    })

    it("seleciona um produto (Mentoria) por seu valor (value)", function(){
      cy.get("#product").select("mentoria").should("have.value", 'mentoria')
    })

    it("seleciona um produto (Blog) por seu índice", function(){
      cy.get("#product").select(1).contains("Blog")

    })
    
    it("marca cada tipo de atendimento", function(){
      cy.get("[type='radio']").check("feedback").should("have.value", "feedback")

    })

    it("marca cada tipo de atendimento", function(){
      cy.get("input[type='radio']")
        .should("have.length", 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should("be.checked")
        })   
    })

    it("marca ambos checkboxes, depois desmarca o último", function(){
      cy.get("input[type='checkbox']")
        .check()
        .last()
        .uncheck()
        .should("not.be.checked")
    })

    it("seleciona um arquivo da pasta fixtures", function(){
      cy.get("input[id='file-upload']")
        .selectFile("cypress/fixtures/example.json")
        .then(input =>{
           expect(input[0].files[0].name).to.equals("example.json")
        })

    })

    it("seleciona um arquivo simulando um drag-and-drop", function(){
      cy.get("input[id='file-upload']")
      .selectFile("cypress/fixtures/example.json", {action: "drag-drop"})
      .then(input =>{
         expect(input[0].files[0].name).to.equals("example.json")
      })
    })

    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function(){
      cy.get("#privacy a").should("have.attr", "target", "_blank")

    })

    it("testa a página da política de privacidade de forma independente", function(){
    cy.get("#privacy a").invoke("removeAttr", "target").click()
    cy.contains("Talking About Testing").should("be.visible")

    })


})
