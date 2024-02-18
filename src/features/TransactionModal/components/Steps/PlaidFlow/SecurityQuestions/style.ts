import styled from 'styled-components';
import { Icon } from '@/components/Icon';

export const AddressRightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'}
`;

export const FallbackModal = styled.div`
  height: 600px;
`;
