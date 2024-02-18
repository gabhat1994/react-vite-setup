import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type NoumAdsConfigType } from './types';

const settingValues = (
  space?: SpaceOutputFragment | null,
): NoumAdsConfigType => ({
  enableNoumAds: !!space?.enableAds,
  slug: space?.slug,
  keyWords: (space?.keywords as string[]) ?? [],
});

const unique = <T>(a: T[]) => [...new Set(a)];

const filter = <T>(a: T[], b: T) => a.filter(($a) => $a !== b);

const join = <T>(a: T[]) => [...a];

export const Utils = {
  settingValues,
  unique,
  filter,
  join,
};
