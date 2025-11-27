pipeline {
    agent any

    tools {
        nodejs 'nodejs'   // ← nome exato da instalação Node.js no seu Jenkins
    }

    environment {
        CYPRESS_VIDEO = 'true'   // grava vídeo de todos os testes
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
                    # Baixa a libatomic que estava faltando (só na primeira execução)
                    if [ ! -f /usr/lib/x86_64-linux-gnu/libatomic.so.1 ]; then
                        mkdir -p /usr/lib/x86_64-linux-gnu
                        curl -sL https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/libatomic.so.1 \
                             -o /usr/lib/x86_64-linux-gnu/libatomic.so.1
                    fi

                    # Instala as dependências do projeto
                    npm ci --prefer-offline --no-audit

                    # Verifica e baixa o binário do Cypress se necessário
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
        body { font-family: Arial, sans-serif; margin: 40px; background: #f9f9f9; line-height: 1.6; }
        h1 { color: #2c3e50; }
        a { color: #2980b9; font-size: 18px; text-decoration: none; }
        .status { font-weight: bold; padding: 5px 10px; border-radius: 5px; }
        .SUCCESS { background: #d4edda; color: #155724; }
        .UNSTABLE { background: #fff3cd; color: #856404; }
        .FAILURE { background: #f8d7da; color: #721c24; }
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

            // 2º Agora arquiva tudo (vídeos, screenshots e o relatório recém-criado)
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4',   allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'relatorio.html', allowEmptyArchive: true, fingerprint: true
        }

        success {
            echo 'SUCESSO TOTAL!'
        }
        unstable {
            echo 'ALGUNS TESTES FALHARAM – veja os vídeos, screenshots e o relatório.html'
        }
        failure {
            echo 'PIPELINE QUEBROU – mas os artefatos foram salvos'
        }
    }
}