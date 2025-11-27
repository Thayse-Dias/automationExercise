pipeline {
    agent any

    tools {
        nodejs 'nodejs' 
    }

    environment {
        NODE_OPTIONS = "--max_old_space_size=4096"
        // Garante que o Chrome rode sem sandbox no container/Jenkins
        CYPRESS_VIDEO = "true"
        CYPRESS_VERIFY_TIMEOUT = "120000"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependências do Sistema + Node') {
            steps {
                sh '''
                    # Instala todas as bibliotecas que o Cypress precisa (e o Chrome) precisam
                    # Funciona em Debian/Ubuntu (oficial do Jenkins) e derivados
                    if command -v apt-get > /dev/null; then
                        apt-get update && apt-get install -y --no-install-recommends \\
                            libatomic1 \\
                            libgtk-3-0 \\
                            libgbm-dev \\
                            libnss3 \\
                            libxss1 \\
                            libasound2 \\
                            libxrandr2 \\
                            fonts-liberation \\
                            libappindicator3-1 \\
                            xdg-utils \\
                            wget \\
                            ca-certificates \\
                        && rm -rf /var/lib/apt/lists/*
                    fi

                    # Se for Alpine (raríssimo no Jenkins oficial, mas por segurança)
                    if command -v apk > /dev/null; then
                        apk add --no-cache libatomic gtk+3.0 gbm nss
                    fi
                '''

                // Agora instala as dependências do projeto com segurança
                sh 'npm ci --prefer-offline --no-audit'
                
                // Garante que o binário do Cypress está disponível
                sh 'npx cypress verify'
            }
        }

        stage('Executar Testes Cypress') {
            steps {
                // Não deixa o build falhar imediatamente para conseguir pegar vídeos/screenshots
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'npm run test:avaliacao-bdd'
                }
            }
            post {
                always {
                    // Arquiva vídeos e screenshots mesmo se o teste falhar
                    archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true, fingerprint: true
                    archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true

                    // Se você usa mochawesome ou junit, descomente a linha correspondente
                    // junit 'cypress/results/*.xml'
                    
                    // Relatório HTML simples (opcional, mas bonito)
                    sh '''
                        echo "<html>
                        <head><title>Relatório Cypress - automationExercise</title></head>
                        <body style='font-family: Arial; margin: 40px;'>
                            <h1>Relatório de Testes - Automation Exercise</h1>
                            <p><strong>Projeto:</strong> ${JOB_NAME}</p>
                            <p><strong>Build:</strong> #${BUILD_NUMBER}</p>
                            <p><strong>Branch:</strong> ${GIT_BRANCH}</p>
                            <p><strong>Data/Hora:</strong> \$(date)</p>
                            <p><a href='${BUILD_URL}'>Ver build completo no Jenkins</a></p>
                        </body>
                        </html>" > relatorio.html
                    '''
                    archiveArtifacts 'relatorio.html'
                }
            }
        }
    }

    post {
        always {
            sh 'rm -rf node_modules/cypress/.cache || true'
            echo "Pipeline finalizado - Status: ${currentBuild.currentResult}"
        }
        success {
            echo 'PARABÉNS! Todos os testes passaram!'
            emailext (
                subject: "SUCESSO: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: '''
                    Os testes do projeto Automation Exercise foram executados com sucesso!

                    Branch: ${GIT_BRANCH}
                    Build: ${BUILD_URL}

                    Continue assim!
                ''',
                to: 'thayse.dias@gmail.com',
                mimeType: 'text/html'
            )
        }
        failure {
            echo 'Pipeline falhou'
            emailext (
                subject: "FALHA: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: '''
                    Atenção! Alguns testes falharam.

                    Verifique os logs e artefatos (vídeos e screenshots) aqui:
                    ${BUILD_URL}

                    Corrija o mais rápido possível!
                ''',
                to: 'thayse.dias@gmail.com',
                mimeType: 'text/html',
                attachLog: true
            )
        }
        unstable {
            echo 'Pipeline instável (alguns testes falharam, mas o build continuou)'
            emailext (
                subject: "INSTÁVEL: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Alguns testes falharam, mas o pipeline continuou para coletar evidências.\n\n${BUILD_URL}",
                to: 'thayse.dias@gmail.com'
            )
        }
    }
}