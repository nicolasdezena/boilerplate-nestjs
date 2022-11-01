up:
	docker-compose stop 
	docker-compose up -d

logs:
	docker-compose logs -f api-boilerplate

install-package:
	yarn add $(package)
	docker-compose exec api-boilerplate yarn add $(package)


remove-package:
	yarn remove $(package)
	
