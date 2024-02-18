import { isValidElement, type ReactNode } from 'react';
import S from './styles';
import { type LabelValueLayout, type LabelValueSize } from './types';

interface LabelValueProps {
  label: string;
  value: ReactNode;
  layout?: LabelValueLayout;
  gap?: number;
  size?: LabelValueSize;
  bold?: boolean;
}

export function LabelValue({
  label,
  value,
  gap,
  layout = 'vertical',
  size = 'medium',
  bold = false,
}: LabelValueProps) {
  const isVertical = layout === 'vertical';

  return (
    <S.Container size={size} gap={gap} isVertical={isVertical}>
      <S.Label size={size}>{label}</S.Label>
      {isValidElement(value) ? (
        value
      ) : (
        <S.Value size={size} bold={bold}>
          {value}
        </S.Value>
      )}
    </S.Container>
  );
}
