import styled from 'styled-components';
import { Card } from '@/components/Card';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

const PageCard = styled(Card)`
  width: 100%;
  padding: 24px;
  overflow: visible;
`;

const TimelineListItem = styled(Stack).attrs({
  fullWidth: true,
})`
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 8px 0;
`;

const TimelineInfoWrapper = styled(Stack).attrs({
  vertical: true,
})``;

const TimelineIconWrapper = styled.div`
  padding: 2px 8px 0;
`;

const TimelineContainer = styled(Stack).attrs({
  fullWidth: true,
  vertical: true,
})`
  padding-top: 16px;
`;

const DateText = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-timestamp-neutral-default',
})``;

const ActivityText = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

const BodyHighlighted = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

export default {
  PageCard,
  TimelineListItem,
  TimelineInfoWrapper,
  TimelineIconWrapper,
  TimelineContainer,
  DateText,
  ActivityText,
  BodyHighlighted,
};
