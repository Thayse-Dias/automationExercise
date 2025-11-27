pipeline {
    agent any

    tools { nodejs 'nodejs' }

    environment {
        CYPRESS_VIDEO = 'true'
        HOME_LIB = "${env.HOME}/lib"
        LD_LIBRARY_PATH = "${env.HOME}/lib:${env.LD_LIBRARY_PATH}"
        npm_config_cache = "${WORKSPACE}/.npm"
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Preparar ambiente') {
            steps {
                sh '''
                    echo "=== Detectando arquitetura ==="
                    ARCH=$(uname -m)
                    echo "Arquitetura: $ARCH"

                    if [ "$ARCH" = "x86_64" ]; then
                        LIB_URL="https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/libatomic.so.1"
                    elif [ "$ARCH" = "aarch64" ]; then
                        LIB_URL="https://github.com/cypress-io/cypress-docker-images/raw/master/included/13.15.0/libs/arm64/libatomic.so.1"
                    else
                        echo "Arquitetura não suportada: $ARCH"
                        exit 1
                    fi

                    echo "Baixando libatomic..."
                    mkdir -p "$HOME_LIB"
                    curl -sL "$LIB_URL" -o "$HOME_LIB/libatomic.so.1"

                    echo "Verificando se a lib foi instalada:"
                    ls -l "$HOME_LIB"
                '''
            }
        }

        stage('Instalar dependências') {
            steps {
                sh '''
                    echo "=== Instalando dependências com cache ==="
                    npm ci --prefer-offline --no-audit

                    echo "=== Verificando Cypress ==="
                    npx cypress verify || (echo "Falha no verify" && exit 1)
                '''
            }
        }

        stage('Executar testes') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        echo "=== Executando teste BDD ==="
                        npm run test:avaliacao-bdd
                    '''
                }
            }
        }
    }

    post {
        always {
            sh '''
                echo "=== Gerando relatório HTML ==="

cat > relatorio.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Automation Exercise - Build #${BUILD_NUMBER}</title>
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
    <p><strong>Status:</strong> 
        <span class="status ${currentBuild.currentResult}">
            ${currentBuild.currentResult}
        </span>
    </p>
    <p><strong>Data/Hora:</strong> $(date)</p>
    <hr>
    <p><a href="${BUILD_URL}" target="_blank">Abrir build completo no Jenkins</a></p>
</body>
</html>
EOF
            '''

            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4',       allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'relatorio.html'
        }

        success  { echo 'SUCESSO TOTAL!' }
        unstable { echo 'ALGUNS TESTES FALHARAM – veja os vídeos e relatório' }
        failure  { echo 'PIPELINE QUEBROU – artefatos preservados' }
    }
}
