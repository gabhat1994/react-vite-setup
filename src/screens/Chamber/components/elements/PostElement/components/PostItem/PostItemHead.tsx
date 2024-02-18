import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { TSpan } from '@/components/Typography';
import ROUTES from '@/constants/routes';
import VisibilityOptions from '@/constants/visibilityOptions';
import { PinDotsItem } from '@/features/posts/components';
import { useLaunchDarkly, useToast } from '@/hooks';
import { Stack } from '@/layout';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import { PinTabText } from '@/screens/Community/AllPosts/styles';
import { distanceDate } from '@/utils/date';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import {
  NavLink,
  generatePath,
  matchPath,
  useLocation,
} from 'react-router-dom';
import {
  AvatarContainer,
  ItemHead,
  NameWrap,
  PostDetailsWrapper,
  StyledTag,
  TimeWrap,
} from './styles';
import { type PostItemHeadProps } from './types';

const PostItemHead = ({
  data,
  options,
  userType,
  onHandleSelect,
  isPinned = false,
  selectedCustomPreviewTab,
  size = 'M',
  isPostAuthor,
}: PostItemHeadProps) => {
  const {
    flags: { postItemTimestamp },
  } = useLaunchDarkly();

  const { isLoading } = useSkeletonIsLoadingContext();
  const { pathname } = useLocation();

  const fullName = getFullName(
    data.uid?.firstName,
    data.uid?.middleName,
    data.uid?.lastName,
  );
  const isUnregisteredUser = UserUtil.isUnregistered(data.uid);
  const isSinglePostPage =
    matchPath({ path: ROUTES.POSTS }, pathname) ||
    matchPath({ path: ROUTES.POST }, pathname);
  const isCommunityPage = matchPath({ path: ROUTES.COMMUNITY }, pathname);
  const isInactive = UserUtil.isInactive(data.uid);
  const isNonClickable = isLoading || isInactive || isUnregisteredUser;

  const navLinkTo = useMemo(
    () =>
      isNonClickable
        ? ''
        : data?.uid?.chamber?._id
        ? generatePath(ROUTES.NOUM, { id: data?.uid?.chamber?._id })
        : '',
    [data?.uid?.chamber?._id, isNonClickable],
  );

  const navLinkStyle = {
    textDecoration: 'none',
    cursor: isNonClickable ? 'default' : 'pointer',
  };

  const visibilityTitle = data?.visibility
    ? VisibilityOptions[data?.visibility].label
    : '';

  const { addPrimaryIconToast } = useToast();

  const handleClick = useCallback(() => {
    if (isInactive || isUnregisteredUser)
      addPrimaryIconToast(
        t('noumena.calendar.notification.button.inactive_user'),
      );
  }, [addPrimaryIconToast, isInactive, isUnregisteredUser]);

  return (
    <ItemHead>
      <NavLink to={navLinkTo} style={navLinkStyle} onClick={handleClick}>
        <AvatarContainer>
          <Avatar
            url={UserUtil.getProfilePicture(data.uid) ?? ''}
            size={!isCommunityPage ? 'L' : size}
          />
        </AvatarContainer>
      </NavLink>

      <NameWrap>
        <PostDetailsWrapper>
          <NavLink to={navLinkTo} style={navLinkStyle} onClick={handleClick}>
            <TSpan
              font="body-l-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {isInactive ? t('noumena.inactive_user') : fullName}
            </TSpan>
          </NavLink>
          {isSinglePostPage && data?.chamber && (
            <>
              <Icon
                name="arrow_right_m"
                size={18}
                color="--icon-button-neutral-default"
              />
              <NavLink
                to={generatePath(ROUTES.NOUM, { id: data.chamber?._id })}
                style={navLinkStyle}
                onClick={handleClick}
              >
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {data.chamber?.name}
                </TSpan>
              </NavLink>
            </>
          )}
        </PostDetailsWrapper>

        <TimeWrap>
          {(postItemTimestamp || !!visibilityTitle || isUnregisteredUser) && (
            <Stack fullWidth gap={4} align="center">
              {isUnregisteredUser && (
                <TSpan
                  font="body-s"
                  colorToken="--text-timestamp-neutral-highlighted"
                >
                  {`${t('noumena.chamber_edit.modal.non_member')} ·`}
                </TSpan>
              )}
              {postItemTimestamp && (
                <TSpan
                  font="systemInfo-s"
                  colorToken="--text-timestamp-neutral-default"
                >
                  {`${distanceDate(data.createdAt)} ${
                    visibilityTitle ? '·' : ''
                  }`}
                </TSpan>
              )}
              {visibilityTitle && (
                <TSpan
                  font="body-s"
                  colorToken="--text-timestamp-neutral-highlighted"
                >
                  {visibilityTitle}
                </TSpan>
              )}
            </Stack>
          )}
          {isPinned && (
            <StyledTag
              size="small"
              icon={
                <Icon
                  name="pin_m"
                  size={16}
                  color="--icon-tag-neutral-alt-default"
                  style={{ maxHeight: '100%' }}
                  isPinned
                />
              }
            >
              <PinTabText>{t('noumena.post.pinned_post')}</PinTabText>
            </StyledTag>
          )}
        </TimeWrap>
      </NameWrap>
      {selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview && (
        <PinDotsItem
          isPostAuthor={isPostAuthor}
          isInactive={isInactive}
          userType={userType}
          onHandleSelect={onHandleSelect}
          options={options}
        />
      )}
    </ItemHead>
  );
};

export default PostItemHead;
