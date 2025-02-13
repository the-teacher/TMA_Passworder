up:
	docker compose up -d

down:
	docker compose down

status:
	docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

node_shell:
	docker compose exec node sh

backend_shell:
	docker compose exec node sh -c "cd _Backend && sh"

frontend_shell:
	docker compose exec node sh -c "cd _Frontend && sh"

bot_shell:
	docker compose exec node sh -c "cd _Bot && sh"

postgres_shell:
	docker compose exec postgres bash

