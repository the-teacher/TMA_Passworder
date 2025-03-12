/**
 * Router state management module (alternative implementation)
 *
 * This module provides direct state management for the router without using a separate state object.
 *
 * Functions:
 * - setRouterOptions: Configure Express Router options
 * - getRouter: Get or create the router instance
 * - resetRouter: Reset router state to initial values
 * - setActionsPath: Set the base path for action files
 * - isCustomActionsPath: Check if custom actions path is set
 * - getActionsPath: Get the current actions path
 * - setRouterScope: Set the current router scope
 * - getRouterScope: Get the current router scope
 * - getScopeMiddlewares: Get middlewares for current scope
 * - setScopeMiddlewares: Set middlewares for current scope
 * - routeScope: Create a route scope with optional middlewares
 */

import { Router, RequestHandler, RouterOptions } from 'express';

const DEFAULT_ACTIONS_PATH = 'src/actions';

export type RouteInfo = {
  method: string;
  path: string;
  action: string;
  middlewares: RequestHandler[];
};

// Private state
let router: Router | null = null;
let currentScope: string | null = null;
let scopeMiddlewares: RequestHandler[] = [];
let actionsPath: string = DEFAULT_ACTIONS_PATH;
let isCustomPath: boolean = false;
let routerOptions: RouterOptions = {};

/**
 * Sets options for Express Router
 */
export const setRouterOptions = (options: RouterOptions): void => {
  routerOptions = options;
};

/**
 * Returns current router instance or creates a new one if it doesn't exist
 */
export const getRouter = (): Router => {
  if (!router) {
    router = Router(routerOptions);
  }
  return router;
};

/**
 * Resets router state to default values
 */
export const resetRouter = (): void => {
  router = null;
  currentScope = null;
  scopeMiddlewares = [];
  isCustomPath = false;
  actionsPath = DEFAULT_ACTIONS_PATH;
  routerOptions = {};
};

/**
 * Sets the path for actions
 */
export const setActionsPath = (path: string): string => {
  isCustomPath = true;
  actionsPath = path;
  return path;
};

/**
 * Checks if a custom actions path is set
 */
export const isCustomActionsPath = (): boolean => isCustomPath;

/**
 * Gets the current actions path
 */
export const getActionsPath = (): string => actionsPath;

/**
 * Sets the current router scope
 */
export const setRouterScope = (scope: string | null): void => {
  currentScope = scope;
};

/**
 * Gets the current router scope
 */
export const getRouterScope = (): string | null => currentScope;

/**
 * Gets the current scope middlewares
 */
export const getScopeMiddlewares = (): RequestHandler[] => scopeMiddlewares;

/**
 * Sets the scope middlewares
 */
export const setScopeMiddlewares = (middlewares: RequestHandler[]): void => {
  scopeMiddlewares = middlewares;
};

/**
 * Creates a route scope
 */
export const routeScope = (
  scope: string,
  middlewaresOrCallback: RequestHandler[] | (() => void),
  routesDefinitionCallback?: () => void,
): void => {
  const scopedRouter = Router(routerOptions);
  const originalRouter = router;
  const originalScope = currentScope;
  const originalScopeMiddlewares = scopeMiddlewares;

  // Temporarily replace global router with new scoped one
  router = scopedRouter;

  // Set current scope
  const newScope = originalScope ? `${originalScope}/${scope}` : scope;
  setRouterScope(newScope);

  // Process middlewares
  if (Array.isArray(middlewaresOrCallback)) {
    setScopeMiddlewares([...originalScopeMiddlewares, ...middlewaresOrCallback]);
    if (routesDefinitionCallback) {
      routesDefinitionCallback();
    }
  } else {
    // Keep parent middlewares when no new ones are added
    setScopeMiddlewares([...originalScopeMiddlewares]);
    middlewaresOrCallback();
  }

  // Restore original router, scope and middlewares
  router = originalRouter;
  setRouterScope(originalScope);
  setScopeMiddlewares(originalScopeMiddlewares);

  // Apply scoped router with its middlewares
  getRouter().use(`/${scope}`, scopedRouter);
};
