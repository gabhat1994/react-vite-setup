import { type GlobalSearchEntity } from '@/apollo/generated/types';
import { type BottomStatus } from '@/components/Infinite/types';

export type ResultType = {
  data?: GlobalSearchEntity[] | null;
  loading?: boolean;
  fetchMore?: () => void;
  infiniteState?: BottomStatus;
  search?: string;
  searchQueriesList?: (string | null)[] | undefined;
  recentSearchList?: GlobalSearchEntity[];
  isMobile?: boolean;
  recentSearchLoading?: boolean;
};

export interface ISearchContent {
  data: GlobalSearchEntity;
  status?: string;
  query?: string;
  isDropdown?: boolean;
}

export interface ISearchList {
  result?: GlobalSearchEntity[] | null;
  query?: string;
  isDropdown?: boolean;
  searchRouteHandler?: (value: GlobalSearchEntity) => void | undefined;
}
