import { Request, Response } from 'express';

import { dropSqliteDatabase } from '@libs/the-mirgator/src/utils/dropSqliteDatabase';
import { resolveDatabasePath } from '@libs/the-mirgator/src/utils/databasePaths';
import { createSqliteDatabase } from '@libs/the-mirgator/src/utils/createSqliteDatabase';
// import { runMigrations } from '@libs/the-mirgator/src/migrationsRunner';

import { perform as existsAction } from '@actions/users/existsAction';
import { perform as createAction } from '@actions/users/createAction';

// Ensure logs are suppressed during tests
process.env.MIGRATOR_SILENT = 'true';

describe('User creation workflow', () => {
  // Create mocks for response methods
  const jsonMock = jest.fn().mockReturnThis();
  const statusMock = jest.fn().mockReturnThis();

  let actionResponse: Response;

  const clearResponse = () => {
    jsonMock.mockClear();
    statusMock.mockClear();
  };

  beforeEach(async () => {
    const fullPath = resolveDatabasePath('application/database');
    await dropSqliteDatabase(fullPath as string, true);
    await createSqliteDatabase('application/database');
    // await loadSchema('application/database');
    // await runMigrations('up', 'application/database', './src/db/migrations/application', true);

    // Reset mocks before each test
    jsonMock.mockClear();
    statusMock.mockClear();

    // Create a new mock response object
    actionResponse = {
      json: jsonMock,
      status: statusMock,
    } as unknown as Response;
  });

  const existsActionRequest = {
    params: {
      service: 'telegram',
      id: '123',
    },
  } as unknown as Request;

  const createActionRequest = {
    params: {
      service: 'telegram',
      username: '',
      name: 'John Doe',
      id: '123',
    },
  } as unknown as Request;

  it('Workflow of creating a user', () => {
    // FIRST STEP: Check if user exists
    existsAction(existsActionRequest, actionResponse);

    // Verify calls after the first step
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      status: 'success',
      exists: false,
      data: { service: 'telegram', id: '123' },
    });

    clearResponse();

    // SECOND STEP: Create user
    createAction(createActionRequest, actionResponse);

    // Verify calls after the second step
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      status: 'success',
      message: 'User created successfully',
    });
  });
});
