lint-frontend:
	make -C frontend lint

install:
	npm install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./hexlet-slack/build

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend