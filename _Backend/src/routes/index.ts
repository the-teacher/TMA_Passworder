import { root, get, resources, scope, buildRoutesSchema } from '@libs/the-router';

import { authMiddleware } from '@middlewares/auth/authMiddleware';
import { loggerMiddleware } from '@middlewares/common/loggerMiddleware';

root('index/index');

// USER ROUTES
get('/users/exists/:service/:id', 'users/exists');

scope('/', [authMiddleware], () => {
  resources('users', [loggerMiddleware]);
});

buildRoutesSchema('src/routes');
