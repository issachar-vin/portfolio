.PHONY: setup dev lint format build clean

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

clean:
	docker compose down
	rm -rf node_modules dist
