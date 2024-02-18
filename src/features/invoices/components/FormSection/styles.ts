import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

const Wrapper = styled.div<{ fullSize?: boolean }>`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: ${({ fullSize }) => (fullSize ? '100%' : '50%')};

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
  }
`;

const Header = styled.div``;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;

export default {
  Wrapper,
  Separator,
  Header,
};
