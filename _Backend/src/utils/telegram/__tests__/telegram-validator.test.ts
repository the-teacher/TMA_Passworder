// We need to access the private function for testing
// Import the module and use a workaround to access private functions
import { createDataCheckString } from '../telegram-validator';

describe('Telegram Validator', () => {
  describe('createDataCheckString', () => {
    it('should create a properly formatted data check string', () => {
      // Create a URLSearchParams object with test data
      const urlParams = new URLSearchParams();
      urlParams.append('user', '{"id":123456,"first_name":"Test"}');
      urlParams.append('auth_date', '1600000000');
      urlParams.append('query_id', 'test_query_id');

      // Call the private function
      const result = createDataCheckString(urlParams);

      // Expected result should be sorted alphabetically and formatted as key=value\n
      const expected =
        'auth_date=1600000000\nquery_id=test_query_id\nuser={"id":123456,"first_name":"Test"}';
      expect(result).toEqual(expected);
    });

    it('should handle empty URLSearchParams', () => {
      const urlParams = new URLSearchParams();
      const result = createDataCheckString(urlParams);
      expect(result).toEqual('');
    });

    it('should sort parameters alphabetically', () => {
      // Add parameters in non-alphabetical order
      const urlParams = new URLSearchParams();
      urlParams.append('z_param', 'z_value');
      urlParams.append('a_param', 'a_value');
      urlParams.append('m_param', 'm_value');

      const result = createDataCheckString(urlParams);

      // Expected result should be sorted alphabetically
      const expected = 'a_param=a_value\nm_param=m_value\nz_param=z_value';
      expect(result).toEqual(expected);
    });

    it('should handle parameters with special characters', () => {
      const urlParams = new URLSearchParams();
      urlParams.append('param', 'value with spaces');
      urlParams.append('special', 'value&with=special#chars');

      const result = createDataCheckString(urlParams);

      const expected = 'param=value with spaces\nspecial=value&with=special#chars';
      expect(result).toEqual(expected);
    });
  });
});
