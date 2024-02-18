import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

const BaseTitle = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

const BaseLabel = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-neutral-default',
})``;

const Value = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-input-neutral-filled',
})``;

const ValueBold = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-input-neutral-filled',
})``;

const BaseTitleWithBG = styled.div`
  height: 48px;
  box-sizing: border-box;
  padding: 12px 16px;
  background-color: var(--bg-card-brand-secondary-highlighted);
`;

export default { BaseTitle, BaseLabel, Value, ValueBold, BaseTitleWithBG };
