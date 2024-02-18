import { useMyFeedQuery } from '@/apollo/graphql/queries/myFeed.generated';
import { TSpan } from '@/components';
import { Icon } from '@/components/Icon';
import InviteFriendSideMenuSection from '@/components/SideMenu/InviteFriendSideMenuSection';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useAuth } from '@/features/auth/contexts';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import ListLayout from '@/layout/ListLayout';
import CommunityTabs from '@/screens/Community/CommunityTabs';
import { COMMUNITY_TABS, TABS_USER_TYPES } from '@/screens/Community/consts';
import { cleanList } from '@/utils/list';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { CreatePostModal } from '../Chamber/components/elements/PostElement/modals/CreatePost/CreatePostModal';
import { AppStyled } from '../Chambers/styles';
import AllPosts from './AllPosts';
import { SinglePostSkeleton } from './AllPosts/SinglePostSkeleton';
import { UserAvatar } from './components/Avatar';
import {
  Container,
  ElementWrapper,
  NoPostsContainer,
  PageCnt,
  RightSideBarContainer,
  StartDiscussion,
} from './styles';

const POSTS_LIMIT = 10;

const Community = () => {
  const { flags } = useLaunchDarkly();
  const { t } = useTranslation();
  const [tabName, setTabName] = useState(COMMUNITY_TABS[0]);
  const { data, fetchMore, networkStatus, refetch, loading } = useMyFeedQuery({
    variables: {
      limit: POSTS_LIMIT,
      offset: 0,
      filter: { usersType: [TABS_USER_TYPES[tabName]] },
    },
  });

  const handleRefetch = async () => {
    refetch();
  };

  const [forceRender, setForceRender] = useState(false);
  const totalCount = data?.myFeed?.count || 0;
  const posts = useMemo(
    () =>
      cleanList(
        data?.myFeed?.data?.filter((p) =>
          tabName === COMMUNITY_TABS[1] ? p?.isPinned : true,
        ),
      ),
    [data?.myFeed?.data, tabName],
  );
  const { isDesktop, isTablet } = useBreakpoints();

  const rightContent = (
    <RightSideBarContainer>
      <InviteFriendSideMenuSection width="272px" />
    </RightSideBarContainer>
  );

  const { user } = useAuth();
  const userId = user?._id ?? '';
  const [showCreate, setShowCreate] = useState(false);

  const handleTabChange = (name: string) => {
    setTabName(name);
  };

  const handleCreatePostOnSuccess = useCallback(() => {
    setShowCreate(false);
    setTabName(COMMUNITY_TABS[0]);
    refetch();
  }, [refetch]);

  const handleShowCreate = useCallback(() => setShowCreate(true), []);
  const handleHideCreate = useCallback(() => setShowCreate(false), []);

  const isSkeletonVisible = !data?.myFeed?.data && loading;

  return (
    <SkeletonLoaderProvider isLoading={isSkeletonVisible}>
      <PageCnt>
        {showCreate && (
          <CreatePostModal
            spaceId={userId}
            onClose={handleHideCreate}
            onSuccess={handleCreatePostOnSuccess}
            isChamber={false}
          />
        )}
        <ListLayout
          type="Community"
          rightContent={isDesktop ? rightContent : undefined}
        >
          {!isDesktop && rightContent}
          <Container gap={24} isAppUiV2={flags.newAppNavigation}>
            <AppStyled style={{ marginLeft: isDesktop ? 12 : 0 }}>
              <>
                <ElementWrapper>
                  <UserAvatar user={user} />
                  <StartDiscussion onClick={handleShowCreate}>
                    {t('noumena.post.start_discussion')}
                  </StartDiscussion>
                  {isTablet && (
                    <Icon
                      name="send_filled_m"
                      size={24}
                      color="--icon-button-neutral-pressed"
                    />
                  )}
                </ElementWrapper>
                <CommunityTabs
                  handleClick={handleTabChange}
                  tabName={tabName}
                />
                {isSkeletonVisible ? (
                  <Skeleton count={5} wrapper={() => <SinglePostSkeleton />} />
                ) : (
                  <AllPosts
                    totalCount={totalCount}
                    posts={posts}
                    fetchMore={fetchMore}
                    refetch={handleRefetch}
                    networkStatus={networkStatus}
                    setForceRender={setForceRender}
                    forceRender={forceRender}
                  />
                )}
                {!loading && !posts.length && (
                  <NoPostsContainer>
                    <TSpan
                      font="body-m"
                      colorToken="--text-card-neutral-default"
                    >
                      {t('noumena.post.no_posts_yet')}
                    </TSpan>
                  </NoPostsContainer>
                )}
              </>
            </AppStyled>
          </Container>
        </ListLayout>
      </PageCnt>
    </SkeletonLoaderProvider>
  );
};

export default Community;
