🧪 Projeto de Automação de Testes - Automation Exercise
Este projeto contém testes automatizados para o site Automation Exercise utilizando Cypress como ferramenta de automação.

📋 Sobre o Projeto
Este é o primeiro commit do projeto de automação de testes, contendo dois casos de teste principais:

1. Cadastro de usuário - Fluxo completo de criação de nova conta

2. Login e validação - Autenticação com credenciais válidas

🚀 Tecnologias Utilizadas

- Cypress - Framework de automação

- JavaScript - Linguagem de programação

- Node.js - Ambiente de execução

- npm - Gerenciador de pacotes

📁 Estrutura do Projeto
```text
automationExercise/
├── cypress/
│   ├── e2e/
│   │   ├── cadastro.cy.js          # Teste de cadastro de usuário
│   │   └── login-completo.cy.js    # Teste de login completo
│   ├── fixtures/                   # Dados de teste
│   ├── support/                    # Comandos customizados
│   └── downloads/                  # Arquivos baixados
├── cypress.config.js              # Configuração do Cypress
└── package.json                   # Dependências do projeto
```
⚙️ Configuração do Ambiente

1. Inicializar o projeto npm
```bash
npm init -y
```

2. Instalar Cypress 
```bash
# Instalar Cypress como dependência de desenvolvimento
npm install cypress --save-dev
```

3. Instalando o TypeScript (opcional)
```bash
# Instalar TypeScript
npm install typescript @types/node --save-dev

# Criar tsconfig.json
npx tsc --init
```
🧪 Executando os Testes

Abrir interface do Cypress
```bash
npx cypress open
```
Executar testes em modo headless
```bash
# Executar todos os testes
npx cypress run

# Executar teste específico de cadastro
npx cypress run --spec "cypress/e2e/cadastro.cy.js"

# Executar teste específico de login
npx cypress run --spec "cypress/e2e/login-completo.cy.js"
```
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

🔧 Configuração do Cypress

- O arquivo cypress.config.js está configurado com:

- Timeout aumentado para 120 segundos

- Viewport de 1280x720 pixels

- Compartilhamento de dados entre testes

- URL base do Automation Exercise

🎯 Funcionalidades Testadas

-Cadastro de novos usuários

- Login com email e senha

- Validação de elementos na página

- Navegação entre páginas

- Manipulação de formulários

🔍 Próximos Passos

- Adicionar mais casos de teste

- Implementar relatórios de teste

- Configurar CI/CD

- Adicionar testes de API

- Criar testes para mobile


Última atualização 14/11/2025
Este projeto faz parte dos estudos de QA Automation utilizando Cypress.