import { root, get, resources } from '@the-teacher/the-router'

root('index/index')

// User routes
get('/users/exists/:login', 'users/exists')
resources('users', { except: ['new'] })
