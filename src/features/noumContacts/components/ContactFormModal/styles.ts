import styled from 'styled-components';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

const Section = styled(Stack).attrs(() => ({
  gap: 24,
  vertical: true,
  fullWidth: true,
}))``;

const SectionTitle = styled(TSpan).attrs(() => ({
  font: 'body-l-bold',
  colorToken: '--text-modal-header-neutral-default',
}))``;

const SectionBody = styled(Stack).attrs(() => ({
  gap: 16,
  vertical: true,
  fullWidth: true,
}))``;

export default {
  Section,
  SectionTitle,
  SectionBody,
};
