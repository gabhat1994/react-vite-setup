import styled from 'styled-components';
import { rgba, cssVar } from 'polished';
import { Stack } from '@/layout';

const Content = styled(Stack).attrs(() => ({}))`
  position: relative;
`;

const Overlay = styled(Stack).attrs(() => ({
  justify: 'center',
  align: 'center',
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${rgba(cssVar('--bg-overlay-neutral-light'), 0.2)};
`;

const LoadingOverlay = styled(Overlay)``;

const ClickOverlay = styled(Overlay)`
  display: none;
  cursor: pointer;
`;

const PdfPreviewWrapper = styled(Stack)`
  background-color: var(--bg-card-neutral-alt-default);

  &:hover ${ClickOverlay} {
    display: flex;
  }
`;

export default {
  PdfPreviewWrapper,
  Content,
  Overlay,
  ClickOverlay,
  LoadingOverlay,
};
