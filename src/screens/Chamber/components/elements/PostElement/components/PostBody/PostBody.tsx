import { SpaceTypeEnum } from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import ROUTES from '@/constants/routes';
import useScrollToLocation from '@/hooks/useScrollToLocation';
import { Stack } from '@/layout';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import { type WrapperViewProp } from '@/screens/Chamber/components/ElementWrapper';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useParams } from 'react-router';
import { TSpan } from '@/components';
import { usePostElement } from '../../PostElementProvider';
import { CreatePostModal } from '../../modals/CreatePost/CreatePostModal';
import AuthorsList from '../AuthorsList';
import { PostsList } from '../PostsList';
import PostBodySkeleton from './PostBodySkeleton';
import { noPostData } from './mockData';
import { AllPostsButtonContainer, Container } from './styles';

export const PostBody = (props: WrapperViewProp) => {
  const {
    setShowCreate,
    showCreate,
    refetchPosts,
    posts,
    loading,
    networkStatusPosts,
    space,
    isMasterNoum,
  } = usePostElement();

  useScrollToLocation(posts?.length > 0);
  const { spaceId, selectedCustomPreviewTab, isEditing } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const noumId = id || space?._id;

  const initialSliceItems = 2;

  const showAllPostsButton =
    posts.length > 2 &&
    selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview;

  const postData = useMemo(
    () => posts.slice(0, initialSliceItems),
    [posts, initialSliceItems],
  );
  return (
    <Stack fullWidth gap={24} vertical>
      <Container fullWidth data-testid="post-body-container">
        {showCreate && (
          <CreatePostModal
            spaceId={spaceId}
            onClose={() => setShowCreate(false)}
            onSuccess={() => {
              setShowCreate(false);
              refetchPosts();
            }}
            isMasterNoum={isMasterNoum}
          />
        )}

        <Stack fullWidth vertical gap={16}>
          {!postData.length && loading ? (
            <ElementWrapperV2.Body>
              <PostBodySkeleton />
            </ElementWrapperV2.Body>
          ) : postData.length > 0 ? (
            <>
              {space?.type !== SpaceTypeEnum.Home &&
                !isEditing &&
                postData.length > 0 && <AuthorsList />}

              <PostsList
                data={postData}
                collapsible
                isMasterNoum={isMasterNoum}
                networkStatus={networkStatusPosts}
              />
            </>
          ) : null}

          {!loading && posts.length === 0 && (
            <>
              {isEditing ? (
                <PostsList data={noPostData} isMasterNoum={isMasterNoum} />
              ) : (
                <ElementWrapperV2.Body>
                  <TSpan font="body-m" colorToken="--text-card-neutral-default">
                    {t('noumena.post.no_posts_yet')}
                  </TSpan>
                </ElementWrapperV2.Body>
              )}
            </>
          )}
        </Stack>
      </Container>
      {showAllPostsButton && (
        <AllPostsButtonContainer>
          <Button
            textOnly
            size="small"
            onClick={() =>
              noumId && navigate(generatePath(ROUTES.POSTS, { id: noumId }))
            }
            secondary
            rightIcon={<Icon size={12} name="chevron_right_m" />}
          >
            {t('noumena.editor.all_posts')}
          </Button>
        </AllPostsButtonContainer>
      )}
    </Stack>
  );
};
