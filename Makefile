dev:
	docker compose -f ./docker/docker-compose.dev.yml up --remove-orphans || make dev-down
dev-down:
	docker compose -f ./docker/docker-compose.dev.yml down -v --remove-orphans 
db:
	docker compose -f ./docker/docker-compose.db.yml up --remove-orphans || make db-down
db-down:
	docker compose -f ./docker/docker-compose.db.yml down -v --remove-orphans
clean:
	docker rmi safehomejdev/nextjs-k3s
build:
	docker compose -f ./docker/docker-compose.build.yml build 
build-full:
	docker compose -f ./docker/docker-compose.build.yml build --no-cache
push:
	docker push safehomejdev/nextjs-k3s:latest