import { type Maybe } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type PageInfo } from './types';

export const getCurrentPageItems = (
  cards: Maybe<SpaceOutputFragment>[],
  page: number,
  noOfItems: number,
): PageInfo => {
  const items = Array.from(cards);
  if (items.length === 0 || page === 0 || noOfItems === 0)
    return { items: [], totalPages: 0 };

  const numsPerGroup = Math.ceil(items.length / noOfItems);
  const pages = new Array(numsPerGroup)
    .fill('')
    .map((_, i) => items.slice(i * noOfItems, (i + 1) * noOfItems));
  return { items: pages[page - 1] || [], totalPages: pages.length };
};
