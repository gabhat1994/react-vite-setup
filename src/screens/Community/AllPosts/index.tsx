import { getBottomStatusFromQuery, Infinite } from '@/components/Infinite';
import { PostItem } from '@/screens/Chamber/components/elements/PostElement/components/PostItem';
import { Container } from './styles';
import { type AllPostsProps } from './types';

const AllPosts = ({
  totalCount,
  posts,
  fetchMore,
  networkStatus,
  refetch,
  forceRender,
  setForceRender,
}: AllPostsProps) => (
  <Infinite
    onFetchMore={() => {
      fetchMore({
        variables: {
          limit: 10,
          offset: posts?.length,
        },
      });
    }}
    status={getBottomStatusFromQuery({
      networkStatus,
      totalCount,
      currentCount: posts?.length ?? 0,
    })}
    grow
    width="100%"
  >
    <Container>
      {posts?.map((post, index) => (
        <PostItem.Layout
          key={post._id}
          isPinned={!!post.isPinned}
          withBorder
          aria-label={`post_${index}`}
        >
          <PostItem.Content
            data={post}
            isPinningEnabled
            refetch={refetch}
            isCommunity
            showPinnedTag={true}
            forceRender={forceRender}
            setForceRender={setForceRender}
            size="XL"
          />
        </PostItem.Layout>
      ))}
    </Container>
  </Infinite>
);

export default AllPosts;
