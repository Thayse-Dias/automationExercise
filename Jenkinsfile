pipeline {
    agent {
        docker {
            image 'cypress/included:13.15.0'
            args '-u root:root --shm-size=2g'
        }
    }

    environment {
        CYPRESS_VIDEO = 'true'
        npm_config_cache = "${WORKSPACE}/.npm"
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
                    echo "=== Instalando dependências com cache ==="
                    npm ci --prefer-offline --no-audit
                '''
            }
        }

        stage('Executar testes Cypress') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        echo "=== Executando testes BDD ==="
                        npx cypress run --browser chrome
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                // Copiar vídeos e screenshots para diretório local (container → workspace)
                sh '''
                    echo "=== Copiando evidências ==="
                    mkdir -p cypress-artifacts/videos
                    mkdir -p cypress-artifacts/screenshots

                    cp -r cypress/videos/*        cypress-artifacts/videos/        || true
                    cp -r cypress/screenshots/*   cypress-artifacts/screenshots/   || true
                '''
            }

            archiveArtifacts artifacts: 'cypress-artifacts/**/*', allowEmptyArchive: true

            // Gerar relatório simples em HTML
            sh '''
cat > relatorio.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Relatório – Build #${BUILD_NUMBER}</title>
<style>
body { font-family: Arial; background: #f4f4f4; margin: 40px; }
h1 { color:#333; }
.status { padding: 10px; border-radius: 5px; color:white; }
.SUCCESS { background: #28a745; }
.UNSTABLE { background: #ffc107; color:#333; }
.FAILURE { background: #dc3545; }
</style>
</head>
<body>
<h1>Cypress – Build ${BUILD_NUMBER}</h1>
<p>Status: <span class="status ${currentBuild.currentResult}">${currentBuild.currentResult}</span></p>
<p><a href="${BUILD_URL}">Abrir build no Jenkins</a></p>
</body>
</html>
EOF
            '''
            archiveArtifacts artifacts: 'relatorio.html'
        }
    }
}
