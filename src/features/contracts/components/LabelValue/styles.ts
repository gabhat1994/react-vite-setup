import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { type FontTypeRegular } from '@/components/Typography/Typography';
import { Stack } from '@/layout';
import { type LabelValueSize } from './types';

const sizeFontMap: Record<LabelValueSize, FontTypeRegular> = {
  small: 'footnote',
  medium: 'body-m',
};

function getFont(size: LabelValueSize, bold: boolean) {
  const baseFont = sizeFontMap[size];
  return bold ? `${baseFont}-bold` : baseFont;
}

const sizeGapMap: Record<LabelValueSize, number> = {
  small: 4,
  medium: 8,
};

function getGap(size: LabelValueSize, gap?: number) {
  return gap ?? sizeGapMap[size];
}

const Container = styled(Stack).attrs<{
  size: LabelValueSize;
  gap?: number;
  isVertical: boolean;
}>(({ size, gap, isVertical }) => ({
  gap: getGap(size, gap),
  vertical: isVertical,
  align: isVertical ? 'start' : 'baseline',
}))<{ size: LabelValueSize; gap?: number; isVertical: boolean }>``;

const Label = styled(TSpan).attrs<{ size: LabelValueSize }>(({ size }) => ({
  font: getFont(size, false),
  colorToken: '--text-card-neutral-default',
}))<{ size: LabelValueSize }>``;

const Value = styled(TSpan).attrs<{ size: LabelValueSize; bold: boolean }>(
  ({ size, bold }) => ({
    font: getFont(size, bold),
  }),
)<{ size: LabelValueSize; bold: boolean }>``;

export default {
  Container,
  Label,
  Value,
};
