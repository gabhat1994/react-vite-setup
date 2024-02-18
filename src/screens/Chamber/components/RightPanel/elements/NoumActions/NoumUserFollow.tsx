import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FollowActionEnum, FollowSource } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';

import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import ChamberUnfollow from '@/screens/Chamber/components/modals/ChamberUnfollow';
import { ConnectLinkedNoumsModal } from '@/screens/Chamber/components/modals/ConnectLinkedNoumsModal/Modal';
import { useHandleFollowHelper } from '@/features/noums/hooks/spaceQuery';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { useGetSpaceFollowersLazyQuery } from '@/apollo/graphql';
import { NoumActionButton } from './styles';
import { HandleFollowSearch, type NoumEditorUserActionProps } from './types';

export const NoumUserFollow: React.FC<NoumEditorUserActionProps> = ({
  isNoumEditor,
}) => {
  const { t } = useTranslation();
  const { space, refetchSpaceById: onRefetchSpaceById } = useNoumContext();
  const { isFollowing } = useNoumUserConnectionContext();

  const [refetchFollowersCount] = useGetSpaceFollowersLazyQuery({
    variables: {
      spaceId: space?._id!,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const source = searchParams.get(HandleFollowSearch.source);

  const { isActive: isUserActive } = useAuth();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [isFromFeaturedPage, setIsFromFeaturedPage] = useState<boolean>(false);
  const [following, setFollowing] = useState<boolean | undefined>(isFollowing);
  const [openLinkedNoumsModal, toggle] = useToggle(false);
  const { handleFollowHelper, loading } = useHandleFollowHelper();

  useEffect(() => {
    if (source === HandleFollowSearch.featured) {
      setIsFromFeaturedPage(true);
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams, source]);

  useEffect(() => {
    setFollowing(Boolean(isFollowing));
  }, [isFollowing]);

  const handleFollow = useCallback(
    async (isLinked = true) => {
      if (!space?._id) return;

      setFollowing(true);
      const isSuccess: boolean = await handleFollowHelper(
        space._id,
        FollowActionEnum.Follow,
        isFromFeaturedPage ? FollowSource.FeaturedPage : undefined,
      );
      if (isSuccess) {
        onRefetchSpaceById();
      } else {
        setFollowing(false);
      }
      if (isLinked) {
        toggle();
        if (refetchFollowersCount) refetchFollowersCount();
      }
    },
    [
      handleFollowHelper,
      isFromFeaturedPage,
      onRefetchSpaceById,
      refetchFollowersCount,
      space,
      toggle,
    ],
  );

  const onUnfollow = useCallback(async () => {
    if (!space?._id) return;
    setShowConfirm(false);
    setFollowing(false);
    const isSuccess: boolean = await handleFollowHelper(
      space._id,
      FollowActionEnum.Unfollow,
      isFromFeaturedPage ? FollowSource.FeaturedPage : undefined,
    );
    if (!isSuccess) {
      setFollowing(true);
    }
    if (isSuccess) {
      onRefetchSpaceById();
    }
  }, [space, handleFollowHelper, isFromFeaturedPage, onRefetchSpaceById]);

  const onClickFollowButton = useCallback(() => {
    if (following) {
      setShowConfirm(true);
    } else if (!space?.link) {
      handleFollow(false);
    } else {
      toggle();
    }
  }, [following, handleFollow, space, toggle]);

  return (
    <>
      <NoumActionButton
        isNoumEditor={isNoumEditor}
        disabled={!isUserActive || loading}
        loading={loading}
        data-testid="follow-button"
        size={!isNoumEditor ? 'full' : undefined}
        secondary={!following}
        tertiary={following}
        leftIcon={
          following ? (
            <Icon
              name="check_xs"
              size={16}
              color="--icon-button-neutral-default"
            />
          ) : undefined
        }
        onClick={onClickFollowButton}
      >
        {following
          ? t('noumena.chamber.unfollow_button')
          : t('noumena.chamber.follow_button')}
      </NoumActionButton>
      {showConfirm && (
        <ChamberUnfollow
          spaceName={space?.name}
          onUnfollow={onUnfollow}
          onClose={() => setShowConfirm(false)}
        />
      )}
      {openLinkedNoumsModal && space?.link && (
        <ConnectLinkedNoumsModal
          actionType="follow"
          loading={loading}
          onConfirm={handleFollow}
          onClose={toggle}
        />
      )}
    </>
  );
};
