import { getBottomStatusFromQuery, Infinite } from '@/components/Infinite';
import { PostItem } from '@/screens/Chamber/components/elements/PostElement/components/PostItem';

import { NetworkStatus } from '@apollo/client';
import { AllNoumsPostsContainer } from './styles';
import { type AllNoumPostsProps } from './types';

const AllNoumPosts = ({
  totalCount,
  posts,
  fetchMore,
  networkStatus,
}: AllNoumPostsProps) => (
  <Infinite
    width="100%"
    onFetchMore={fetchMore}
    status={getBottomStatusFromQuery({
      networkStatus,
      totalCount,
      currentCount: posts.length,
    })}
    grow
    unsetOverflow
  >
    <AllNoumsPostsContainer
      loading={networkStatus === NetworkStatus.setVariables}
    >
      {posts.map((post, index) => (
        <PostItem.Layout key={post._id} aria-label={`post_${index}`}>
          <PostItem.Content key={`post-item-${post._id}`} data={post} />
        </PostItem.Layout>
      ))}
    </AllNoumsPostsContainer>
  </Infinite>
);

export default AllNoumPosts;
