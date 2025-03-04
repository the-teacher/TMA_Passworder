import { root, get, routeScope as scope } from '@the-teacher/the-router'

import { buildRoutesSchema } from '@the-teacher/the-router'

root('index/index')

// User routes
get('/users/exists/:login', 'users/exists')

buildRoutesSchema()
