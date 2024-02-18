import { Controller } from 'react-hook-form';
import { Button } from '@/components/Button';
import { useTranslation } from 'react-i18next';
import { TextArea } from '@/components/TextArea';
import { Spacer, Stack, StackItem } from '@/layout';
import { NoumRolePicker } from '@/features/noums/components/NoumRolePicker';
import { useBreakpoints } from '@/hooks';
import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { useInviteMembersForm, type InviteMembersValues } from './schema';
import { InviteUserPicker } from './InviteUserPicker/InviteUserPicker';

interface InviteMemberFormProps {
  // @TODO: Use this to fetch members list and cross-check for existing members in the dropdown.
  noumId: string;
  onCancel(): void;
  onSubmit(values: InviteMembersValues): Promise<void>;
}

export function InviteMemberForm({
  onCancel,
  onSubmit,
}: InviteMemberFormProps) {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useInviteMembersForm({
    defaultValues: {
      userIds: [],
      roleId: '',
      message: '',
    },
  });

  return (
    <>
      <ModalBody maxHeight="calc(100vh - 170px)">
        <Stack fullWidth gap={16} vertical={isMobile}>
          <StackItem grow={!isMobile} fullWidth={isMobile}>
            <Controller
              control={control}
              name="userIds"
              render={({ field }) => (
                <InviteUserPicker
                  value={field.value}
                  onChange={field.onChange}
                  helperText={t(
                    `noumena.chamber_edit.visibility.invite_description`,
                  )}
                  placeholder={t(
                    'noumena.chamber_edit.visibility.invite_placeholder',
                  )}
                />
              )}
            />
          </StackItem>
          <StackItem shrink fullWidth={isMobile}>
            <Controller
              control={control}
              name="roleId"
              render={({ field }) => (
                <NoumRolePicker
                  value={field.value}
                  onChange={(option) => field.onChange(option.value)}
                  label="Role"
                />
              )}
            />
          </StackItem>
        </Stack>
        <Spacer height={16} />
        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, ...fieldProps } }) => (
            <TextArea
              {...fieldProps}
              autoResize
              label={t(
                'noumena.chamber_edit.visibility.invite_message.input_placeholder',
              )}
              maxLength={100}
              onChange={(e) =>
                onChange(e.target.value.trimStart().slice(0, 100))
              }
            />
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Stack gap={16} fullWidth>
          <Button tertiary size="large" onClick={onCancel} grow>
            Cancel
          </Button>

          <Button
            primary
            size="large"
            disabled={!isValid}
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            grow
          >
            {t(`noumena.noums.member_management.invite_members.submit`)}
          </Button>
        </Stack>
      </ModalFooter>
    </>
  );
}
