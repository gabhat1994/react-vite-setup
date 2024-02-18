import { devices, mediaSizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

const PageCard = styled(Stack).attrs({
  vertical: true,
})`
  width: 100%;
  padding: 48px 24px 0;
  gap: 24px;

  @media ${devices.TABLET} {
    gap: 40px;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;

const LeftContainer = styled(Stack)`
  width: 50%;
  height: 100%;
  background: var(--bg-body-neutral-alt-default);

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
  }
`;

const PreviewContainer = styled(Stack)`
  width: 50%;
  background-color: var(--bg-card-neutral-default);
  padding: 40px;
  justify-content: center;
`;

const PreviewStickyContainer = styled(Stack)`
  max-width: 100%;

  @media ${devices.TABLET} {
    top: 115px;
    position: fixed;
    height: calc(100vh - 165px); // 100vh minus header and paddings
  }
`;

const FormContent = styled(Stack).attrs({
  vertical: true,
})`
  gap: 40px;
  max-width: 580px;
  margin: 0 auto;
  padding: 40px 24px;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    max-width: 100%;
    width: 100%;
  }
`;

const Container = styled(Stack)`
  width: 100%;
  align-items: stretch;
`;

export default {
  PageCard,
  Separator,
  PreviewContainer,
  LeftContainer,
  PreviewStickyContainer,
  Container,
  FormContent,
};
