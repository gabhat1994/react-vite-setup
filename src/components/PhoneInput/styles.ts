import styled from 'styled-components';
import { Icon } from '@/components/Icon';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const StyledCountryWrapper = styled.div`
  display: grid;
  grid-template-columns: 8px 1fr;
`;

export const CountryCodeRightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;
