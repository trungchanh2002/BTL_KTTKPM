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
        stage('Prepare Environment') {
            steps {
                script {
                    // Copy .env files if they exist
                    copyEnvFile('ENV_FILE_GATEWAY', 'gatewayService/.env')
                    copyEnvFile('ENV_FILE_BUS', 'busesService/.env')
                    copyEnvFile('ENV_FILE_DRIVER', 'driversService/.env')
                    copyEnvFile('ENV_FILE_PASSENGER', 'passengersService/.env')
                    copyEnvFile('ENV_FILE_TICKET', 'ticketsService/.env')
                    copyEnvFile('ENV_FILE_ROUTE', 'routesService/.env')
                }
            }
        }

        
        stage('Build and Push Docker Images') {
            parallel {
                stage('Build Buses Service') {
                    steps {
                        script {
                            docker.build("${env.BUSES_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './busesService').push()
                        }
                    }
                }
                stage('Build Drivers Service') {
                    steps {
                        script {
                            docker.build("${env.DRIVERS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './driversService').push()
                        }
                    }
                }
                stage('Build Tickets Service') {
                    steps {
                        script {
                            docker.build("${env.TICKETS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './ticketsService').push()
                        }
                    }
                }
                stage('Build Routes Service') {
                    steps {
                        script {
                            docker.build("${env.ROUTES_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './routesService').push()
                        }
                    }
                }
                stage('Build Passengers Service') {
                    steps {
                        script {
                            docker.build("${env.PASSENGERS_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './passengersService').push()
                        }
                    }
                }
                stage('Build Gateway Service') {
                    steps {
                        script {
                            docker.build("${env.GATEWAY_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './gateWayService').push()
                        }
                    }
                }
                stage('Build Retry Service') {
                    steps {
                        script {
                            docker.build("${env.RETRY_SERVICE_IMAGE_NAME}:${env.IMAGE_TAG}", './retryService').push()
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

// Function to copy .env file if it exists
def copyEnvFile(envVariable, targetPath) {
    def envFilePath = env[envVariable]
    if (envFilePath) {
        sh "cp ${envFilePath} ${targetPath}"
    } else {
        echo "File specified by ${envVariable} not found."
    }
}
