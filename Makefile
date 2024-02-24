up:
	docker compose up -d

down:
	docker compose down

up-test:
	docker compose -f docker-compose.test.yaml up -d

down-test:
	docker compose -f docker-compose.test.yaml down

up-all:
	docker compose -f docker-compose.yaml -f docker-compose.test.yaml up -d

down-all:
	docker compose -f docker-compose.yaml -f docker-compose.test.yaml down
	
reset-vlume:
	docker volume rm ui-trade_minio
	docker volume rm ui-trade_minio-test
	docker volume rm ui-trade_mysql
	docker volume rm ui-trade_mysql-test
	rm -rf .next


.PHONY: up down up-test down-test up-all down-all reset-vlume