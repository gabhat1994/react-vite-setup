import * as Sentry from '@sentry/react';
import routes from '@/constants/routes';

import { NOUM_ROUTE_REGEX, ARTICLE_ROUTE_REGEX } from '@/constants/regex';

export const getInternalLink = (link?: string) => {
  if (!link) {
    return null;
  }
  const noumRegex = new RegExp(NOUM_ROUTE_REGEX);
  const articleRegex = new RegExp(ARTICLE_ROUTE_REGEX);

  switch (true) {
    case noumRegex.test(link): {
      const [, , id] = noumRegex.exec(link) || [];

      if (!id) {
        Sentry.captureException('Invalid internal link');
        return null;
      }

      return {
        pathname: `/noum/${id}`,
      };
    }
    case articleRegex.test(link): {
      const [, , slug] = articleRegex.exec(link) || [];

      if (!slug) {
        Sentry.captureException('Invalid internal link');
        return null;
      }

      return {
        pathname: routes.ARTICLE,
        search: `?slug=articles/${slug}`,
      };
    }
    default:
      return null;
  }
};
