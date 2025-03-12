# API Routes Schema

| Method | Path | Action | Middlewares |
|--------|------|--------|------------|
| GET | / | index/index | none |
| POST | /common/users | users/create | 2 middleware(s) |
| PUT | /common/users/:id | users/update | 2 middleware(s) |
| PATCH | /common/users/:id | users/update | 2 middleware(s) |
| DELETE | /common/users/:id | users/destroy | 2 middleware(s) |
| GET | /common/users/:id/edit | users/edit | 2 middleware(s) |
| GET | /common/users/new | users/new | 2 middleware(s) |
| GET | /users/exists/:service/:id | users/exists | none |