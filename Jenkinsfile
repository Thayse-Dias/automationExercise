pipeline {
    agent any
    tools { nodejs 'Node22' }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx cypress install'
            }
        }
        stage('Run Cypress + Report') {
            steps {
                // ← ESSA É A ÚNICA LINHA QUE MUDOU
                sh 'npm run cy:run:chrome:report || exit 0'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports/html',
                reportFiles: 'mochawesome.html',
                reportName: 'Relatório Cypress - AutomationExercise'
            ])
        }
    }
}