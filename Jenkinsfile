pipeline {
    agent {
        docker {
            image 'cypress/included:13.15.0'   // Já vem com Node, Cypress, Chrome e TODAS as libs (inclusive libatomic)
            args '-u root:root --memory-swap -1'
        }
    }

    environment {
        NODE_OPTIONS = "--max_old_space_size=4096"
        CYPRESS_VIDEO = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependências') {
            steps {
                sh 'npm ci --prefer-offline --no-audit'
                sh 'npx cypress verify'
            }
        }

        stage('Executar Testes Cypress') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm run test:avaliacao-bdd'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true
            
            sh '''
                echo "<html><body>
                <h1>Relatório Automation Exercise</h1>
                <p>Build: #${BUILD_NUMBER}</p>
                <p>Branch: ${GIT_BRANCH}</p>
                <p><a href='${BUILD_URL}'>Ver no Jenkins</a></p>
                </body></html>" > relatorio.html
            '''
            archiveArtifacts 'relatorio.html'
            
            sh 'rm -rf node_modules/cypress/.cache || true'
        }
        success {
            echo 'TODOS OS TESTES PASSARAM!'
            emailext subject: "SUCESSO - ${env.JOB_NAME}",
                     body: "Tudo verde! ${env.BUILD_URL}",
                     to: 'thayse.dias@gmail.com',
                     mimeType: 'text/html'
        }
        failure {
            echo 'FALHOU!'
            emailext subject: "FALHA - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "Corrige logo! Vídeos e prints em anexo → ${env.BUILD_URL}",
                     to: 'thayse.dias@gmail.com',
                     mimeType: 'text/html',
                     attachLog: true
        }
    }
}