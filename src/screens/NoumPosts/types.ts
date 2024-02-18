import { type PostItemFragment } from '@/apollo/graphql';
import { type NetworkStatus } from '@apollo/client';

export type AllNoumPostsProps = {
  totalCount: number;
  posts: PostItemFragment[];
  fetchMore: () => void;
  networkStatus: NetworkStatus;
  refetch?: () => void;
};

export type PostMobileActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type PostMobileActionProps = {
  setIsOpenFilter: (value: boolean) => void;
};
