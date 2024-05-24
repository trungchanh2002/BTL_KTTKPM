pipeline {
    agent any

    environment {
        BUSES_SERVICE_IMAGE_NAME = 'btl_kttkpm-buses-service'
        DRIVERS_SERVICE_IMAGE_NAME = 'btl_kttkpm-drivers-service'
        TICKETS_SERVICE_IMAGE_NAME = 'btl_kttkpm-tickets-service'
        ROUTES_SERVICE_IMAGE_NAME = 'btl_kttkpm-routes-service'
        PASSENGERS_SERVICE_IMAGE_NAME = 'btl_kttkpm-passengers-service'
        GATEWAY_SERVICE_IMAGE_NAME = 'btl_kttkpm-gateway-service'
        RETRY_SERVICE_IMAGE_NAME = 'btl_kttkpm-retry-service'
        IMAGE_TAG = 'latest'
    }
    
    stages {   
        stage('Build and Push Docker Images') {
            parallel {
                stage('Build Drivers Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                            sh 'cd driversService && docker build -t $DRIVERS_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                            sh 'docker push $DRIVERS_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                            }
                        }
                    }
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
