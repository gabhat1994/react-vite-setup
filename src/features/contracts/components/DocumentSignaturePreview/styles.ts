import styled from 'styled-components';
import { Stack, StackItem } from '@/layout';

const Container = styled(Stack).attrs(() => ({
  align: 'stretch',
  justify: 'stretch',
  grow: 1,
  fullWidth: true,
}))`
  height: 100%;
`;

const PdfPreview = styled(StackItem).attrs(() => ({
  grow: 1,
}))``;

const AgreementsPanel = styled(Stack).attrs(() => ({
  gap: 32,
  align: 'stretch',
  justify: 'space-between',
  vertical: true,
  fullWidth: true,
}))`
  background-color: var(--bg-modal-neutral-alt-default);
  padding: 24px;
  width: 368px;
`;

export default {
  Container,
  PdfPreview,
  AgreementsPanel,
};
