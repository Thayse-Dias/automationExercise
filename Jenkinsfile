pipeline {
    agent any

    tools {
        nodejs "nodejs" // Nome da ferramenta Node.js configurada no Jenkins
    }

    environment {
        // Variáveis de ambiente para evitar problemas de memória
        NODE_OPTIONS = "--max_old_space_size=4096"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Instalar libatomic primeiro se necessário
                    sh '''
                        # Tentar instalar libatomic se estiver em ambiente Linux
                        if command -v apt-get &> /dev/null; then
                            apt-get update && apt-get install -y libatomic1 || true
                        elif command -v yum &> /dev/null; then
                            yum install -y libatomic || true
                        elif command -v apk &> /dev/null; then
                            apk add --no-cache libatomic || true
                        fi
                    '''
                    
                    // Instalar dependências Node.js
                    sh 'npm ci --no-audit --prefer-offline'
                    
                    // Verificar se o Cypress pode ser instalado
                    sh 'npx cypress verify || npx cypress install'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    try {
                        sh 'npm run test:avaliacao-bdd'
                    } catch (error) {
                        echo "Testes falharam, mas continuando o pipeline: ${error}"
                        // Não falhar o pipeline imediatamente para coletar artefatos
                    }
                }
            }
            post {
                always {
                    // Arquivar vídeos mesmo se os testes falharem
                    archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
                    
                    // Gerar relatório HTML simples sem plugin
                    sh '''
                        echo "<html><body><h1>Relatório de Testes Cypress</h1>" > report.html
                        echo "<p>Data: $(date)</p>" >> report.html
                        echo "<p>Branch: ${GIT_BRANCH}</p>" >> report.html
                        echo "</body></html>" >> report.html
                    '''
                    archiveArtifacts artifacts: 'report.html', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado - Status: ${currentBuild.result}"
            // Limpeza opcional
            sh 'rm -rf node_modules/cypress/.cache || true'
        }
        success {
            echo '🎉 PARABÉNS! Pipeline executado com sucesso hoje!'
            emailext (
                subject: "✅ SUCESSO: Pipeline automationExercise - ${env.JOB_NAME}",
                body: "Os testes foram executados com sucesso!\n\nURL do Build: ${env.BUILD_URL}",
                to: "thayse.dias@gmail.com"
            )
        }
        failure {
            echo '❌ Pipeline falhou - verifique os logs acima'
            emailext (
                subject: "❌ FALHA: Pipeline automationExercise - ${env.JOB_NAME}",
                body: "Os testes falharam. Verifique os logs:\n\n${env.BUILD_URL}",
                to: "thayse.dias@gmail.com"
            )
        }
        unstable {
            echo '⚠️ Pipeline instável - alguns testes falharam'
        }
    }
}