pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://index.docker.io/v1/'
        DOCKER_CREDENTIALS_ID = 'docker'
        IMAGE_TAG = 'latest'
    }
    
    stages {   
        stage('Build and Push Docker Images') {
            steps {
                script {
                    buildAndPushDockerImage('busesService')
                    buildAndPushDockerImage('driversService')
                    buildAndPushDockerImage('ticketsService')
                    buildAndPushDockerImage('routesService')
                    buildAndPushDockerImage('passengersService')
                    buildAndPushDockerImage('gateWayService')
                    buildAndPushDockerImage('retryService')
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}

def buildAndPushDockerImage(serviceName) {
    withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
        try {
            def image = docker.build("${serviceName.toLowerCase()}:${IMAGE_TAG}", "./${serviceName}")
            image.push()
            image.push('latest')
        } catch (Exception e) {
            echo "Failed to build and push ${serviceName}"
            error "Build failed"
        }
    }
}

