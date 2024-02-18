import { forwardRef, type Ref, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { t } from 'i18next';
import { Avatar } from '@/components/Avatar/Avatar';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { colorsOfCategory } from '@/screens/Chambers/constants';
import { useAuth } from '@/features/auth/contexts';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { generatePath } from 'react-router';
import ROUTES from '@/constants/routes';
import {
  ContentContainer,
  InviteButton,
  LinkedTagLabel,
  LinkUnderline,
  TimeStampSpan,
  UserDetailStack,
} from './styles';
import { ConnectionDetailModalTabEnum } from './types';
import type IConnectionDetailsContent from './types';

export const ConnectionDetailsContent = forwardRef(
  (
    {
      item,
      selectedTab,
      isOwner,
      isArchived,
      gap,
      closeModal,
      setInvitedInfo,
      showInviteModal,
    }: IConnectionDetailsContent,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { isUnregistered } = useAuth();

    const handleClick = () => {
      if (
        !item?._id ||
        isUnregistered ||
        item?.uid?.userStatus === 'UNREGISTERED'
      )
        return;
      closeModal();
      window.open(generatePath(ROUTES.NOUM, { id: item._id }), '_self');
    };

    const isAvailableToInvite = useMemo(() => {
      const hasInvite = [
        ConnectionRequestTypeEnum.Approved,
        ConnectionRequestTypeEnum.Invited,
        ConnectionRequestTypeEnum.Requested,
      ].includes(item?.connectionWithNoum?.status as ConnectionRequestTypeEnum);

      return !hasInvite && isOwner && !isArchived;
    }, [item?.connectionWithNoum?.status, isOwner, isArchived]);

    const handleClickInvite = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInvitedInfo(item || {});
        showInviteModal();
        closeModal();
      },
      [item, setInvitedInfo, closeModal, showInviteModal],
    );
    return (
      <>
        <ContentContainer
          data-testid="link_container"
          ref={ref}
          onClick={handleClick}
          unregistered={isUnregistered}
        >
          <Stack gap={gap} align="center">
            <Avatar
              url={
                selectedTab === ConnectionDetailModalTabEnum.Noums ||
                selectedTab === ConnectionDetailModalTabEnum.ProjectSpaces ||
                selectedTab === ConnectionDetailModalTabEnum.OwnedNoums
                  ? item?.profileImage || ChamberDefaultImage
                  : UserUtil.getProfilePicture(item?.uid) || ''
              }
            />
            <UserDetailStack vertical>
              <TSpan
                font="body-m-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {selectedTab === ConnectionDetailModalTabEnum.Noums ||
                selectedTab === ConnectionDetailModalTabEnum.ProjectSpaces ||
                selectedTab === ConnectionDetailModalTabEnum.OwnedNoums
                  ? item?.name
                  : getFullName(
                      item?.uid?.firstName,
                      item?.uid?.middleName,
                      item?.uid?.lastName,
                    )}
              </TSpan>
              <TSpan
                font="footnote"
                colorToken="--text-tablecell-header-neutral-default"
              >
                <span>{item?.uid?.title || ''}</span>
              </TSpan>
              {selectedTab === ConnectionDetailModalTabEnum.Connections && (
                <TimeStampSpan
                  font="footnote"
                  colorToken="--text-timestamp-neutral-default"
                >
                  {t('noumena.chamber.link.connection_date')}
                  {format(
                    new Date(item?.approvedAt || new Date()),
                    'dd MMM yyyy',
                  )}
                </TimeStampSpan>
              )}
              {selectedTab === ConnectionDetailModalTabEnum.Followers && (
                <TimeStampSpan
                  font="footnote"
                  colorToken="--text-timestamp-neutral-default"
                >
                  {t('noumena.chamber.link.following_date')}
                  {format(
                    new Date(item?.requestedAt || new Date()),
                    'dd MMM yyyy',
                  )}
                </TimeStampSpan>
              )}
            </UserDetailStack>
          </Stack>
          {item?.category?.name && (
            <LinkedTagLabel
              bgColor={
                colorsOfCategory[
                  item.category.name.toLowerCase() as ChamberBoxNameEnum
                ].bgColor
              }
              color={
                colorsOfCategory[
                  item.category.name.toLowerCase() as ChamberBoxNameEnum
                ].color
              }
            >
              {capitalizeFirstLetter(item.category.name)}
            </LinkedTagLabel>
          )}
          {selectedTab === ConnectionDetailModalTabEnum.Followers && (
            <InviteButton
              secondary
              size="small"
              disabled={!isAvailableToInvite}
              onClick={(e) => handleClickInvite(e)}
            >
              {t('noumena.chamber.invite_follower')}
            </InviteButton>
          )}
        </ContentContainer>
        <LinkUnderline />
      </>
    );
  },
);
