pipeline {
    agent any
    
    environment {
        AWS_EC2_INSTANCE = '184.72.183.24'
        DOCKER_HUB_CREDENTIAL_ID = 'DOCKER_HUB_CREDENTIAL_ID'
        DOCKER_IMAGE_NAME = 'kamran111/valleyjs'
        TAG = 'latest'
        SONARQUBE_CREDENTIAL_ID = 'squ_785e9b47e00763dc0d448e729ce8b18d5aa26b65'
        SONARQUBE_CONTAINER_NAME = 'sonarqube'
        SONARQUBE_URL = "http://localhost:9000/"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/kamranali111/nodejs_demo_app'
            }
        }
        
        stage('Sonar Analysis') {
            steps {
                script {
                    // Execute SonarScanner for Node.js
                    sh "docker run --rm \
                        -v $(pwd):/usr/src \
                        sonarsource/sonar-scanner-cli \
                        -Dsonar.projectKey=nodejs_demo_app \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${SONARQUBE_URL} \
                        -Dsonar.login=${SONARQUBE_CREDENTIAL_ID}"
                }
            }
        }

        stage('Build') {
            steps {
                // Your build steps for Node.js application
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Your Docker push steps
            }
        }

        stage('Deploy') {
            steps {
                // Your deployment steps
            }
        }
    }
}
