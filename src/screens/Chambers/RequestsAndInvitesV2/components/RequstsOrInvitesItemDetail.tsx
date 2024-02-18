import { TSpan, Icon } from '@/components';
import { Stack } from '@/layout';
import { Avatar } from '@/components/Avatar/Avatar';
import { type FC } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { SpaceUtils } from '@/utils/space';
import { SpaceTypeEnum } from '@/apollo/generated/types';
import { format } from 'date-fns';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { UserUtil } from '@/utils/user';
import { type Maybe } from '@/common/types';
import { generatePath, useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import { useBreakpoints } from '@/hooks';
import {
  RequestsOrInvitesItemDetailWrapper,
  AvatarClickableWrapper,
  TitleWrapper,
  TitleSpan,
  IconButton,
} from './styles';
import { type RequstsOrInvitesItemDetailProps } from './types';
import MemberBadge from './MemberBadge';

const RequstsOrInvitesItemDetail: FC<RequstsOrInvitesItemDetailProps> = (
  props,
) => {
  const { isMobile } = useBreakpoints();
  const { showMessage, handleClickShowMessage, item, isReceived, isInvite } =
    props;
  const { user, isUnregistered } = useAuth();
  const navigate = useNavigate();

  const navigateToNoum = (noumId?: Maybe<string>) => {
    if (!isUnregistered && noumId) {
      navigate(generatePath(ROUTES.NOUM, { id: noumId }));
    }
  };

  const { ownSpace, guestSpace } =
    item.requestTo?._id === user?.chamber?._id ||
    item.requestTo?.uid?.chamber?._id === user?.chamber?._id ||
    (isReceived &&
      item.requestTo?.type === SpaceTypeEnum.Project &&
      SpaceUtils.isMasterNoum(item.requestFrom))
      ? { ownSpace: item.requestTo, guestSpace: item.requestFrom }
      : { ownSpace: item.requestFrom, guestSpace: item.requestTo };

  const profileImage = SpaceUtils.getSpaceProfileImage(guestSpace);
  const guestSpaceTitle = SpaceUtils.getSpaceTitle(guestSpace);
  const ownSpaceTitle = SpaceUtils.getSpaceTitle(ownSpace);
  const showMemberBadge =
    !isInvite &&
    SpaceUtils.isMasterNoum(guestSpace) &&
    SpaceUtils.isMasterNoum(ownSpace);
  const dateTime = item.requestedAt
    ? format(new Date(parseFloat(item.requestedAt)), 'MMM dd, yyyy hh:mm a')
    : '';
  const labelForDateTime =
    isInvite && isReceived && guestSpace
      ? t(`noumena.noum.invited_by_`, {
          userName: UserUtil.renderFullName(guestSpace.uid),
        })
      : '';

  return (
    <RequestsOrInvitesItemDetailWrapper>
      <Stack gap={12}>
        <AvatarClickableWrapper
          onClick={() => navigateToNoum(guestSpace?._id)}
          isClickable={!isUnregistered}
        >
          <Avatar url={profileImage} />
        </AvatarClickableWrapper>
        <Stack vertical>
          <TitleWrapper>
            <TitleSpan onClick={() => navigateToNoum(guestSpace?._id)}>
              {guestSpaceTitle}
            </TitleSpan>
            <TitleSpan>
              {!SpaceUtils.isMasterNoum(ownSpace) && (
                <>
                  <Icon
                    color="--icon-tablecell-neutral-default"
                    name="arrow_right_m"
                    size={16}
                  />
                  {SpaceUtils.isMasterNoum(guestSpace) ? (
                    <TSpan onClick={() => navigateToNoum(ownSpace?._id)}>
                      {ownSpaceTitle}
                    </TSpan>
                  ) : (
                    ''
                  )}
                </>
              )}
              {showMemberBadge && <MemberBadge />}
            </TitleSpan>
          </TitleWrapper>
          <TSpan
            font="footnote"
            colorToken="--text-tablecell-body-neutral-default"
          >
            <Trans
              i18nKey="noumena.noums.requests_or_invites_item.date_time_information"
              values={{ labelForDateTime, dateTime }}
              components={{
                link1: (
                  <TSpan
                    font="footnote-bold"
                    onClick={() => navigateToNoum(guestSpace?._id)}
                  />
                ),
              }}
            />
          </TSpan>
        </Stack>
      </Stack>
      {showMessage && (
        <IconButton
          icon={<Icon name="message_outline_m" size={24} />}
          size="small"
          textOnly
          tooltipPosition="top-center"
          tooltipText={isMobile ? '' : item.message || ''}
          onClick={handleClickShowMessage}
        />
      )}
    </RequestsOrInvitesItemDetailWrapper>
  );
};

export default RequstsOrInvitesItemDetail;
