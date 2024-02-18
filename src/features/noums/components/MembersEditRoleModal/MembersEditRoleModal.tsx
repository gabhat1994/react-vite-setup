import { type NoumMemberBasicFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Controller } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { getBulkMembersActionTranslationMeta } from '../../utils';
import { NoumRolePicker } from '../NoumRolePicker';
import { mapDefaultValuesFromMembers } from './mappers';
import { useMemberEditRoleForm, type MemberEditRoleFormValues } from './schema';

interface MembersEditRoleModalProps {
  isOpen: boolean;
  onConfirm: (values: MemberEditRoleFormValues) => void;
  onClose: () => void;
  members: NoumMemberBasicFragment[];
  isLoading?: boolean;
}

export function MembersEditRoleModal({
  isOpen,
  onClose,
  onConfirm,
  members,
  isLoading,
}: MembersEditRoleModalProps) {
  const { t } = useTranslation();
  const { translationSuffix, managersCount, membersCount } =
    getBulkMembersActionTranslationMeta(members);

  const { handleSubmit, control } = useMemberEditRoleForm({
    defaultValues: mapDefaultValuesFromMembers(members),
  });

  if (members.length === 0) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size={ModalSize.L}
      isScrollableContent={true}
      enableCloseButton
      spacingMode="gap-content"
    >
      <ModalHeader>
        {t(`noumena.chamber.edit_member_role_modal.title`, {
          count: members.length,
        })}
      </ModalHeader>
      <ModalBody overflow="visible">
        <Stack vertical fullWidth align="stretch" gap={16} fixedHeight="100%">
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            {t('noumena.chamber.edit_member_role_modal.body')}
          </TSpan>

          <Controller
            control={control}
            name="roleId"
            render={({ field }) => (
              <NoumRolePicker
                value={field.value}
                onChange={({ value }) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </Stack>
      </ModalBody>
      <ModalFooter gap={16}>
        <Button tertiary size="full" onClick={onClose}>
          Cancel
        </Button>
        <Button
          primary
          size="full"
          loading={isLoading}
          onClick={handleSubmit(onConfirm)}
        >
          <Trans
            i18nKey={`noumena.chamber.edit_member_role_modal.submit.${translationSuffix}`}
            values={{ membersCount, managersCount }}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
}
