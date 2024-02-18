import styled from 'styled-components';
import { Icon } from '@/components/Icon';

export const PrivacyDropdownSelctedValue = styled.input`
  border: 0;
  color: var(--text-card-neutral-default);
  font-style: normal;
  font-weight: var(--font-body-medium-regular-weight);
  font-size: var(--font-body-medium-size);
  outline: none;
  display: inline-flex;
  align-items: center;
  width: 30%;
`;

export const RightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
  // padding: -4px;
  // width: 9.2px !important;
  // height: 5.2px !important;
  align-self: center;
`;
