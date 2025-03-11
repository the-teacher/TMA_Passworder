import { root, get, post, buildRoutesSchema } from '@libs/the-router'

root('index/index')

// User routes
get('/users/exists/:service/:id', 'users/exists')
post('/users/create', 'users/create')

buildRoutesSchema()
