import { Request, Response, NextFunction } from 'express';
import { root, get, resources, buildRoutesSchema, scope } from '@libs/the-router';

root('index/index');
// User routes
get('/users/exists/:service/:id', 'users/exists');

const loggerMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  console.log('loggerMiddleware');
  next();
};

scope('/common', [loggerMiddleware], () => {
  resources('users', [loggerMiddleware], {
    except: ['index', 'show'],
  });
});

buildRoutesSchema('src/routes');
