import styled from 'styled-components';
import { Icon } from '@/components';

export const DropDownIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;
