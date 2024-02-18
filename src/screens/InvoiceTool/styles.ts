import styled from 'styled-components';
import { Stack } from '@/layout';
import { mediaSizes } from '@/constants/devices';
import { ResponsiveMain } from '@/layout/SinglePageLayout';

const Container = styled.div`
  background: var(--bg-body-neutral-alt-default);
`;

const Content = styled(Stack)<{ oneColumn?: boolean }>`
  display: grid;
  grid-template-columns: ${({ oneColumn }) => (oneColumn ? '1fr' : '7fr 5fr')};
  width: 100%;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    grid-template-columns: 1fr;
  }
`;

const FormHeaderContainer = styled.div`
  background-color: var(--bg-card-neutral-alt-default);
  width: 100%;
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  position: sticky;
  top: 0px;
  z-index: 100;
`;

const ResponsiveMainStyled = styled(ResponsiveMain)`
  padding-top: 0;
  padding-bottom: 0;
`;

export default {
  Content,
  FormHeaderContainer,
  ResponsiveMainStyled,
  Container,
};
