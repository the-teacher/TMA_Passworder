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

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Postgres
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

postgres_up:
	docker compose up -d postgres

postgres_shell:
	docker compose exec postgres bash

postgres_down:
	docker compose down postgres

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Broadcast
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# cat /etc/ssh/sshd_config | grep GatewayPorts
# sed -i 's/#GatewayPorts no/GatewayPorts yes/' /etc/ssh/sshd_config
# systemctl restart ssh
# service nginx reload

miniapp_share:
	ssh -R 9876:localhost:4000 root@64.227.65.207

# netstat -tulnp | grep 9876
miniapp_check_tonnel:
	ssh root@64.227.65.207 "netstat -tulnp | grep 9876"