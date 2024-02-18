import { type Maybe } from '@/apollo/generated/types';
import { type SpaceForListFragment } from '@/apollo/graphql';
import { type DiscoveryCategoryEnum } from '@/components/ChamberBox/types';

export interface ChambersListProps {
  chambers: Maybe<SpaceForListFragment>[];
  fourColumnItem?: boolean;
  category?: DiscoveryCategoryEnum;
}
