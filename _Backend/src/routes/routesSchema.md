# API Routes Schema

| Method | Path | Action | Middlewares |
|--------|------|--------|------------|
| GET | / | index/index | none |
| GET | /users | users/index | 2 middleware(s) |
| POST | /users | users/create | 2 middleware(s) |
| GET | /users/:id | users/show | 2 middleware(s) |
| PUT | /users/:id | users/update | 2 middleware(s) |
| PATCH | /users/:id | users/update | 2 middleware(s) |
| DELETE | /users/:id | users/destroy | 2 middleware(s) |
| GET | /users/:id/edit | users/edit | 2 middleware(s) |
| GET | /users/exists/:service/:id | users/exists | none |
| GET | /users/new | users/new | 2 middleware(s) |