import { Request, Response } from 'express';
import { perform as existsAction } from '@actions/users/existsAction';
import { perform as createAction } from '@actions/users/createAction';

describe('User creation workflow', () => {
  // Create mocks for response methods
  const jsonMock = jest.fn().mockReturnThis();
  const statusMock = jest.fn().mockReturnThis();

  let actionResponse: Response;

  const clearResponse = () => {
    jsonMock.mockClear();
    statusMock.mockClear();
  };

  beforeEach(() => {
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
