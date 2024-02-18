import React, { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components/Typography';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';

import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { NoumEditorInvited } from './NoumEditorInvited';
import {
  ColumnContainer,
  NoumActionButton,
  RowContainer,
  TextContainer,
} from './styles';
import { type UserActionProps } from './types';

export const NoumInvitedConnection: React.FC<UserActionProps> = ({
  onHandle,
  isNoumEditor,
}) => {
  const { t } = useTranslation();
  const { space, refetchSpaceById: onRefetchSpaceById } = useNoumContext();
  const { existingConnection } = useNoumUserConnectionContext();

  const isMasterNoum = SpaceUtils.isMasterNoum(space);

  const invitedFrom = existingConnection?.requestFrom;

  const onHandleInvitation = useCallback(
    async (nextStatus: ConnectionRequestTypeEnum) => {
      const isSuccess: boolean = await onHandle(nextStatus);

      if (nextStatus === ConnectionRequestTypeEnum.Approved && isSuccess) {
        onRefetchSpaceById();
      }
    },
    [onHandle, onRefetchSpaceById],
  );

  if (isNoumEditor) {
    return (
      <NoumEditorInvited
        onHandleInvitation={onHandleInvitation}
        invitedFrom={invitedFrom}
      />
    );
  }

  return (
    <ColumnContainer data-testid="noum-invited-connections">
      <RowContainer gap={8}>
        <Avatar url={UserUtil.getProfilePicture(invitedFrom) ?? ''} size="M" />
        <TextContainer>
          <TSpan
            font="body-m-bold"
            colorToken="--text-card-neutral-highlighted"
          >
            <Trans
              i18nKey={
                isMasterNoum
                  ? 'noumena.home.received_invite_text'
                  : 'noumena.received_invite_text'
              }
              values={{
                name: getFullName(
                  invitedFrom?.firstName,
                  invitedFrom?.middleName,
                  invitedFrom?.lastName,
                ),
              }}
              components={{
                gray: (
                  <TSpan
                    data-testid="gray-text"
                    font="body-m-bold"
                    colorToken="--text-card-neutral-default"
                  />
                ),
              }}
            />
          </TSpan>
        </TextContainer>
      </RowContainer>
      <RowContainer>
        <NoumActionButton
          size="full"
          tertiary
          onClick={() => onHandleInvitation(ConnectionRequestTypeEnum.Declined)}
        >
          {t('noumena.chamber.decline_button')}
        </NoumActionButton>
        <NoumActionButton
          size="full"
          primary
          onClick={() => onHandleInvitation(ConnectionRequestTypeEnum.Approved)}
        >
          {t('noumena.chamber.accept_button')}
        </NoumActionButton>
      </RowContainer>
    </ColumnContainer>
  );
};
