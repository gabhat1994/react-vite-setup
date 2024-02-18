import {
  type UserBasicOutputFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';
import { Button, TSpan } from '@/components';
import { Avatar } from '@/components/Avatar/Avatar';
import { useManagerInvitationActions } from '@/features/noums/hooks/manageMembers/useManagerInvitationActions';
import { Stack } from '@/layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks';
import { type Maybe } from '@/common/types';
import { UserUtil } from '@/utils/user';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import S from './styles';
import { NoumManagerInvitationUtils } from './utils';

interface NoumManagerInvitationProps {
  noum: SpaceOutputFragment;
  invitationSentFrom: Maybe<UserBasicOutputFragment>;
  isManagerInvitation?: boolean;
  isRolePromotion?: boolean;
  onRefetch: () => void;
}

export const NoumManagerInvitation: React.FC<NoumManagerInvitationProps> = ({
  noum,
  invitationSentFrom,
  isManagerInvitation,
  isRolePromotion,
  onRefetch,
}) => {
  const { t } = useTranslation();
  const { addSuccessIconToast } = useToast();
  const { noumMember } = useNoumUserConnectionContext();

  const {
    openModal,
    handleAcceptInvitation,
    approveInvitationLoading,
    rejectInvitationLoading,
    acceptInvitationModalElement,
    rejectInvitationModalElement,
  } = useManagerInvitationActions({
    noum,
    invitationSentFrom,
    isManagerInvitation,
    isRolePromotion,
    onApprove: async () => {
      await onRefetch();
      addSuccessIconToast(
        isManagerInvitation
          ? t('noumena.chamber.manager_invitation.accept.success_toast', {
              noumName: noum.name,
            })
          : t('noumena.chamber.member_invitation.accept.success_toast', {
              noumName: noum.name,
            }),
      );
    },
    onReject: async () => {
      await onRefetch();
      addSuccessIconToast(
        t('noumena.chamber.member_invitation.reject.success_toast'),
      );
    },
  });

  return (
    <S.Container>
      <Stack gap={8} align="center">
        <Avatar size="M" url={UserUtil.getProfilePicture(invitationSentFrom)} />
        <Stack vertical>
          <TSpan
            font="body-m-bold"
            colorToken="--text-card-neutral-highlighted"
          >
            {isManagerInvitation || isRolePromotion
              ? t('noumena.noum_manager_invitation.description_1', {
                  user: UserUtil.renderFullName(invitationSentFrom),
                })
              : t('noumena.noum_member_invitation.description_1', {
                  user: UserUtil.renderFullName(invitationSentFrom),
                })}
          </TSpan>

          <TSpan font="footnote" colorToken="--text-card-neutral-default">
            {isManagerInvitation && noumMember?.activeInvitation
              ? t('noumena.noum_manager_invitation.description_2', {
                  days: NoumManagerInvitationUtils.getInvitationExpiryDays(
                    new Date(noumMember.activeInvitation.invitedAt),
                  ),
                })
              : ''}
          </TSpan>
        </Stack>
      </Stack>

      <Stack gap={8}>
        <Button
          neutral
          size="small"
          loading={rejectInvitationLoading}
          onClick={() => openModal('decline-manager-role')}
        >
          {t('noumena.noum_manager_invitation.decline_button')}
        </Button>
        <Button
          size="small"
          primary
          onClick={handleAcceptInvitation}
          loading={approveInvitationLoading}
        >
          {t('noumena.noum_manager_invitation.accept_button')}
        </Button>
      </Stack>

      {acceptInvitationModalElement}
      {rejectInvitationModalElement}
    </S.Container>
  );
};
