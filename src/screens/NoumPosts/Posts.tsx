import { UserStatus } from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { usePermissions } from '@/features/posts/hooks';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import SinglePageLayout from '@/layout/SinglePageLayout';
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { getNoumDetailPath } from '@/utils/routes';
import { usePostElement } from '../Chamber/components/elements/PostElement/PostElementProvider';
import CreateSection from '../Chamber/components/elements/PostElement/components/CreateSection';
import CreatePost from '../Chamber/components/elements/PostElement/modals/CreatePost';
import AllNoumPosts from './AllNoumPosts';
import { FilterPosts } from './FilterPosts';
import MobilePostFilter from './Modal';
import PostMobileActions from './PostMobileActions';
import { AllNoumPostsContainer, PostCardWrapper } from './styles';
import { SinglePostSkeleton } from '../Community/AllPosts/SinglePostSkeleton';

type PostsProps = {
  loadingElement?: boolean;
};

export const Posts = ({ loadingElement }: PostsProps) => {
  const {
    loading: loadingPostsData,
    posts,
    setShowCreate,
    showCreate,
    space,
    isSpaceOwner,
    refetchPosts,
    networkStatusPosts,
    fetchMore,
    totalCount,
    filter,
    setAllPostsLoading,
    isMasterNoum,
  } = usePostElement();
  const { user, isUnregistered } = useAuth();
  const getUserPermission = usePermissions();
  const { isConnected } = useNoumUserConnectionContext();
  const { isMobile, isTablet } = useBreakpoints();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const loading = loadingElement || loadingPostsData;
  const isCreatable = useMemo(() => {
    if (isMasterNoum && !isSpaceOwner) return false;
    if (isUnregistered)
      return getUserPermission('POST', 'CREATE', 'UNREGISTERED');
    return (
      (isSpaceOwner || isConnected) && user?.userStatus === UserStatus.Active
    );
  }, [
    isMasterNoum,
    isSpaceOwner,
    isUnregistered,
    getUserPermission,
    isConnected,
    user?.userStatus,
  ]);

  useEffect(() => {
    if ((loading && posts.length > 0) || !loading) {
      setAllPostsLoading(false);
    }
  }, [loading, posts.length, setAllPostsLoading]);

  // TODO: Replace with a regular layout, e.g. ListLayout or similar.
  return (
    <SinglePageLayout
      showBackButton
      responsiveMain
      loading={loading}
      goBackUrl={getNoumDetailPath(space?._id)}
    >
      <Stack
        gap={16}
        vertical
        fullWidth
        align="center"
        maxHeight={isMobile ? 'calc(100% - 66px)' : 'unset'}
        padding={isTablet ? '16px 0 0 0' : 'unset'}
      >
        <AllNoumPostsContainer vertical>
          {!isMobile && !isMasterNoum && (
            <PostCardWrapper>
              <FilterPosts />
            </PostCardWrapper>
          )}
          {posts.length === 0 && loading ? (
            <Stack fullWidth vertical>
              {Array.from({ length: 5 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SinglePostSkeleton key={index} />
              ))}
            </Stack>
          ) : posts.length > 0 ? (
            <>
              {!isMobile && isCreatable && !filter.filter?.uid && (
                <PostCardWrapper>
                  <CreateSection onClick={() => setShowCreate(true)} />
                </PostCardWrapper>
              )}
              {showCreate && (
                <CreatePost
                  spaceId={space?._id!}
                  onClose={() => setShowCreate(false)}
                  onSuccess={() => {
                    setShowCreate(false);
                    refetchPosts();
                  }}
                  isMasterNoum={isMasterNoum}
                />
              )}
              <AllNoumPosts
                totalCount={totalCount}
                posts={posts}
                fetchMore={fetchMore}
                refetch={refetchPosts}
                networkStatus={networkStatusPosts}
              />
            </>
          ) : (
            <Stack fullWidth align="center" vertical gap={16} padding="40px 0">
              <TSpan font="heading-xs-bold">
                {t('noumena.editor.no_posts_found')}
              </TSpan>
              <TSpan font="footnote" colorToken="--text-card-neutral-default">
                {t('noumena.editor.no_posts_description')}
              </TSpan>
            </Stack>
          )}
          <PostMobileActions setIsOpenFilter={setIsOpenFilter} />
          <MobilePostFilter
            isOpen={isOpenFilter}
            onClose={() => setIsOpenFilter(false)}
          />
        </AllNoumPostsContainer>
      </Stack>
    </SinglePageLayout>
  );
};
