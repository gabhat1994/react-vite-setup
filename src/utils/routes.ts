import { pickBy } from 'lodash';
import ROUTES from '@/constants/routes';
import { generatePath } from 'react-router';
import { type Maybe } from '@/common/types';

export function formatSearchParams(
  searchParams?: Record<string, string | undefined>,
) {
  const searchParamsWithValues = pickBy(searchParams, Boolean) as Record<
    string,
    string
  >;
  if (!searchParamsWithValues) {
    return null;
  }

  return `?${new URLSearchParams(searchParamsWithValues).toString()}`;
}

export function formatRouteUrl(
  path: string,
  searchParams?: Record<string, string | undefined>,
) {
  let url = path;

  const formattedSearchParams = formatSearchParams(searchParams);
  if (formattedSearchParams) {
    url += formattedSearchParams;
  }

  return url;
}

export function getNoumDetailPath(noumId?: Maybe<string>) {
  return noumId ? generatePath(ROUTES.NOUM, { id: noumId }) : undefined;
}
