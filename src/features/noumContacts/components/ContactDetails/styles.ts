import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { mediaSizes } from '@/constants/devices';
import { Icon } from '@/components/Icon';

const Container = styled(Stack).attrs(() => ({
  gap: 12,
  align: 'stretch',
  fullWidth: true,
  vertical: true,
}))``;

const SectionsContainer = styled(Stack).attrs(() => ({
  gap: 12,
  fullWidth: true,
  align: 'stretch',
}))`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(Stack).attrs(() => ({
  vertical: true,
  gap: 12,
  grow: 1,
  align: 'stretch',
  justify: 'start',
}))`
  padding: 16px;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 8px;
`;

const Header = styled(Stack).attrs(() => ({
  gap: 8,
  align: 'center',
}))``;

const ErrorIcon = styled(Icon).attrs(() => ({
  name: 'warning_m',
  size: 20,
  color: '--icon-card-warning-default',
}))``;

const Title = styled(TSpan).attrs(() => ({
  font: 'body-m-bold',
  colorToken: '--text-card-header-neutral-highlighted',
}))``;

const Content = styled(Stack).attrs(() => ({
  vertical: true,
  gap: 0,
  align: 'stretch',
}))``;

const TextHighlighted = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-highlighted',
}))``;

const Text = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-default',
}))``;

const MissingInfo = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-disabled',
}))``;

export default {
  Container,
  SectionsContainer,
  Section,
  Header,
  Content,
  Title,
  ErrorIcon,
  MissingInfo,
  TextHighlighted,
  Text,
};
