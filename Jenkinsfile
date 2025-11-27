pipeline {
    agent any

    tools { nodejs 'nodejs' }

    environment {
        CYPRESS_VIDEO = 'true'
        LD_LIBRARY_PATH = "${env.HOME}/lib:${env.LD_LIBRARY_PATH}"
    }

    stages {
        stage('Checkout') { steps { checkout scm } }

        stage('Instalar dependências') {
            steps {
                sh '''
                    ARCH=$(uname -m)
                    if [ "$ARCH" = "x86_64" ]; then
                        LIB_URL="https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/libatomic.so.1"
                    elif [ "$ARCH" = "aarch64" ]; then
                        LIB_URL="https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/arm64/libatomic.so.1"
                    else
                        echo "Arquitetura não suportada: $ARCH"
                        exit 1
                    fi

                    mkdir -p ~/lib
                    curl -sL "$LIB_URL" -o ~/lib/libatomic.so.1

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
            sh '''
                cat > relatorio.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Automation Exercise #${BUILD_NUMBER}</title>
<style>
    body{font-family:Arial;margin:40px;background:#f9f9f9;line-height:1.6}
    h1{color:#2c3e50}
    a{color:#2980b9;font-size:18px}
    .status{padding:8px 15px;border-radius:6px;color:white;font-weight:bold}
    .SUCCESS{background:#28a745}
    .UNSTABLE{background:#ffc107;color:#212529}
    .FAILURE{background:#dc3545}
</style>
</head>
<body>
    <h1>Automation Exercise – Build #${BUILD_NUMBER}</h1>
    <p><strong>Branch:</strong> ${GIT_BRANCH}</p>
    <p><strong>Status:</strong> <span class="status ${currentBuild.currentResult}">${currentBuild.currentResult}</span></p>
    <p><strong>Data/Hora:</strong> $(date)</p>
    <hr>
    <p><a href="${BUILD_URL}" target="_blank">Abrir build completo no Jenkins</a></p>
</body>
</html>
EOF
            '''
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4',   allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'relatorio.html', allowEmptyArchive: true, fingerprint: true
        }
        success  { echo 'SUCESSO TOTAL!' }
        unstable { echo 'ALGUNS TESTES FALHARAM – veja os vídeos e relatório' }
        failure  { echo 'PIPELINE QUEBROU – mas os artefatos foram salvos' }
    }
}