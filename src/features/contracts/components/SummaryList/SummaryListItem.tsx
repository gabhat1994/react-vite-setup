import { CurrencyEnum } from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import { Stack, StackItem } from '@/layout';
import convertToCurrency from '@/utils/currencyToCurrency';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import S from './styles';

export interface SummaryListItemProps {
  index: number;
  title: string;
  description?: string;
  dueDate?: Date;
  amount?: number;
}

export function SummaryListItem({
  index,
  title,
  description,
  dueDate,
  amount,
}: SummaryListItemProps) {
  return (
    <Stack gap={16} align="center" fullWidth>
      <StackItem basis="20px">
        <TSpan font="body-m" colorToken="--text-card-neutral-default">
          #{index + 1}
        </TSpan>
      </StackItem>
      <Stack vertical gap={4} align="stretch" grow>
        <S.Title>{title}</S.Title>
        {description ? <S.Description>{description}</S.Description> : null}
      </Stack>
      {dueDate ? (
        <Stack gap={8}>
          <TSpan font="body-m-bold">Due: </TSpan>{' '}
          <TSpan font="body-m">{formatDateString(dueDate)}</TSpan>
        </Stack>
      ) : null}
      {amount ? (
        <Stack gap={8}>{convertToCurrency(amount, CurrencyEnum.Usd, 2)}</Stack>
      ) : null}
    </Stack>
  );
}
