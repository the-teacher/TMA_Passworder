import { Request, Response } from 'express';

export const mockRequest = (req: any = {}, params = {}) => {
  return {
    ...req,
    params,
  } as unknown as Request;
};

export const mockResponse = (res: any = {}) => {
  const response: Partial<Response> = {
    ...res,
  };
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response as Response;
};
