import { root, get, resources, scope, buildRoutesSchema } from '@libs/the-router';

import { authMiddleware } from '@middlewares/auth/authMiddleware';
import { loggerMiddleware } from '@middlewares/common/loggerMiddleware';

root('index/index');

resources('password-entries');

// USER ROUTES
get('/users/exists/:service/:id', 'users/exists');

scope('/', [authMiddleware], () => {
  resources('users', [
    loggerMiddleware,
    (_req, _res, next) => {
      console.log('test Middleware');
      next();
    },
  ]);
});

buildRoutesSchema('src/routes');
