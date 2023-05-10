pipeline {
    agent any
    stages {
    stage ('prepare')
        { steps    {
               
          sh 'rm -rf ./ci/infrastructure'
          sh ' rm -rf docker-compose.yml'
          sh 'cp -r /var/www/ci/infrastructure/ .'
          sh 'cp -r  /var/www/ci/infrastructure/docker/docker-compose.yml . '
          sh 'cp -r .env.example .env '  
            
             //prepare ansible-playbook 
         sh 'ansible-playbook -i ./infrastructure/ansible/inventory/hosts.yml ./infrastructure/ansible/playbooks/install-docker.yml '
        }
         }
   
 
    
    
        
        stage('Build') {
            steps {
                sh 'docker build -t banisedki/php1-fpm:latest -f ./infrastructure/docker/php1-fpm/Dockerfile . '
                
                sh 'docker build -t banisedki/nxtya_nginx1:latest -f ./infrastructure/docker/nginx1/Dockerfile . '

			 // 'docker build -t nxtya:1.0 -f docker/Dockerfile .'
            }
        }
 
        stage('Docker Login') {
            steps {
                  withCredentials([string(credentialsId: 'dockerHubPwd2', variable: 'dockerHubPwd2')]) {
               // some block
               sh "docker login -u banisedki -p ${dockerHubPwd2}"
                  }
            }           
            }      
 


     
        stage('Deploy') {
            steps {
               
               sh 'COMPOSE_HTTP_TIMEOUT=480 docker-compose up -d'
               sh 'docker exec  php1-fpm rm -rf composer.lock vendor'
		    
sh 'docker exec  php1-fpm composer update'

sh 'php artisan nova:publish'
	       sh 'docker exec php1-fpm php artisan nova:install'
	       sh 'docker exec php1-fpm php artisan migrate'
	       sh 'docker exec php1-fpm php artisan nova:user'
	       sh 'docker exec php1-fpm php artisan nova:publish --force'
	       sh 'docker exec php1-fpm php artisan view:clear'
	 sh 'docker exec php1-fpm php artisan nova:install'
	 sh 'docker exec php1-fpm php artisan migrate'
               sh  'docker exec  php1-fpm composer install  --ignore-platform-reqs --optimize-autoloader --prefer-dist --no-scripts -o --no-dev'
              // sh 'docker exec php1-fpm composer update --ignore-platform-reqs --optimize-autoloader --prefer-dist --no-scripts --no-dev -o'

	       sh ' docker exec  php1-fpm chmod -R 0777 /var/www/html/storage'
               sh 'docker exec  php1-fpm php artisan key:generate'
               sh 'docker exec  php1-fpm php artisan config:cache'
               sh 'docker exec  php1-fpm php artisan view:clear'
               sh 'docker exec  php1-fpm php artisan config:clear'
                
            }
        
    }
       stage('Clean') {
            steps {
               // Stop and remove old  docker container
               // sh 'docker stop $(docker ps -a -q)'
                //sh 'docker rm $(docker ps -a -q)'
          sh   'docker system prune -af --filter "until=24h" '
            }
        }
}
}
