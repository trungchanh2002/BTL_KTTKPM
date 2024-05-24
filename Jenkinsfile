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
                                sh "cd driversService && docker build -t ${env.DRIVERS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.DRIVERS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Build Passengers Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                sh "cd passengersService && docker build -t ${env.PASSENGERS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.PASSENGERS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Build Buses Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                sh "cd busesService && docker build -t ${env.BUSES_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.BUSES_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Build Routes Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                sh "cd routesService && docker build -t ${env.ROUTES_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.ROUTES_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Build Tickets Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                sh "cd ticketsService && docker build -t ${env.TICKETS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.TICKETS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Build Gateway Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                sh "cd gatewayService && docker build -t ${env.GATEWAY_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.GATEWAY_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Build Retry Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                sh "cd retryService && docker build -t ${env.RETRY_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG} ."
                                sh "docker push ${env.RETRY_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}"
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
