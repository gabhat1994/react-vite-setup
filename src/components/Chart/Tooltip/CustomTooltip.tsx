import {
  type NameType,
  type Payload,
  type ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { type TooltipProps } from 'recharts';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { CustomToolTipWrapper } from './style';

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <CustomToolTipWrapper>
        <TSpan font="footnote-bold">{payload[0].payload.date}</TSpan>
        {payload.map((record: Payload<ValueType, NameType>) => (
          <Stack align="center">
            <Icon
              name="radio_btn_m"
              size={8}
              color={record?.color?.replace(/^var\((.*)\)$/, '$1')}
              style={{
                border: '2px solid var(--border-point-chart-hover)',
                borderRadius: '8px',
                marginRight: '8px',
              }}
            />
            <TSpan colorToken="--text-modal-neutral-default" font="footnote">
              {record.name}:&nbsp;
              {record?.dataKey ? record.payload[record.dataKey] : ''}
            </TSpan>
          </Stack>
        ))}
      </CustomToolTipWrapper>
    );
  }

  return null;
};
