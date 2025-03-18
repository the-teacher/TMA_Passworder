/**
 * Main router module
 *
 * This module provides the main interface for creating routes in the application.
 *
 * Functions:
 * - root: Define the root route (/)
 * - get: Create a GET route
 * - post: Create a POST route
 * - put: Create a PUT route
 * - patch: Create a PATCH route
 * - destroy: Create a DELETE route
 * - options: Create an OPTIONS route
 * - head: Create a HEAD route
 * - all: Create a route for all HTTP methods
 * - resources: Create RESTful resource routes
 * - scope: Create a route scope (alias for routeScope)
 * - getRouter: Get the router instance
 * - getActionsPath: Get the current actions path
 * - setActionsPath: Set the base path for action files
 * - resetRouter: Reset router state
 * - routeScope: Create a route scope
 * - setRouterOptions: Configure Express Router options
 * - buildRoutesSchema: Generate documentation for all routes
 */

import { RequestHandler } from 'express';

import {
  getRouter,
  getRouterState,
  getActionsPath,
  setActionsPath,
  resetRouter,
  routeScope,
  getScopeMiddlewares,
  setRouterOptions,
} from './base';

import { addRouteToMap } from './route-map';

import { loadAction } from './utils';
import { buildRoutesSchema } from './helpers/buildRoutesSchema';

// Error message constants
const ERROR_ACTION_PATH_REQUIRED = 'Action path is required when middlewares are provided';
const ERROR_UNSUPPORTED_HTTP_METHOD = 'Unsupported HTTP method: %s';

export const root = (middlewares: RequestHandler[] | string, actionPath?: string): void => {
  let handlers: RequestHandler[] = [...getScopeMiddlewares()];
  let finalActionPath: string;

  if (Array.isArray(middlewares)) {
    if (!actionPath) {
      throw new Error(ERROR_ACTION_PATH_REQUIRED);
    }
    handlers = [...handlers, ...middlewares];
    finalActionPath = actionPath;
  } else {
    finalActionPath = middlewares;
  }

  handlers.push(loadAction(finalActionPath));
  addRouteToMap('GET', '/', finalActionPath, handlers);
  getRouter().get('/', ...handlers);
};

const createRouteHandler = (
  method: string,
): ((
  urlPath: string | RegExp,
  middlewares: RequestHandler[] | string,
  actionPath?: string,
) => void) => {
  return (
    urlPath: string | RegExp,
    middlewares: RequestHandler[] | string,
    actionPath?: string,
  ): void => {
    let handlers: RequestHandler[] = [...getScopeMiddlewares()];
    let finalActionPath: string;

    if (Array.isArray(middlewares)) {
      if (!actionPath) {
        throw new Error(ERROR_ACTION_PATH_REQUIRED);
      }
      handlers = [...handlers, ...middlewares];
      finalActionPath = actionPath;
    } else {
      finalActionPath = middlewares;
    }

    handlers.push(loadAction(finalActionPath));

    const router = getRouter();
    const path =
      urlPath instanceof RegExp ? urlPath : urlPath.startsWith('/') ? urlPath : `/${urlPath}`;

    // if not a RegExp, normalize the path to remove multiple slashes
    const normalizedPath = path instanceof RegExp ? path : path.toString().replace(/\/+/g, '/');

    addRouteToMap(method, normalizedPath, finalActionPath, handlers);

    switch (method) {
      case 'get':
        router.get(normalizedPath, ...handlers);
        break;
      case 'post':
        router.post(normalizedPath, ...handlers);
        break;
      case 'put':
        router.put(normalizedPath, ...handlers);
        break;
      case 'patch':
        router.patch(normalizedPath, ...handlers);
        break;
      case 'delete':
        router.delete(normalizedPath, ...handlers);
        break;
      case 'options':
        router.options(normalizedPath, ...handlers);
        break;
      case 'head':
        router.head(normalizedPath, ...handlers);
        break;
      case 'all':
        router.all(normalizedPath, ...handlers);
        break;
      default:
        throw new Error(ERROR_UNSUPPORTED_HTTP_METHOD.replace('%s', method));
    }
  };
};

export const get = createRouteHandler('get');
export const post = createRouteHandler('post');
export const put = createRouteHandler('put');
export const patch = createRouteHandler('patch');
export const destroy = createRouteHandler('delete');
export const options = createRouteHandler('options');
export const head = createRouteHandler('head');
export const all = createRouteHandler('all');

type ResourceOptions = {
  only?: string[];
  except?: string[];
};

export const resources = (
  resourceName: string,
  middlewaresOrOptions?: RequestHandler[] | ResourceOptions,
  options?: ResourceOptions,
): void => {
  let middlewares: RequestHandler[] = [];
  let resourceOptions: ResourceOptions = {};

  // Parse arguments
  if (Array.isArray(middlewaresOrOptions)) {
    middlewares = middlewaresOrOptions;
    resourceOptions = options || {};
  } else {
    resourceOptions = middlewaresOrOptions || {};
  }

  const { only, except } = resourceOptions;
  const allActions = ['index', 'new', 'create', 'show', 'edit', 'update', 'destroy'];

  // Determine which actions to create
  let actions = allActions;
  if (only) {
    actions = only;
  } else if (except) {
    actions = allActions.filter((action) => !except.includes(action));
  }

  // Normalize resource name and create base path
  const normalizedName = resourceName.toLowerCase();
  const basePath = `/${normalizedName}`;
  const router = getRouter();

  // 1. Static routes first (no parameters)
  if (actions.includes('new')) {
    const handlers = createHandlers(middlewares, normalizedName, 'new');
    router.get(basePath + '/new', ...handlers);
    addRouteToMap('GET', basePath + '/new', normalizedName + '/new', handlers);
  }

  // 2. Static nested routes
  if (actions.includes('edit')) {
    const handlers = createHandlers(middlewares, normalizedName, 'edit');
    router.get(basePath + '/:id/edit', ...handlers);
    addRouteToMap('GET', basePath + '/:id/edit', normalizedName + '/edit', handlers);
  }

  // 3. Root level routes (no parameters)
  if (actions.includes('index')) {
    const handlers = createHandlers(middlewares, normalizedName, 'index');
    router.get(basePath, ...handlers);
    addRouteToMap('GET', basePath, normalizedName + '/index', handlers);
  }
  if (actions.includes('create')) {
    const handlers = createHandlers(middlewares, normalizedName, 'create');
    router.post(basePath, ...handlers);
    addRouteToMap('POST', basePath, normalizedName + '/create', handlers);
  }

  // 4. Parameter routes last
  if (actions.includes('show')) {
    const handlers = createHandlers(middlewares, normalizedName, 'show');
    router.get(basePath + '/:id', ...handlers);
    addRouteToMap('GET', basePath + '/:id', normalizedName + '/show', handlers);
  }
  if (actions.includes('update')) {
    const updateHandlers = createHandlers(middlewares, normalizedName, 'update');
    router.put(basePath + '/:id', ...updateHandlers);
    router.patch(basePath + '/:id', ...updateHandlers);
    addRouteToMap('PUT', basePath + '/:id', normalizedName + '/update', updateHandlers);
    addRouteToMap('PATCH', basePath + '/:id', normalizedName + '/update', updateHandlers);
  }
  if (actions.includes('destroy')) {
    const handlers = createHandlers(middlewares, normalizedName, 'destroy');
    router.delete(basePath + '/:id', ...handlers);
    addRouteToMap('DELETE', basePath + '/:id', normalizedName + '/destroy', handlers);
  }
};

// Helper function to create handlers array
const createHandlers = (
  middlewares: RequestHandler[],
  resourcePath: string,
  action: string,
): RequestHandler[] => {
  const handlers = [...getScopeMiddlewares(), ...middlewares];
  const fullActionPath = `${resourcePath}/${action}`;
  handlers.push(loadAction(fullActionPath));
  return handlers;
};

// Export scope as an alias for routeScope
export const scope = routeScope;

export {
  getRouter,
  getRouterState,
  getActionsPath,
  setActionsPath,
  resetRouter,
  routeScope,
  setRouterOptions,
  buildRoutesSchema,
};
