import {
  isValidURL,
  getSocialNameFromLink,
  getSocialHandleFromLink,
  makeSocialLink,
  parseAndSanitizeOpenLink,
} from './url';

describe('isValidURL', () => {
  test('validate URL', () => {
    expect(isValidURL('@missing-local.org')).toBe(false);
    expect(isValidURL('@missing-local.org')).toBe(false);
    expect(isValidURL('exampleDomain')).toBe(false);
    expect(isValidURL('exampleDomain.c')).toBe(false);
    expect(isValidURL('example.Domain.c')).toBe(false);
    expect(isValidURL('exampleDomain.co')).toBe(true);
    expect(isValidURL('example.Domain.co')).toBe(true);
    expect(isValidURL('noumena.global')).toBe(true);
    expect(isValidURL('noumena.global/test-page')).toBe(true);
    expect(isValidURL('digit-only-domain-with-subdomain-sub.123.com')).toBe(
      true,
    );
    expect(getSocialNameFromLink('github.com/johndoe')).toBe('github');
    expect(getSocialNameFromLink('https://www.facebook.com/johndoe')).toBe(
      'www',
    );
    expect(getSocialNameFromLink('https://www.goolge.com/johndoe')).toBe('www');
    expect(getSocialHandleFromLink('https://www.goolge.com/johndoe')).toBe(
      'https://www.goolge.com/johndoe',
    );
    expect(
      getSocialHandleFromLink('https://www.linkedin.com/in/johndoe/'),
    ).toBe('@johndoe');
    expect(getSocialHandleFromLink('https://www.linkedin.com/johndoe/')).toBe(
      '@johndoe',
    );
    expect(getSocialHandleFromLink('github.com/johndoe')).toBe('@johndoe');
    expect(getSocialHandleFromLink('behance.net/johndoe/')).toBe('@johndoe');
    expect(getSocialNameFromLink('dribbble.com/johndoe')).toBe('dribbble');
    expect(getSocialNameFromLink('medium.com/johndoe')).toBe('medium');
    expect(getSocialNameFromLink('twitter.com/johndoe')).toBe('twitter');
    expect(getSocialNameFromLink('behance.net/johndoe')).toBe('behance');
    expect(getSocialNameFromLink('instagram.com/johndoe')).toBe('instagram');
    expect(getSocialNameFromLink('invalidurl')).toBe('www');
    expect(getSocialNameFromLink('invalidurl')).toBe('www');
  });

  test('makeSocialLink', () => {
    expect(makeSocialLink('behance', 'johndoe')).toBe(
      'https://behance.net/johndoe',
    );
    expect(makeSocialLink('linkedin', 'johndoe')).toBe(
      'https://linkedin.com/in/johndoe',
    );
    expect(makeSocialLink('github', 'johndoe')).toBe(
      'https://github.com/johndoe',
    );
  });

  test('parseAndSanitizeOpenLink', () => {
    expect(parseAndSanitizeOpenLink('https://goodLink.com')).toBe(
      'https://goodlink.com',
    );
    expect(
      parseAndSanitizeOpenLink(
        '&#104;&#116;&#116;&#112;&#115;&#0000058//&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;',
      ),
    ).toBe('https://example.com');
    // eslint-disable-next-line no-script-url
    expect(parseAndSanitizeOpenLink('javascript:alert(document.domain)')).toBe(
      undefined,
    );
    expect(parseAndSanitizeOpenLink('about:blank')).toBe(undefined);
    expect(parseAndSanitizeOpenLink('example')).toBe(undefined);
    expect(parseAndSanitizeOpenLink('example.io')).toBe('https://example.io');
    expect(parseAndSanitizeOpenLink('wWw.eXample.io')).toBe(
      'https://www.example.io',
    );
    expect(parseAndSanitizeOpenLink('EXaMple.cOm')).toBe('https://example.com');
    expect(parseAndSanitizeOpenLink('http://EXaMple.NET')).toBe(
      'https://example.net',
    );
    expect(parseAndSanitizeOpenLink('httpHttps://EXaMple.NET')).toBe(undefined);
    expect(parseAndSanitizeOpenLink('http://4#r32.com')).toBe(undefined);
    expect(
      parseAndSanitizeOpenLink('JaVaScRiP%0at:alert(document.domain)'),
    ).toBe(undefined);
    expect(parseAndSanitizeOpenLink('http://34t32.cOm')).toBe(
      'https://34t32.com',
    );
    expect(
      parseAndSanitizeOpenLink(
        '&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041',
      ),
    ).toBe(undefined);
  });
});
