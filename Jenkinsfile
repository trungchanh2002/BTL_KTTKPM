pipeline {
    agent any

    environment {
        BUSES_SERVICE_IMAGE_NAME = 'jenkins-buses-service'
        DRIVERS_SERVICE_IMAGE_NAME = 'jenkins-drivers-service'
        TICKETS_SERVICE_IMAGE_NAME = 'jenkins-tickets-service'
        ROUTES_SERVICE_IMAGE_NAME = 'jenkins-routes-service'
        PASSENGERS_SERVICE_IMAGE_NAME = 'jenkins-passengers-service'
        GATEWAY_SERVICE_IMAGE_NAME = 'jenkins-gateway-service'
        IMAGE_TAG = 'latest'
    }
    
    stages {   
        stage('Build and Push Docker Images') {
            parallel {
                stage('Build Buses Service') {
                    steps {
                        script {
                            // This step should not normally be used in your script. Consult the inline help for details.
                          withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                    
                                docker.build("$BUSES_SERVICE_IMAGE_NAME:$IMAGE_TAG", './busesService').push()
                            }
                        }
                    }
                }
                stage('Build Drivers Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                docker.build("$DRIVERS_SERVICE_IMAGE_NAME:$IMAGE_TAG", './driversService').push()
                            }
                        }
                    }
                }
                stage('Build Tickets Service') {
                    steps {
                        script {
                       withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                docker.build("$TICKETS_SERVICE_IMAGE_NAME:$IMAGE_TAG", './ticketsService').push()
                            }
                        }
                    }
                }
                stage('Build Routes Service') {
                    steps {
                        script {
                          withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                docker.build("$ROUTES_SERVICE_IMAGE_NAME:$IMAGE_TAG", './routesService').push()
                            }
                        }
                    }
                }
                stage('Build Passengers Service') {
                    steps {
                        script {
                           withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                docker.build("$PASSENGERS_SERVICE_IMAGE_NAME:$IMAGE_TAG", './passengersService').push()
                            }
                        }
                    }
                }
                stage('Build Gateway Service') {
                    steps {
                        script {
                         withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                                docker.build("$GATEWAY_SERVICE_IMAGE_NAME:$IMAGE_TAG", './gateWayService').push()
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