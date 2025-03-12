/**
 * Router state management module
 *
 * This module provides functions for managing the router state, including:
 * - Router options and instance management
 * - Actions path configuration
 * - Scope management
 * - Route mapping and registration
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
import { RouterState, RouteInfo, createRouterState, resetRouterState } from './router-state';

// Global router state
let state: RouterState = createRouterState();

const getRouterState = (): RouterState => state;

// Router configuration functions
/**
 * Sets options for Express Router
 * @param options - Router configuration options
 */
const setRouterOptions = (options: RouterOptions): void => {
  state.routerOptions = options;
};

/**
 * Returns current router instance or creates a new one if it doesn't exist
 * @returns Express Router instance
 */
const getRouter = (): Router => {
  if (!state.router) {
    state.router = Router(state.routerOptions);
  }
  return state.router;
};

/**
 * Resets the router state to its initial values
 */
const resetRouter = (): void => {
  state = resetRouterState();
};

// Functions for working with action paths
/**
 * Sets the base path for action files
 * @param path - Path to the actions directory
 * @returns The path that was set
 */
const setActionsPath = (path: string): string => {
  state.isCustomPath = true;
  state.actionsPath = path;
  return path;
};

/**
 * Checks if a custom actions path has been set
 * @returns True if a custom path has been set, false otherwise
 */
const isCustomActionsPath = (): boolean => state.isCustomPath;

/**
 * Gets the current actions path
 * @returns The current actions path
 */
const getActionsPath = (): string => state.actionsPath;

// Functions for working with scopes
/**
 * Sets the current router scope
 * @param scope - The scope to set, or null to clear
 */
const setRouterScope = (scope: string | null): void => {
  state.currentScope = scope;
};

/**
 * Gets the current router scope
 * @returns The current scope or null if not set
 */
const getRouterScope = (): string | null => state.currentScope;

/**
 * Gets the current scope middlewares
 * @returns Array of middleware functions for the current scope
 */
const getScopeMiddlewares = (): RequestHandler[] => state.scopeMiddlewares;

/**
 * Sets the middlewares for the current scope
 * @param middlewares - Array of middleware functions
 */
const setScopeMiddlewares = (middlewares: RequestHandler[]): void => {
  state.scopeMiddlewares = middlewares;
};

/**
 * Creates a route scope with optional middlewares
 * @param scope - The scope name
 * @param middlewaresOrCallback - Array of middlewares or a callback function
 * @param routesDefinitionCallback - Optional callback for defining routes
 */
const routeScope = (
  scope: string,
  middlewaresOrCallback: RequestHandler[] | (() => void),
  routesDefinitionCallback?: () => void,
): void => {
  const scopedRouter = Router(state.routerOptions);
  const originalRouter = state.router;
  const originalScope = state.currentScope;
  const originalScopeMiddlewares = state.scopeMiddlewares;

  // Temporarily replace global router with new scoped one
  state.router = scopedRouter;

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
  state.router = originalRouter;
  setRouterScope(originalScope);
  setScopeMiddlewares(originalScopeMiddlewares);

  // Apply scoped router with its middlewares
  getRouter().use(`/${scope}`.replace(/\/+/g, '/'), scopedRouter);
};

// Export all functions in a single export statement
export {
  getRouterState,
  setRouterOptions,
  getRouter,
  resetRouter,
  setActionsPath,
  isCustomActionsPath,
  getActionsPath,
  setRouterScope,
  getRouterScope,
  getScopeMiddlewares,
  setScopeMiddlewares,
  routeScope,
};

export type { RouteInfo };
