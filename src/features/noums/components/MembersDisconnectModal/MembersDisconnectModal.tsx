import { type NoumMemberBasicFragment } from '@/apollo/graphql';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Trans, useTranslation } from 'react-i18next';
import { getBulkMembersActionTranslationMeta } from '../../utils';

interface MembersDisconnectModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  members: NoumMemberBasicFragment[];
  isLoading?: boolean;
}

export function MembersDisconnectModal({
  isOpen,
  onClose,
  onConfirm,
  members,
  isLoading,
}: MembersDisconnectModalProps) {
  const { t } = useTranslation();
  const { translationSuffix, managersCount, membersCount, userName } =
    getBulkMembersActionTranslationMeta(members);

  if (members.length === 0) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose} size={ModalSize.S}>
      <ModalHeader>
        {t(
          `noumena.chamber.disconnect_member_modal.title.${translationSuffix}`,
        )}
      </ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          <Trans
            i18nKey={`noumena.chamber.disconnect_member_modal.body.${translationSuffix}`}
            values={{ userName, membersCount, managersCount }}
            components={{
              b: (
                <TSpan
                  font="body-l"
                  colorToken="--text-modal-neutral-highlighted"
                />
              ),
            }}
          />
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          intent="negative"
          size="full"
          onClick={onConfirm}
          loading={isLoading}
        >
          <Trans
            i18nKey={`noumena.chamber.disconnect_member_modal.submit.${translationSuffix}`}
            values={{ membersCount, managersCount }}
          />
        </Button>
        <Button tertiary size="full" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
