# API Routes Schema

| Method | Path | Action | Middlewares |
|--------|------|--------|------------|
| GET | / | index/index | none |
| GET | /admin/dashboard | admin/dashboard | none |
| GET | /admin/resources/stats | admin/resources/stats | none |
| POST | /admin/resources/upload | admin/resources/upload | none |
| POST | /admin/settings | admin/settings | none |
| GET | /passwords/stats | admin/resources/stats | none |
| POST | /passwords/upload | admin/resources/upload | none |
| GET | /users | users/index | none |
| POST | /users | users/create | none |
| GET | /users/:id | users/show | none |
| PUT | /users/:id | users/update | none |
| DELETE | /users/:id | users/delete | none |
| PATCH | /users/:id/status | users/update_status | none |