🧪 Projeto de Automação de Testes - Automation Exercise

Este projeto contém testes automatizados para o site Automation Exercise utilizando Cypress como ferramenta de automação, seguindo as melhores práticas de organização e manutenibilidade.

https://img.shields.io/badge/Cypress-12.0.0-brightgreen
https://img.shields.io/badge/Node.js-16+-green
https://img.shields.io/badge/QA-Automation-blue

📋 Sobre o Projeto
Este projeto implementa testes automatizados end-to-end para o site Automation Exercise, uma plataforma dedicada à prática de automação de testes. O projeto segue uma arquitetura organizada com separação de responsabilidades.

✨ Características Principais

- Organização com Fixtures: Seletores centralizados para fácil manutenção

- Gravação de Vídeos: Captura automática da execução dos testes

- Screenshots em Falhas: Evidências visuais para debugging

- Dados Dinâmicos: Geração automática de emails únicos

- Configuração Robusta: Timeouts e configurações otimizadas

🚀 Tecnologias Utilizadas

- Cypress 15.6.0 - Framework de automação end-to-end

- JavaScript ES6+ - Linguagem de programação

- Node.js 22.12.0 - Ambiente de execução

- npm - Gerenciador de pacotes

- Git - Controle de versão

📁 Estrutura do Projeto
```text
automationExercise/
├── cypress/
│   ├── e2e/
│   │   ├── cadastro.cy.js          # Teste de cadastro de usuário
│   │   ├── fatura.cy.js            # Teste completo de compra e download de fatura
│   │   └── login-completo.cy.js    # Teste de login completo
│   ├── fixtures/
│   │   ├── example.json            # Dados de exemplo
│   │   └── selectors.json          # 🆕 Seletores centralizados para todos os testes
│   ├── support/
│   │   ├── commands.js             # Comandos customizados do Cypress
│   │   └── e2e.js                  # Configurações de suporte para testes e2e
│   ├── downloads/                  # Arquivos baixados (ex.: invoice.txt)
│   ├── screenshots/                # Capturas de tela automáticas em caso de falhas
│   └── videos/                     # 🆕 Gravações automáticas dos testes em execução
├── cypress.config.js               # Configuração principal do Cypress
├── package.json                    # Dependências e scripts do projeto
├── README.md                       # Documentação do projeto
└── tsconfig.json                   # Configuração do TypeScript (opcional)
```
⚙️ Configuração do Ambiente

1. Pré-requisitos
```bash
# Verificar instalações
node --version    # Deve ser 16+
npm --version     # Deve ser 8+
```

2. Instalação do Projeto
```bash
# Clonar o repositório (se aplicável)
git clone <url-do-repositorio>

# Navegar para o diretório
cd automationExercise

# Instalar dependências
npm install

# Instalar Cypress (se necessário)
npm install cypress --save-dev
```
3. Instalação do TypeScript (Opcional)
```bash
# Instalar TypeScript para desenvolvimento
npm install typescript @types/node --save-dev

# Criar tsconfig.json
npx tsc --init
```

🧪 Executando os Testes

Interface Gráfica do Cypress
```bash
# Abrir interface do Cypress
npx cypress open
```

Execução em Modo Headless
```bash
# Executar todos os testes
npx cypress run

# Executar teste específico de cadastro
npx cypress run --spec "cypress/e2e/cadastro.cy.js"

# Executar teste específico de login
npx cypress run --spec "cypress/e2e/login-completo.cy.js"

# 🆕 Executar teste de fluxo de compra com fatura
npx cypress run --spec "cypress/e2e/fatura.cy.js" --browser chrome

# Executar com gravação de vídeo (configuração automática)
npx cypress run --spec "cypress/e2e/fatura.cy.js" --browser chrome --headed
```
Scripts Personalizados (package.json)
```json
{
  "scripts": {
    "test": "cypress run",
    "test:headed": "cypress open",
    "test:fatura": "cypress run --spec 'cypress/e2e/fatura.cy.js'",
    "test:video": "cypress run --spec 'cypress/e2e/fatura.cy.js' --browser chrome"
  }
}
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

3. 🆕 Fluxo Completo de Compra com Download de Fatura (fatura.cy.js)

✅ Navegação para a página inicial

✅ Adição de produtos ao carrinho

✅ Finalização da compra

✅ Cadastro durante o checkout (se necessário)

✅ Preenchimento de dados de pagamento

✅ Confirmação do pedido

✅ Download da fatura (funcionalidade principal)

✅ Exclusão da conta

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

🎯 Funcionalidades Testadas

Fluxos de Negócio

- Cadastro de novos usuários

- Login com email e senha

- Adição de produtos ao carrinho

- Processo completo de checkout

- Pagamento e confirmação de pedido

- Download de faturas

Elementos de UI

- Validação de elementos na página

- Navegação entre páginas

- Manipulação de formulários

- Modal e pop-up interactions

- Upload/Download de arquivos

🔍 Estratégia de Organização

🆕 Arquivo de Seletores Centralizados (selectors.json)
```json
{
  "homePage": {
    "logo": "img[alt='Website for automation practice']",
    "firstProduct": ".features_items .product-image-wrapper",
    "addToCartButton": ".add-to-cart"
  },
  "signupPage": {
    "nameInput": "input[data-qa='signup-name']",
    "emailInput": "input[data-qa='signup-email']"
  }
  // ... mais seletores organizados por página
}
```
Vantagens desta Abordagem

✅ Manutenibilidade: Seletores centralizados em um único arquivo

✅ Reutilização: Mesmos seletores em diferentes testes

✅ Consistência: Padronização na nomeação e estrutura

✅ Atualização Rápida: Mudanças refletidas em todos os testes

📊 Evidências de Teste

Saídas Automáticas

- Vídeos: Gravados em cypress/videos/ (configurável)

- Screenshots: Capturados em cypress/screenshots/ em caso de falhas

- Downloads: Arquivos baixados salvos em cypress/downloads/

- Logs: Console output detalhado para debugging

Exemplo de Execução
```bash
# Executar teste com vídeo
npx cypress run --spec "cypress/e2e/fatura.cy.js" --browser chrome


# Verificar vídeo gerado
ls cypress/videos/fatura.cy.js.mp4

# Verificar downloads
ls cypress/downloads/invoice.txt
```

🚧 Próximos Passos

Melhorias Planejadas

- Implementar Page Objects para melhor organização

- Adicionar testes de API

- Configurar integração CI/CD (GitHub Actions)

- Adicionar relatórios Allure ou Mochawesome

- Implementar testes para mobile viewport

- Adicionar testes de performance

- Criar testes de acessibilidade

Expansão de Testes

- Testes de busca e filtros de produtos

- Testes de carrinho com múltiplos produtos

- Testes de recuperação de senha

- Testes de atualização de perfil

- Testes de avaliação de produtos

🤝 Contribuição

1.Fork o projeto

2.Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

3.Commit suas mudanças (git commit -m 'Add some AmazingFeature')

4.Push para a branch (git push origin feature/AmazingFeature)

5.Abra um Pull Request

📄 Licença

Este projeto é para fins educacionais e de portfólio.

---

📅 Última atualização: 18/11/2025
👨‍💻 Mantido por: Thayse Dias
🎯 Objetivo: Este projeto faz parte dos estudos de QA Automation utilizando Cypress e demonstra habilidades em automação de testes end-to-end seguindo boas práticas de organização e manutenibilidade.

Para dúvidas ou sugestões, entre em contato através do LinkedIn.