devrun:
	docker compose up 

devfe:
	docker exec  -it medicalclinicmanager-frontend-1 sh

devbe:
	docker exec -it medicalclinicmanager-backend-1 sh

devdown:
	docker compose down --remove-orphans

devclean:
	docker compose down --remove-orphans --rmi all
