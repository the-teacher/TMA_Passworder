import { Request, Response } from 'express';

export const mockRequest = (req: Request, params = {}) =>
  ({
    ...req,
    params,
  }) as unknown as Request;

export const mockResponse = () => {
  const response: Partial<Response> = {};
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response as Response;
};
