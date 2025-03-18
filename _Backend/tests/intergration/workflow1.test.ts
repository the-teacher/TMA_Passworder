import { Request, Response } from 'express';

import {
  getBufferedLogs,
  resolveDatabasePath,
  dropSqliteDatabase,
  createSqliteDatabase,
  loadSqliteDatabaseSchema,
} from '@libs/the-mirgator';

import { perform as existsAction } from '@actions/users/existsAction/existsAction';
import { perform as createAction } from '@actions/users/createAction/createAction';

// Ensure logs are suppressed during tests
process.env.MIGRATOR_LOGS = 'buffer';

export const getJsonMockValue = (mock: jest.Mock) => {
  return mock.mock.calls[0][0];
};

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
    await loadSqliteDatabaseSchema(
      'application/database',
      'data/sqlite/development/application/database_schema.sql',
    );

    clearResponse();

    // Create a new mock response object
    actionResponse = {
      json: jsonMock,
      status: statusMock,
    } as unknown as Response;
  });

  afterAll(async () => {
    const fullPath = resolveDatabasePath('application/database');
    await dropSqliteDatabase(fullPath as string, true);

    console.log(getBufferedLogs());
  });

  const existsActionRequest = {
    params: {
      service: 'telegram',
      id: 'abc123',
    },
  } as unknown as Request;

  const createActionRequest = {
    params: {
      service: 'telegram',
      username: 'test_user',
      name: 'John Doe',
      id: 'abc123',
    },
  } as unknown as Request;

  it('Workflow of creating a user', async () => {
    // FIRST STEP: Check if user exists
    await existsAction(existsActionRequest, actionResponse);

    // log value of jsonMock
    console.log(getJsonMockValue(jsonMock));
    console.log(getJsonMockValue(statusMock));

    // console.log(jsonMock)
    // Verify calls after the first step
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        data: expect.objectContaining({
          exists: false,
          service: 'telegram',
          id: 'abc123',
        }),
      }),
    );

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
