import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { useSendConnectionInviteHelper } from '@/features/noums/hooks/spaceQuery';
import {
  type SpaceOutputFragment,
  useInviteNoumMembersMutation,
} from '@/apollo/graphql';

interface IConnectionInviteModal {
  isOpen: boolean;
  invitedInfo: SpaceOutputFragment;
  ownNoumId: string | undefined;
  closeInviteModal: () => void;
}

export const ConnectionInviteModal = ({
  isOpen,
  invitedInfo,
  ownNoumId,
  closeInviteModal,
}: IConnectionInviteModal) => {
  const { t } = useTranslation();
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions.width < breakpoints.TABLET;
  const { sendInvite } = useSendConnectionInviteHelper();
  const [inviteMembers] = useInviteNoumMembersMutation();

  const [message, setMessage] = useState<string>('');

  const handleClose = useCallback(() => {
    setMessage('');
    closeInviteModal();
  }, [closeInviteModal]);

  const handleChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleClickInvite = useCallback(() => {
    if (!ownNoumId || !invitedInfo) {
      return;
    }
    if (elementPermission) {
      inviteMembers({
        variables: {
          input: {
            noumId: ownNoumId,
            invitationMessage: message,
            members: [
              {
                userId: invitedInfo.uid?._id || '',
                roleId: '6507333f3db5821fbc720e7c',
              },
            ],
          },
        },
      });
    } else {
      sendInvite(ownNoumId, invitedInfo._id || '', message);
    }
    setMessage('');
    closeInviteModal();
  }, [
    ownNoumId,
    invitedInfo,
    closeInviteModal,
    elementPermission,
    sendInvite,
    message,
    inviteMembers,
  ]);

  return (
    <Modal
      open={isOpen}
      size={isMobile ? ModalSize.S : ModalSize.M}
      onClose={handleClose}
      enableCloseButton={!isMobile}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.chamber.invite_modal.title')}</ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          colorToken="--text-tablecell-header-neutral-default"
        >
          {t('noumena.chamber.invite_modal.description')}
        </TSpan>
        <Spacer height={16} />
        <TextArea
          data-testid="message-text-area"
          label={t('noumena.chamber.invite_modal.message_hint')}
          value={message}
          onChange={handleChangeMessage}
          maxLength={100}
          autoResize
          resize={false}
          maxLengthPosition="right"
        />
      </ModalBody>
      <ModalFooter flexDirection={isMobile ? 'column' : 'row-reverse'}>
        <Button
          data-testid="send-invite-btn"
          size="full"
          primary
          disabled={message.length > 100}
          onClick={handleClickInvite}
        >
          {t('noumena.chamber.invite_follower')}
        </Button>
        <Spacer width={16} height={16} />
        <Button
          data-testid="cancel-invite-btn"
          size="full"
          tertiary
          onClick={handleClose}
        >
          {t('noumena.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
