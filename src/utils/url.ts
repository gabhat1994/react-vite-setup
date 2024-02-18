import { sanitizeUrl } from '@braintree/sanitize-url';

export type TSocialName =
  | 'github'
  | 'linkedin'
  | 'behance'
  | 'dribbble'
  | 'twitter'
  | 'instagram'
  | 'medium'
  | 'www'
  | 'www1'
  | 'www2'
  | 'www3'
  | 'custom';

export const isValidURL = (url: string) => {
  // eslint-disable-next-line
  const urlRegex = new RegExp(
    '^(http:\\/\\/www\\.|https:\\/\\/www\\.|www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,}(:[0-9]{1,})?(\\/.*)?$',
    'i',
  );

  if (urlRegex.test(url)) {
    return true;
  }
  return false;
};

export const getSocialNameFromLink = (url: string): TSocialName => {
  if (isValidURL(url)) {
    try {
      const lowerUrl = url.toLowerCase();
      let result: TSocialName = 'www';
      if (lowerUrl.includes('github.com')) {
        result = 'github';
      } else if (lowerUrl.includes('linkedin.com')) {
        result = 'linkedin';
      } else if (lowerUrl.includes('dribbble.com')) {
        result = 'dribbble';
      } else if (lowerUrl.includes('medium.com')) {
        result = 'medium';
      } else if (lowerUrl.includes('twitter.com')) {
        result = 'twitter';
      } else if (lowerUrl.includes('instagram.com')) {
        result = 'instagram';
      } else if (lowerUrl.includes('behance.net')) {
        result = 'behance';
      } else {
        result = 'www';
      }
      return result;
    } catch (e) {
      return 'www';
    }
  }
  return 'www';
};

export const getSocialHandleFromLink = (url: string): string => {
  const socialName = getSocialNameFromLink(url);
  if (socialName === 'www') {
    return url;
  }
  let path = '';
  if (url.includes('.com/')) {
    [, path] = url.split('.com/');
  } else if (url.includes('.net')) {
    [, path] = url.split('.net/');
  }
  const pathFrag = path?.split('/') || [];
  let result = '';
  switch (socialName) {
    case 'linkedin':
      result = pathFrag.length > 0 ? pathFrag[1] || pathFrag[0] : '';
      break;
    default:
      [result] = pathFrag;
  }
  return `@${result}`;
};

export const parseAndSanitizeOpenLink = (userInput: string) => {
  let result = sanitizeUrl(userInput);

  if (result === 'about:blank') {
    return undefined;
  }

  result = result.toLowerCase();

  if (result.includes('http') && !result.includes('https')) {
    result = result.replace('http', 'https');
  }

  if (!result.includes('https://')) {
    result = `https://${result}`;
  }

  return isValidURL(result) ? result : undefined;
};

export const makeSocialLink = (
  socialName: string,
  handle: string,
): string | undefined => {
  let result = '';

  if (socialName === 'www1' || socialName === 'www2' || socialName === 'www3') {
    return parseAndSanitizeOpenLink(handle);
  }

  if (
    socialName === 'www' ||
    socialName === 'custom' ||
    handle.match('www.') ||
    handle.match('.net') ||
    handle.match('.com')
  ) {
    result = handle;
  } else if (socialName === 'behance') {
    result = `https://behance.net/${handle}`;
  } else if (socialName === 'linkedin') {
    result = `https://linkedin.com/in/${handle}`;
  } else {
    result = `https://${socialName}.com/${handle}`;
  }
  return result;
};
