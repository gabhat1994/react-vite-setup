import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { type ButtonProps } from '@/components/Button/types';
import { Icon } from '@/components/Icon';

type EditButtonProps = Pick<ButtonProps, 'onClick'>;
export function EditButton({ onClick }: EditButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      tertiary
      onClick={onClick}
      leftIcon={<Icon name="edit_m" size={24} />}
    >
      {t('noumena.contracts_document_preview.header.edit')}
    </Button>
  );
}

type DuplicateButtonProps = Pick<ButtonProps, 'onClick'>;
export function DuplicateButton({ onClick }: DuplicateButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      tertiary
      onClick={onClick}
      leftIcon={<Icon name="copy_m" size={24} />}
    >
      {t('noumena.contracts_document_preview.header.duplicate')}
    </Button>
  );
}

type DeleteButtonProps = Pick<ButtonProps, 'onClick'> & { isDraft: boolean };
export function DeleteButton({ onClick, isDraft }: DeleteButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      intent="negative"
      secondary
      onClick={onClick}
      leftIcon={<Icon name="delete_m" size={24} />}
    >
      {isDraft
        ? t('noumena.contracts_document_preview.header.delete_draft')
        : t('noumena.contracts_document_preview.header.delete')}
    </Button>
  );
}

type DeclineButtonProps = Pick<ButtonProps, 'onClick'>;
export function DeclineButton({ onClick }: DeclineButtonProps) {
  const { t } = useTranslation();

  return (
    <Button size="small" intent="negative" secondary onClick={onClick}>
      {t('noumena.contracts_document_preview.header.decline')}
    </Button>
  );
}

type KeepAsDraftButtonProps = Pick<ButtonProps, 'onClick'>;
export function KeepAsDraftButton({ onClick }: KeepAsDraftButtonProps) {
  const { t } = useTranslation();

  return (
    <Button size="small" secondary onClick={onClick}>
      {t('noumena.contracts_document_preview.header.keep_as_draft')}
    </Button>
  );
}

type SaveButtonProps = Pick<ButtonProps, 'onClick' | 'disabled' | 'loading'> & {
  isDraft: boolean;
};
export function SaveButton({
  onClick,
  disabled,
  isDraft,
  loading,
}: SaveButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      secondary
      disabled={disabled}
      onClick={onClick}
      loading={loading}
    >
      {isDraft
        ? t('noumena.contracts_document_form.header.save_draft')
        : t('noumena.contracts_document_form.header.save')}
    </Button>
  );
}

type SendButtonProps = Pick<ButtonProps, 'softDisabled'>;
export function SendButton({ softDisabled }: SendButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="submit"
      size="small"
      softDisabled={softDisabled}
      intent="positive"
    >
      {t('noumena.contracts_document_preview.header.send')}
    </Button>
  );
}

type SummaryButtonProps = Pick<
  ButtonProps,
  'onClick' | 'softDisabled' | 'loading'
>;
export function SummaryButton({
  onClick,
  softDisabled,
  loading,
}: SummaryButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="submit"
      size="small"
      softDisabled={softDisabled}
      onClick={onClick}
      intent="positive"
      loading={loading}
    >
      {t('noumena.contracts_document_form.header.preview')}
    </Button>
  );
}

type DownloadPdfButtonProps = Pick<ButtonProps, 'onClick'>;
export function DownloadPdfButton({ onClick }: DownloadPdfButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      tertiary
      onClick={onClick}
      leftIcon={<Icon name="download_m" size={24} />}
    >
      {t('noumena.contracts_document_preview.header.download_pdf')}
    </Button>
  );
}

type ResendButtonProps = Pick<ButtonProps, 'onClick'>;
export function ResendButton({ onClick }: ResendButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      tertiary
      onClick={onClick}
      leftIcon={<Icon name="send_m_1" size={24} />}
    >
      {t('noumena.contracts_document_preview.header.resend')}
    </Button>
  );
}
