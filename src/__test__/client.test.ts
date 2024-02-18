import { setContext } from '@apollo/client/link/context';
import {
  generateAuthorizationLink,
  isServerError,
  isServerParseError,
} from '../apollo/client.helpers';

vi.mock('@apollo/client/link/context');

describe('client', () => {
  describe('isServerError', () => {
    it('should return true if error is a server error', () => {
      const error = new Error('Server error');
      expect(isServerError(error)).toBe(true);
    });

    it('should return false if error is not a server error', () => {
      expect(isServerError(undefined)).toBe(false);
    });
  });

  describe('isServerParseError', () => {
    it('should return true if error is a server parse error', () => {
      const error = new Error('Server parse error');
      expect(isServerParseError(error)).toBe(true);
    });

    it('should return false if error is not a server parse error', () => {
      expect(isServerParseError(undefined)).toBe(false);
    });
  });

  describe('generateAuthorizationLink', () => {
    it('should return a valid authorization link', () => {
      generateAuthorizationLink('random-token');
      expect(setContext).toHaveBeenCalled();
    });
  });
});
