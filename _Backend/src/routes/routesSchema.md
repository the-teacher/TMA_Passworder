# API Routes Schema

| Method | Path | Action | Middlewares | Middlewares Names |
|--------|------|--------|------------|------------------|
| GET | / | index/index | none | actionHandler(index/index) |
| GET | /password-entries | password-entries/index | none | actionHandler(password-entries/index) |
| POST | /password-entries | password-entries/create | none | actionHandler(password-entries/create) |
| GET | /password-entries/:id | password-entries/show | none | actionHandler(password-entries/show) |
| PUT | /password-entries/:id | password-entries/update | none | actionHandler(password-entries/update) |
| PATCH | /password-entries/:id | password-entries/update | none | actionHandler(password-entries/update) |
| DELETE | /password-entries/:id | password-entries/destroy | none | actionHandler(password-entries/destroy) |
| GET | /password-entries/:id/edit | password-entries/edit | none | actionHandler(password-entries/edit) |
| GET | /password-entries/new | password-entries/new | none | actionHandler(password-entries/new) |
| GET | /users | users/index | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/index) |
| POST | /users | users/create | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/create) |
| GET | /users/:id | users/show | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/show) |
| PUT | /users/:id | users/update | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/update) |
| PATCH | /users/:id | users/update | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/update) |
| DELETE | /users/:id | users/destroy | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/destroy) |
| GET | /users/:id/edit | users/edit | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/edit) |
| GET | /users/exists/:service/:id | users/exists | none | actionHandler(users/exists) |
| GET | /users/new | users/new | 3 middleware(s) | authMiddleware, loggerMiddleware, Anonymous, actionHandler(users/new) |