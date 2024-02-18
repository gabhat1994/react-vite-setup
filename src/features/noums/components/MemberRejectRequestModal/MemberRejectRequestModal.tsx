import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { useTranslation } from 'react-i18next';
import { UserUtil } from '@/utils/user';
import { Stack } from '@/layout';
import { Avatar } from '@/components/Avatar/Avatar';
import { format } from 'date-fns';

interface MemberRejectRequestModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  members: NoumMemberWithInvitationFragment[];
  isLoading?: boolean;
}

export function MemberRejectRequestModal({
  isOpen,
  onClose,
  onConfirm,
  members,
  isLoading,
}: MemberRejectRequestModalProps) {
  const { t } = useTranslation();

  if (members.length === 0) {
    return null;
  }

  const [member] = members;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size={ModalSize.S}
      spacingMode="gap-content"
    >
      <ModalHeader>
        {t('noumena.chamber.reject_request_modal.title')}
      </ModalHeader>
      <ModalBody gap={24}>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t('noumena.chamber.reject_request_modal.description')}
        </TSpan>

        <Stack gap={12} align="center">
          <Avatar size="L" url={UserUtil.getProfilePicture(member.user)} />
          <Stack vertical>
            <TSpan font="body-m-bold">
              {UserUtil.renderFullName(member.user)}
            </TSpan>
            {member.activeRequest?.requestedAt && (
              <TSpan
                font="footnote"
                colorToken="--text-tablecell-neutral-default"
              >
                {format(
                  new Date(member.activeRequest?.requestedAt),
                  'MM/dd/yyyy, HH:mm a',
                )}
              </TSpan>
            )}
          </Stack>
        </Stack>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          intent="negative"
          size="full"
          onClick={onConfirm}
          loading={isLoading}
        >
          {t('noumena.chamber.reject_request_modal.submit')}
        </Button>
        <Button tertiary size="full" onClick={onClose}>
          {t('noumena.chamber.reject_request_modal.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
