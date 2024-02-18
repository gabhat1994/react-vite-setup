import {
  type PostFilter,
  type SortType,
  type UserOutput,
} from '@/apollo/generated/types';
import {
  type PostItemFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { type NetworkStatus } from '@apollo/client';

export type FilterType = {
  sort?: SortType;
  filter?: PostFilter;
};
export type IPostElementContext = {
  loading: boolean;
  isDeleting: boolean;
  posts: PostItemFragment[];
  filter: FilterType;
  spaceId?: string;
  isCreatable: boolean;
  refetchPosts: () => Promise<void>;
  fetchMore: () => Promise<void>;
  setFilter: (value: FilterType) => void;
  setLoading: (value: boolean) => void;
  showCreate: boolean;
  setShowCreate: (value: boolean) => void;
  deletePost: (value: string) => Promise<boolean | undefined>;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  authors: UserOutput[];
  isSpaceOwner: boolean;
  isConnectedSpace?: boolean;
  networkStatusPosts: NetworkStatus;
  space: SpaceOutputFragment | undefined;
  networkStatus: NetworkStatus;
  totalCount: number;
  isCustomPreview: boolean | undefined;
  allPostsLoading: boolean;
  setAllPostsLoading: (value: boolean) => void;
  isMasterNoum?: boolean;
  authorFilterKeyword?: string;
  setAuthorFilterKeyword?: (value: string) => void;
  authorFilterOptions: DropdownValueType<string | UserOutput, string>[];
};
