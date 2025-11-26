@avaliacao-produto
Feature: Sistema de avaliação de produtos
  Como usuário registrado ou visitante
  Quero poder avaliar produtos que visualizei
  Para compartilhar minha experiência e ajudar outros compradores

  Scenario: Enviar avaliação do Produto com sucesso
    Dado que estou na página inicial
    Quando clico em "Products"
    E clico em "View Product" no primeiro produto
    E preencho nome "Thayse", email "thayse@teste.com" e avaliação "Produto excelente!"
    E clico em "Submit"
    Então devo ver a mensagem "Thank you for your review."