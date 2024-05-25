pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://index.docker.io/v1/'
        DOCKER_CREDENTIALS_ID = 'docker'
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
                stage('Build Buses Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$BUSES_SERVICE_IMAGE_NAME:$IMAGE_TAG", './busesService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $BUSES_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
                            }
                        }
                    }
                }
                stage('Build Drivers Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$DRIVERS_SERVICE_IMAGE_NAME:$IMAGE_TAG", './driversService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $DRIVERS_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
                            }
                        }
                    }
                }
                stage('Build Tickets Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$TICKETS_SERVICE_IMAGE_NAME:$IMAGE_TAG", './ticketsService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $TICKETS_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
                            }
                        }
                    }
                }
                stage('Build Routes Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$ROUTES_SERVICE_IMAGE_NAME:$IMAGE_TAG", './routesService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $ROUTES_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
                            }
                        }
                    }
                }
                stage('Build Passengers Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$PASSENGERS_SERVICE_IMAGE_NAME:$IMAGE_TAG", './passengersService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $PASSENGERS_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
                            }
                        }
                    }
                }
                stage('Build Gateway Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$GATEWAY_SERVICE_IMAGE_NAME:$IMAGE_TAG", './gateWayService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $GATEWAY_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
                            }
                        }
                    }
                }
                stage('Build Retry Service') {
                    steps {
                        script {
                            withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: DOCKER_REGISTRY) {
                                try {
                                    def image = docker.build("$RETRY_SERVICE_IMAGE_NAME:$IMAGE_TAG", './retryService')
                                    image.push()
                                    image.push('latest')
                                } catch (Exception e) {
                                    echo "Failed to build and push $RETRY_SERVICE_IMAGE_NAME"
                                    error "Build failed"
                                }
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
