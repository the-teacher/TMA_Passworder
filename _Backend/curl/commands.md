## List of Commands for Testing and Development

- apt-get update
- apt-get install jq -y

### Check if User Exists

```bash
curl -X GET http://localhost:3000/users/exists/telegram/5500789889 | jq
curl -X GET http://localhost:3000/users/exists/gmail/12345678:d730f61761b66d78 | jq
```

### Create User

```bash
curl -X POST http://localhost:3000/users/create \
  -H "Content-Type: application/json" \
  -d '{"service": "telegram", "id": "5500789889"}' \
  | jq
```
