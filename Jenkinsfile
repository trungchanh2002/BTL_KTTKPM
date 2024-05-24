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
                            // This step should not normally be used in your script. Consult the inline help for details.
withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
    // some block

                                sh 'cd driversService && docker build -t $DRIVERS_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $DRIVERS_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                            }
                        }
                    }
                }
                stage('Build Passengers Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
    // some block

                                sh 'cd pasengersService && docker build -t $PASSENGERS_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $PASSENGERS_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                            }
                        }
                    }
                }
                stage('Build Buses Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
                            withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                     // some block
                                sh 'cd busesService && docker build -t $BUSES_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $BUSES_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                               
                            }
                        }
                    }
                }
                stage('Build Routes Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
    // some block

                                sh 'cd routesService && docker build -t $ROUTES_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $ROUTES_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                            }
                        }
                    }
                }
                
                stage('Build Tickets Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
    // some block
                                sh 'cd ticketsService && docker build -t $TICKETS_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $TICKETS_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                            }
                        }
                    }
                }
                
                
                stage('Build Gateway Service') {
                    steps {
                        script {
                           // This step should not normally be used in your script. Consult the inline help for details.
withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
    // some block

                                sh 'cd gateWayService && docker build -t $GATEWAY_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $GATEWAY_SERVICE_IMAGE_NAME:$IMAGE_TAG'
                            }
                        }
                    }
                }
                stage('Build Retry Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
    // some block

                                sh 'cd retryService && docker build -t $RETRY_SERVICE_IMAGE_NAME:$IMAGE_TAG .'
                                sh 'docker push $RETRY_SERVICE_IMAGE_NAME:$IMAGE_TAG'
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
