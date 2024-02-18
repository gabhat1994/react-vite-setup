import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { formatRelativeVariant } from '@/utils/date';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { ResponsiveContainer } from '@/layout/ResponsiveContainer';
import { useLaunchDarkly } from '@/hooks';
import S from './styles';
import { Tag } from '../Tag';

export type FormHeaderProps = {
  title: string;
  hasUnsavedChanges?: boolean;
  updatedAt?: string;
  buttons?: React.ReactNode;
  onGoBack?(): void;
  showBackButton?: boolean;
  badgeText?: string | null;
  isFullScreenMode?: boolean;
};

const FormHeader = ({
  title,
  updatedAt,
  hasUnsavedChanges,
  buttons,
  onGoBack,
  showBackButton = true,
  isFullScreenMode,
  badgeText,
}: FormHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isTablet } = useBreakpoints();

  const goBack = () => (onGoBack ? onGoBack() : navigate(-1));

  const { flags } = useLaunchDarkly();

  const content = (
    <S.Container $isAppUiV2={flags.newAppNavigation}>
      <Stack align="center" gap={16}>
        {showBackButton && (!flags.newAppNavigation || isFullScreenMode) && (
          <Button
            onClick={goBack}
            neutral
            size="small"
            leftIcon={<Icon name="arrow_left_m" size={24} />}
          />
        )}
        <TSpan font="body-l-bold">{title}</TSpan>
        {badgeText ? (
          <Tag size="medium" tertiary>
            {badgeText}
          </Tag>
        ) : null}
      </Stack>

      <Stack align="center" gap={12}>
        {!isTablet && (
          <TSpan
            font="footnote"
            colorToken="--text-top-nav-neutral-highlighted"
          >
            {updatedAt &&
              t('noumena.form_header.changed_at', {
                timestamp: formatRelativeVariant(updatedAt, 'datetime', 'long'),
              })}

            {hasUnsavedChanges && (
              <>
                {' '}
                <TSpan colorToken="--text-top-nav-danger-primary-default">
                  {t('noumena.form_header.has_unsaved_changes')}
                </TSpan>
              </>
            )}
          </TSpan>
        )}

        {buttons}
      </Stack>
    </S.Container>
  );

  if (flags.newAppNavigation) {
    return content;
  }

  return <ResponsiveContainer>{content}</ResponsiveContainer>;
};

export default FormHeader;
