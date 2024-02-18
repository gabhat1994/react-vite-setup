import React from 'react';
import { useTranslation } from 'react-i18next';

import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { UserUtil } from '@/utils/user';

import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useBreakpoints } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { useButtonLoadingGroup } from '@/hooks/buttonLoadingGroup';
import { SpaceUtils } from '@/utils/space';
import { type NoumEditorInvitedProps } from './types';
import { InvitedWrapper, InvitedButtonsStack, InvitedButtons } from './styles';

export const NoumEditorInvited: React.FC<NoumEditorInvitedProps> = ({
  onHandleInvitation,
  invitedFrom,
}) => {
  const { space } = useNoumContext();
  const { t } = useTranslation();

  const { isMobile } = useBreakpoints();

  const { getButtonProps } = useButtonLoadingGroup<'accept' | 'decline'>();

  return (
    <InvitedWrapper
      fullWidth
      justify="space-between"
      align="center"
      padding="8px 16px"
      vertical={isMobile}
      gap={13}
    >
      <Stack gap={8} align="center">
        <Avatar url={UserUtil.getProfilePicture(invitedFrom) ?? ''} size="M" />
        <TSpan font="body-m-bold" colorToken="--text-card-neutral-highlighted">
          {t(
            SpaceUtils.isMasterNoum(space)
              ? 'noumena.editor.home.received_invite_text'
              : 'noumena.editor.received_invite_text',
            {
              name: UserUtil.renderFullName(invitedFrom),
            },
          )}
        </TSpan>
      </Stack>
      <InvitedButtonsStack gap={8}>
        <InvitedButtons
          size={isMobile ? 'full_small' : 'small'}
          {...getButtonProps({
            id: 'decline',
            onClick: () =>
              onHandleInvitation(ConnectionRequestTypeEnum.Declined),
          })}
        >
          {t('noumena.chamber.decline_button')}
        </InvitedButtons>
        <Button
          size="full_small"
          primary
          {...getButtonProps({
            id: 'accept',
            onClick: () =>
              onHandleInvitation(ConnectionRequestTypeEnum.Approved),
          })}
        >
          {t('noumena.chamber.accept_button')}
        </Button>
      </InvitedButtonsStack>
    </InvitedWrapper>
  );
};
