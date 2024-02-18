import { type FC } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { Radiobox } from '@/components/Radiobox';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { type ReportReasonItemProps } from './types';
import { StyledStack } from './styles';

export const ReportReasonItem: FC<ReportReasonItemProps> = ({
  label,
  value,
  description,
  isChecked,
  borderBottom,
  reportText,
  onSelect,
  onChangeText,
  isOtherChecked,
  error,
}: ReportReasonItemProps) => {
  const handleCheck = (checked: boolean) => {
    if (checked && value) {
      onSelect(value);
    }
  };

  return (
    <StyledStack
      data-testid="report_reason_container"
      fullWidth
      gap={16}
      borderBottom={borderBottom}
      align="center"
    >
      <Stack vertical fullWidth>
        <TSpan
          data-testid="report_reason_label"
          font="body-l-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {label}
        </TSpan>
        <TSpan
          data-testid="report_reason_description"
          font="body-m"
          colorToken="--text-tablecell-body-neutral-default"
        >
          {description}
        </TSpan>
        {isOtherChecked && (
          <>
            <Spacer height={16} />
            <TextField
              data-testid="report_reason_text_input"
              value={reportText}
              disabled={!isOtherChecked}
              autoFocus={true}
              onChange={onChangeText}
              label={t(
                'noumena.chambers.element.posts.report.reason.other.reason_placeholder',
              )}
              error={error}
              helperText={
                error
                  ? t('noumena.email_login_form.valid_email.field_empty')
                  : ''
              }
            />
          </>
        )}
      </Stack>
      <Stack>
        <Radiobox
          isChecked={isChecked}
          onChange={handleCheck}
          icon={
            <Icon
              name="flag_pl_m"
              size={12}
              color={
                isChecked
                  ? '--icon-radiobutton-brand-primary-default'
                  : '--icon-checkbox-neutral-alt-default'
              }
            />
          }
        />
      </Stack>
    </StyledStack>
  );
};

export default ReportReasonItem;
