.PHONY: setup dev lint format build restart clean

setup:
	npm install
	npx husky install || true

dev:
	docker compose up

lint:
	npm run lint

format:
	npm run format

build:
	npm run build

restart:
	docker compose down
	docker compose build
	docker compose up

clean:
	docker compose down
	rm -rf node_modules dist
