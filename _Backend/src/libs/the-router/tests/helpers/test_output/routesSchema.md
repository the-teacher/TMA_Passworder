# API Routes Schema

| Method | Path | Action | Middlewares | Middlewares Names |
|--------|------|--------|------------|------------------|
| GET | /admin/posts | posts/index | 2 middleware(s) | authMiddleware, validateMiddleware, actionHandler(posts/index) |
| POST | /admin/posts | posts/create | 2 middleware(s) | authMiddleware, validateMiddleware, actionHandler(posts/create) |
| GET | /admin/posts/:id | posts/show | 2 middleware(s) | authMiddleware, validateMiddleware, actionHandler(posts/show) |