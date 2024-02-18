import styled from 'styled-components';
import { Icon } from '@/components/Icon';

export const CountryRightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;
