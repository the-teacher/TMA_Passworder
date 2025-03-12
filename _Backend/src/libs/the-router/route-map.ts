/**
 * Route map management module
 *
 * This module provides functions for managing the routes map:
 * - addRouteToMap: Add a route to the routes map
 * - getRoutesMap: Get the current routes map
 * - resetRoutesMap: Reset the routes map to empty state
 */

import { RequestHandler } from 'express';
import { RouteInfo } from './router-state';
import { getRouterState } from './base';

// Route management functions

/**
 * Adds a route to the routes map
 * @param method - HTTP method (GET, POST, etc.)
 * @param path - URL path or RegExp pattern
 * @param action - Action path to load
 * @param middlewares - Array of middleware functions
 */
const addRouteToMap = (
  method: string,
  path: string | RegExp,
  action: string,
  middlewares: RequestHandler[] = [],
): void => {
  const state = getRouterState();

  // Convert RegExp to string if needed
  let pathString = path instanceof RegExp ? path.toString() : path;

  // Process paths considering current scope
  if (state.currentScope && path instanceof RegExp) {
    const regexStr = path.toString().replace(/^\/|\/$/g, '');
    pathString = `/${state.currentScope}/${regexStr}/`;
  } else if (typeof path === 'string') {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    pathString = state.currentScope ? `/${state.currentScope}${normalizedPath}` : normalizedPath;
  }

  const routeKey = `${method.toUpperCase()}:${pathString}`;
  state.routesMap.set(routeKey, {
    method: method.toUpperCase(),
    path: pathString,
    action,
    middlewares,
  });
};

/**
 * Gets the current routes map
 * @returns Map of all registered routes
 */
const getRoutesMap = (): Map<string, RouteInfo> => getRouterState().routesMap;

export { addRouteToMap, getRoutesMap };
