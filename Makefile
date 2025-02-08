up:
	docker compose up -d

down:
	docker compose down

status:
	docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

node_shell:
	docker exec -it node sh

postgres_shell:
	docker exec -it postgres bash
