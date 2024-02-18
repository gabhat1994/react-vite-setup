import styled from 'styled-components';
import Icon from '@/components/Icon/Icon';
import { sizes } from '@/constants/devices';

export const InputWrapper = styled.div`
  width: 400px;
  height: 78px;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--bg-tablecell-neutral-pressed);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const LableContainer = styled(InputWrapper)`
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

export const RightIcon = styled(Icon)<{ isOpen?: boolean }>`
  position: absolute;
  top: 40%;
  right: 10px;
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'}
`;
