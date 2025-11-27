pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        CYPRESS_VIDEO = 'true'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Instalar dependências') {
            steps {
                sh '''
                    # Baixa a libatomic que estava faltando
                    if [ ! -f /usr/lib/x86_64-linux-gnu/libatomic.so.1 ]; then
                        mkdir -p /usr/lib/x86_64-linux-gnu
                        curl -sL https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/libatomic.so.1 \
                             -o /usr/lib/x86_64-linux-gnu/libatomic.so.1
                    fi

                    # ← LINHA EM BRANCO IMPORTANTE (se não tiver, os comandos grudam)
                    npm ci --prefer-offline --no-audit

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
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4',   allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'relatorio.html', allowEmptyArchive: true

            sh '''
                echo "<h1>Automation Exercise – Build #${BUILD_NUMBER}</h1>
                      <p>Branch: ${GIT_BRANCH}</p>
                      <p>Status: ${currentBuild.currentResult}</p>
                      <p><a href='${BUILD_URL}'>Abrir no Jenkins</a></p>" > relatorio.html
            '''
        }
        success  { echo 'SUCESSO TOTAL!' }
        unstable { echo 'ALGUNS TESTES FALHARAM – veja os vídeos' }
        failure  { echo 'FALHOU – mas vídeos já estão salvos' }
    }
}