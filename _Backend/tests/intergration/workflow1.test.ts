import { perform } from '@actions/users/createAction';

describe('workflow1', () => {
  it('should be true', () => {
    perform();
    expect(true).toBe(true);
  });
});
