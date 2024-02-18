import { t } from 'i18next';
import { ActionButton } from '@/screens/CoreSettings/AccountSettings/styles';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks';

type PasswordSectionProps = {
  onEditOrCreate: () => void;
  label: string;
};

export const PasswordSection = ({
  onEditOrCreate,
  label,
}: PasswordSectionProps) => {
  const { isMobile } = useBreakpoints();
  return (
    <Stack
      fullWidth
      justify="space-between"
      vertical={isMobile}
      gap={16}
      maxWidth={590}
    >
      <Stack vertical gap={8}>
        <TSpan
          font="body-xl-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.password')}
        </TSpan>
        <TSpan
          font="footnote"
          colorToken="--text-tablecell-body-neutral-default"
        >
          Set a permanent password to log in to your account
        </TSpan>
      </Stack>
      <ActionButton testId="edit-password" tertiary onClick={onEditOrCreate}>
        {label}
      </ActionButton>
    </Stack>
  );
};
