/**
 * Router utility functions
 *
 * This module provides utility functions for loading and executing action handlers.
 *
 * Functions:
 * - getProjectRoot: Gets the root directory of the project
 * - validateActionsPath: Validates that the actions directory exists
 * - resolveFullActionPath: Resolves the full path to an action file
 * - validateActionFile: Validates that the action file exists
 * - validateActionModule: Validates that the action module exports a perform function
 * - loadActionImplementation: Loads an action implementation from a file
 * - loadAction: Creates a middleware that loads and executes an action
 */

import fs from 'fs';
import path from 'path';
import { getActionsPath, isCustomActionsPath } from './base';
import type { Request, Response } from 'express';

// Constants for file extensions
const VALID_EXTENSIONS = ['.js', '.ts'];

// Error message constants
const ERROR_ACTIONS_PATH_NOT_SET = 'Actions path is not set';
const ERROR_ACTIONS_PATH_NOT_DIR = 'Actions path %s is not a directory';
const ERROR_ACTION_PATH_EMPTY = 'Action path cannot be empty';
const ERROR_ACTION_FILE_NOT_EXIST = 'Action "%s" does not exist';
const ERROR_ACTION_MODULE_NO_PERFORM = "Action module at %s must export a 'perform' function";
const ERROR_ACTION_LOADING_FAILED = 'Action loading failed';
const ERROR_ACTION_LOADING_FAILED_MESSAGE = 'Failed to load the specified action';
const ERROR_UNKNOWN = 'Unknown error';

const isProduction = (): boolean => process.env.NODE_ENV === 'production';

export const getProjectRoot = (): string => process.cwd();

const validateActionsPath = (actionsPath: string): void => {
  if (!actionsPath) {
    throw new Error(ERROR_ACTIONS_PATH_NOT_SET);
  }

  if (!fs.existsSync(actionsPath) || !fs.lstatSync(actionsPath).isDirectory()) {
    throw new Error(ERROR_ACTIONS_PATH_NOT_DIR.replace('%s', actionsPath));
  }
};

const resolveFullActionPath = (actionsPath: string, actionPath: string): string => {
  if (!actionPath) {
    throw new Error(ERROR_ACTION_PATH_EMPTY);
  }

  // Split the action path to get the last segment
  const segments = actionPath.split('/');
  const lastSegment = segments[segments.length - 1];

  // Create the action file name using the last segment
  const actionFile = `${lastSegment}Action`;

  return !isCustomActionsPath()
    ? path.join(getProjectRoot(), actionsPath, actionPath, actionFile)
    : path.join(actionsPath, actionPath, actionFile);
};

const validateActionFile = (fullActionPath: string, validExtensions: string[]): string => {
  const fileName = path.basename(fullActionPath);

  for (const ext of validExtensions) {
    const candidatePath = `${fullActionPath}${ext}`;
    if (fs.existsSync(candidatePath) && fs.lstatSync(candidatePath).isFile()) {
      return candidatePath;
    }
  }

  const actionPath = isProduction() ? fileName : fullActionPath;
  throw new Error(ERROR_ACTION_FILE_NOT_EXIST.replace('%s', actionPath));
};

const validateActionModule = (
  actionModule: { perform?: unknown },
  fullActionPath: string,
): void => {
  if (typeof actionModule.perform !== 'function') {
    throw new Error(ERROR_ACTION_MODULE_NO_PERFORM.replace('%s', fullActionPath));
  }
};

export const loadActionImplementation = async (
  actionPath: string,
): Promise<(req: Request, res: Response) => void | Promise<void>> => {
  const actionsPath = getActionsPath();
  validateActionsPath(actionsPath);
  const fullActionPath = resolveFullActionPath(actionsPath, actionPath);
  const validActionPath = validateActionFile(fullActionPath, VALID_EXTENSIONS);
  const actionModule = await import(validActionPath);
  validateActionModule(actionModule, validActionPath);

  return actionModule.perform;
};

export const loadAction = (
  actionPath: string,
): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const handler = await loadActionImplementation(actionPath);
      return handler(req, res);
    } catch (error: Error | unknown) {
      res.status(501).json({
        error: ERROR_ACTION_LOADING_FAILED,
        message: ERROR_ACTION_LOADING_FAILED_MESSAGE,
        details: error instanceof Error ? error.message : ERROR_UNKNOWN,
      });
    }
  };
};
