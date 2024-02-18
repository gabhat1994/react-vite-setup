import { type Maybe } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type DiscoveryCategoryEnum } from '@/components/ChamberBox/types';

export type ShowAllProps = {
  category: DiscoveryCategoryEnum;
  loading: boolean;
  noums: Maybe<SpaceOutputFragment>[];
  fetchMoreNoums: () => {};
  infiniteState: 'loading' | 'hasNextPage' | 'end' | 'end-with-force';
  showTabs?: boolean;
};
