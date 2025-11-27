pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        CYPRESS_VIDEO = 'true'
        // Força o Node/Cypress a encontrar a libatomic que vamos colocar no home do usuário
        LD_LIBRARY_PATH = "${env.HOME}/lib:${env.LD_LIBRARY_PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar dependências') {
            steps {
                sh '''
                    # Cria diretório no home do usuário jenkins (sempre tem permissão)
                    mkdir -p ~/lib

                    # Baixa a libatomic para o diretório do usuário (nunca dá erro de permissão)
                    curl -sL https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/libatomic.so.1 \
                         -o ~/lib/libatomic.so.1

                    # Instala dependências do projeto
                    npm ci --prefer-offline --no-audit

                    # Verifica o Cypress (agora ele acha a libatomic graças ao LD_LIBRARY_PATH)
                    npx cypress verify
                '''
            }
        }

        stage('Executar testes') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm run test:avaliacao-bdd'
                }
            }
        }
    }

    post {
        always {
            // 1º Cria o relatório HTML bonito
            sh '''
                cat > relatorio.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Automation Exercise - Build #${BUILD_NUMBER}</title>
    <style>
        body {font-family: Arial, sans-serif; margin: 40px; background: #f9f9f9; line-height: 1.6;}
        h1 {color: #2c3e50;}
        a {color: #2980b9; font-size: 18px; text-decoration: none;}
        .status {font-weight: bold; padding: 8px 12px; border-radius: 6px; color: white;}
        .SUCCESS {background: #28a745;}
        .UNSTABLE {background: #ffc107; color: #212529;}
        .FAILURE {background: #dc3545;}
    </style>
</head>
<body>
    <h1>Automation Exercise - Build #${BUILD_NUMBER}</h1>
    <p><strong>Branch:</strong> ${GIT_BRANCH}</p>
    <p><strong>Status:</strong> <span class="status ${currentBuild.currentResult}">${currentBuild.currentResult}</span></p>
    <p><strong>Data/Hora:</strong> $(date)</p>
    <hr>
    <p><a href="${BUILD_URL}" target="_blank">Abrir build completo no Jenkins</a></p>
</body>
</html>
EOF
            '''

            // 2º Agora arquiva tudo (vídeos, screenshots e relatório)
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4',   allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'relatorio.html', allowEmptyArchive: true, fingerprint: true
        }

        success  { echo 'SUCESSO TOTAL!' }
        unstable { echo 'ALGUNS TESTES FALHARAM – veja os vídeos, screenshots e relatório.html' }
        failure  { echo 'PIPELINE QUEBROU – mas os artefatos foram salvos' }
    }
}