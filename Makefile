process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


migration:
	@npx squid-typeorm-migration generate


build:
	@npm run build


codegen:
	@npx squid-typeorm-codegen

typegen: moonriverVersions.json
	@npx squid-substrate-typegen ./typegen/typegen.json


moonriverVersions.json:
	@make explore


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://wss.api.moonriver.moonbeam.network \
		--archive https://moonriver.archive.subsquid.io/graphql \
		--out ./typegen/moonriverVersions.jsonl


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: process serve start codegen migration migrate up down
