pipeline {
    agent any

    tools {
        nodejs 'nodejs' 
    }

    environment {
        CYPRESS_VIDEO = 'true'
        NODE_OPTIONS = '--max_old_space_size=4096'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar libs que faltam + npm ci') {
            steps {
                sh '''
                    # Baixa e coloca as libs essenciais direto nos lugares certos (funciona sem sudo)
                    mkdir -p /usr/lib/x86_64-linux-gnu
                    
                    # libatomic.so.1
                    if [ ! -f /usr/lib/x86_64-linux-gnu/libatomic.so.1 ]; then
                        curl -sL https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/libatomic.so.1 \
                            -o /usr/lib/x86_64-linux-gnu/libatomic.so.1
                    fi

                    # Outras libs críticas que o Chrome/Cypress precisa
                    for lib in libgtk-3.so.0 libnss3.so libgdk-3.so.0 libxss.so.1 libasound.so.2 libgbm.so.1; do
                        if [ ! -f "/usr/lib/x86_64-linux-gnu/$lib" ]; then
                            echo "Aviso: $lib não encontrada – Cypress pode rodar em modo headless mesmo assim"
                        fi
                    done

                    # Instala as dependências do projeto
                    npm ci --prefer-offline --no-audit

                    # Verifica o Cypress
                    npx cypress verify
                '''
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
            // Salva vídeos e prints mesmo se falhar
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4',   allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true
            
            // Relatório simples
            sh '''
                echo "<h2>Automation Exercise – Build #${BUILD_NUMBER}</h2><p><a href='${BUILD_URL}'>Ver no Jenkins</a></p>" > relatorio.html
            '''
            archiveArtifacts 'relatorio.html', allowEmptyArchive: true

            cleanWs() // opcional: limpa o workspace
        }
        success {
            echo 'SUCESSO TOTAL!'
        }
        failure {
            echo 'FALHOU – mas vídeos e prints já estão salvos'
        }
    }
}