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
 * Gets middleware names with proper formatting
 * @param middlewares - Array of middleware functions
 * @param action - Action path for the last middleware
 * @returns Array of middleware names
 */
const getMiddlewareNames = (middlewares: RequestHandler[], action: string): string[] => {
  if (!middlewares.length) return [];

  // Create a copy to avoid modifying the original array
  const names = middlewares.map((middleware, index) => {
    // Last middleware is the action handler
    if (index === middlewares.length - 1) {
      return `actionHandler(${action})`;
    }
    return middleware.name || 'Anonymous';
  });

  return names;
};

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

  // Normalize path to remove multiple consecutive slashes
  pathString = pathString.replace(/\/+/g, '/');

  const routeKey = `${method.toUpperCase()}:${pathString}`;
  state.routesMap.set(routeKey, {
    method: method.toUpperCase(),
    path: pathString,
    action,
    middlewares,
    middlewaresNames: getMiddlewareNames(middlewares, action),
  });
};

/**
 * Gets the current routes map
 * @returns Map of all registered routes
 */
const getRoutesMap = (): Map<string, RouteInfo> => getRouterState().routesMap;

export { addRouteToMap, getRoutesMap };
