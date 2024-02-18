import { isValidEmail } from './email';

describe('isValidEmail', () => {
  test('validate email', () => {
    expect(isValidEmail('uncommon-tld@sld.museum')).toBe(true);
    expect(isValidEmail('@missing-local.org')).toBe(false);
    expect(isValidEmail('test@noumena.global')).toBe(true);
    expect(isValidEmail('digit-only-domain-with-subdomain@sub.123.com')).toBe(
      true,
    );
    expect(isValidEmail('a@a.fr')).toBe(true);
  });
});
