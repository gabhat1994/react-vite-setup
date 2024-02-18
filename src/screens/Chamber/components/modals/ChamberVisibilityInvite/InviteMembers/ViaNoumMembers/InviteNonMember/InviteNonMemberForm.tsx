import { Spacer, Stack, StackItem } from '@/layout';
import { TextField } from '@/components/TextField';
import { Controller } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';
import { useBreakpoints } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { getErrorProps } from '@/utils/forms';
import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { useInviteNonMemberForm, type InviteNonMemberValues } from './schema';
import * as S from '../../../styles';
import { BlockedCountriesListModal } from '../../BlockedCountriesList';

type ModalType = 'blocked-countries';

interface InviteNonMemberFormProps {
  onSubmit(values: InviteNonMemberValues): void;
  onCancel(): void;
}

export function InviteNonMemberForm({
  onSubmit,
  onCancel,
}: InviteNonMemberFormProps) {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useInviteNonMemberForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      message: '',
    },
  });

  return (
    <>
      <ModalBody maxHeight="calc(100vh - 170px)">
        <Stack align="start" fullWidth gap={16} vertical={isMobile}>
          <StackItem basis={isMobile ? '0' : '50%'} fullWidth={isMobile}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t(
                    'noumena.noums.member_management.invite_non_members.email.label',
                  )}
                  {...getErrorProps(fieldState)}
                />
              )}
            />
          </StackItem>
          <StackItem basis={isMobile ? '0' : '25%'} fullWidth={isMobile}>
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t(
                    'noumena.noums.member_management.invite_non_members.first_name.label',
                  )}
                  {...getErrorProps(fieldState)}
                />
              )}
            />
          </StackItem>
          <StackItem basis={isMobile ? '0' : '25%'} fullWidth={isMobile}>
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t(
                    'noumena.noums.member_management.invite_non_members.last_name.label',
                  )}
                  {...getErrorProps(fieldState)}
                />
              )}
            />
          </StackItem>
        </Stack>

        <S.NonMemberDescriptionWrapper isMobile={isMobile}>
          <S.Description
            colorToken="--text-input-neutral-default"
            font="body-s"
          >
            <Trans
              i18nKey="noumena.noums.member_management.invite_non_members.blocked_countries.description"
              components={{
                link_button: (
                  <S.ViewCountriesButton
                    textOnly
                    onClick={() => openModal('blocked-countries')}
                  />
                ),
              }}
            />
          </S.Description>
        </S.NonMemberDescriptionWrapper>
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
            {t('noumena.cancel')}
          </Button>

          <Button
            primary
            size="large"
            softDisabled={!isValid}
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            grow
          >
            {t('noumena.noums.member_management.invite_non_members.submit')}
          </Button>
        </Stack>
      </ModalFooter>
      <BlockedCountriesListModal
        isOpen={modalType === 'blocked-countries'}
        onClose={closeModal}
      />
    </>
  );
}
