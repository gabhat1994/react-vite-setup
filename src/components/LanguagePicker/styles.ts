import styled from 'styled-components';
import { Icon } from '@/components/Icon';

const RightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;

export default {
  RightIcon,
};
