🧪 Projeto de Automação de Testes - Automation Exercise

Este projeto contém testes automatizados para o site Automation Exercise utilizando Cypress como ferramenta de automação, com geração de relatórios detalhados usando Mochawesome.

https://img.shields.io/badge/Cypress-13.17.0-brightgreen
https://img.shields.io/badge/Node.js-22.12.0-green
https://img.shields.io/badge/QA-Automation-blue
https://img.shields.io/badge/GitHub_Actions-Enabled-orange
https://img.shields.io/badge/Reports-Mochawesome-purple

📋 Sobre o Projeto
Este projeto implementa testes automatizados end-to-end para o site Automation Exercise, uma plataforma dedicada à prática de automação de testes. O projeto inclui relatórios HTML detalhados para análise dos resultados.

---

✨ Características Principais

✅ Organização com Fixtures: Seletores centralizados para fácil manutenção
✅ Relatórios Mochawesome: Relatórios HTML detalhados e combinados
✅ CI/CD Integrado: GitHub Actions com execução paralela
✅ Health Checks: Verificações de performance e disponibilidade
✅ Gravação de Vídeos: Captura automática da execução dos testes
✅ Screenshots em Falhas: Evidências visuais para debugging
✅ Dados Dinâmicos: Geração automática de emails únicos
✅ Configuração Robusta: Timeouts e configurações otimizadas

---

🚀 Tecnologias Utilizadas

- Cypress - Framework de automação end-to-end

- JavaScript - Linguagem de programação

- Node.js - Ambiente de execução

- npm - Gerenciador de pacotes

- Git - Controle de versão

---

📁 Estrutura do Projeto
```text
automationExercise/
├── .github/workflows/
│   └── cypress.yml                 # GitHub Actions workflow
├── cypress/
│   ├── e2e/
│   │   ├── cadastro.cy.js          # Teste de cadastro de usuário
│   │   ├── fatura.cy.js            # Teste completo de compra e download de fatura
│   │   ├── login-completo.cy.js    # Teste de login completo
│   │   ├── avaliacao.cy.js         # Teste de adição de avaliação ao produto
│   │   ├── add_produto_car.cy.js   # Teste de adicionar produto ao carrinho
│   │   ├── adicionarAvaliacao.cy.js # Teste de adicionar avaliação
│   │   └── health-check.cy.js      # Testes de health check e performance
│   ├── fixtures/
│   │   ├── example.json            # Dados de exemplo
│   │   └── selectors.json          # Seletores centralizados
│   ├── support/
│   │   ├── commands.js             # Comandos customizados do Cypress
│   │   └── e2e.js                  # Configurações de suporte
│   ├── downloads/                  # Arquivos baixados (ex.: invoice.txt)
│   ├── screenshots/                # Capturas de tela automáticas
│   ├── videos/                     # Gravações automáticas
│   └── reports/                    # Relatórios de teste (mochawesome)
├── cypress.config.js               # Configuração principal do Cypress
├── package.json                    # Dependências e scripts do projeto
├── tsconfig.json                   # Configuração TypeScript
└── README.md                       # Documentação do projeto
```
---

⚙️ Configuração do Ambiente

1. Pré-requisitos
```bash
# Verificar instalações
node --version    # Deve ser 16+
npm --version     # Deve ser 8+
```

2. Instalação do Projeto
```bash
# Instalar dependências
npm install

# Instalar Cypress 
npx cypress install
```
---

🧪 Executando os Testes

Interface Gráfica do Cypress
```bash
# Abrir interface do Cypress
npx cypress open
```
---

🚀 CI/CD com GitHub Actions
O projeto inclui pipeline automatizado no GitHub Actions:

Execução em 3 containers paralelos

Health checks automáticos

Upload de vídeos e screenshots

Geração de relatórios HTML

Trigger em push e pull requests

Arquivo de configuração: .github/workflows/cypress.yml

---

📝 Casos de Teste Implementados

1. Cadastro de Usuário (cadastro.cy.js)

✅ Navegação para página de cadastro

✅ Preenchimento do formulário de cadastro

✅ Validação de conta criada com sucesso

✅ Verificação de login automático após cadastro

2. Login Completo (login-completo.cy.js)

✅ Cadastro de novo usuário

✅ Logout da conta

✅ Login com credenciais válidas

✅ Validação de login bem-sucedido

3. 🆕 Fluxo Completo de Compra com Download de Fatura (fatura.cy.js)

✅ Navegação para a página inicial

✅ Adição de produtos ao carrinho

✅ Finalização da compra

✅ Cadastro durante o checkout (se necessário)

✅ Preenchimento de dados de pagamento

✅ Confirmação do pedido

✅ Download da fatura (funcionalidade principal)

✅ Exclusão da conta

4. 🆕 Adição de Avaliação ao Produto (avaliacao.cy.js)

✅ Navegação para a página de produtos

✅ Seleção de um produto para visualizar detalhes

✅ Verificação da seção de avaliação

✅ Preenchimento do formulário de avaliação (nome, email, comentário)

✅ Envio da avaliação

✅ Validação de mensagem de sucesso

5. Adicionar produtos ao carrinho

✅ Abrir navegador

✅ Acessar URL

✅ Validar página inicial

✅ Clicar em “Produtos”

✅ Adicionar 1º produto

✅ Continuar comprando

✅ Adicionar 2º produto

✅ Abrir carrinho

✅ Validar que ambos os produtos estão no carrinho

✅ Validar preço, quantidade e total

6. Health Checks (health-check.cy.js)

✅ Verificação de disponibilidade do site

✅ Testes de performance

✅ Validação de elementos críticos

✅ Monitoramento de erros no console

---

🔧 Configuração do Cypress

O arquivo cypress.config.js está configurado com:

- Base URL: https://automationexercise.com

- Timeouts Otimizados:

    - Comando padrão: 10 segundos

    - Carregamento de página: 30 segundos

- Viewport: 1280x720 pixels

- Gravação de Vídeo: Habilitada com compressão

- Screenshots: Automáticos em falhas

- Retry Logic: Reexecução automática em falhas

---

🎯 Funcionalidades Testadas

Fluxos de Negócio

- Cadastro de novos usuários

- Login com email e senha

- Adição de produtos ao carrinho

- Processo completo de checkout

- Pagamento e confirmação de pedido

- Download de faturas

- 🆕 Avaliação de produtos

Elementos de UI

- Validação de elementos na página

- Navegação entre páginas

- Manipulação de formulários

- Modal e pop-up interactions

- Upload/Download de arquivos

Performance e Health

- Tempos de carregamento

- Disponibilidade do serviço

- Integridade de elementos críticos

- Monitoramento de erros

---

🤝 Contribuição

1. Fork o projeto

2. Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')

4. Push para a branch (git push origin feature/AmazingFeature)

5. Abra um Pull Request

---

📄 Licença
Este projeto é para fins educacionais e de portfólio.

---

📅 Última atualização: 27/11/2025
👨‍💻 Mantido por: Thayse Dias
🎯 Objetivo: Este projeto faz parte dos estudos de QA Automation utilizando Cypress e demonstra habilidades em automação de testes end-to-end com geração de relatórios profissionais.