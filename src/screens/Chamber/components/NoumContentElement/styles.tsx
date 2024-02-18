import styled from 'styled-components';
import { Card } from '@/components/Card';

export const NoumContentElementWrapper = styled(Card)<{
  isColumnBackground?: boolean;
}>`
  width: 100%;
  display: flex;
  transition: all 0.1s ease-in-out;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--color-base-gray-80);
  cursor: pointer;
  padding: 40px 0;
  ${({ isColumnBackground }) => !isColumnBackground && 'background: none'};
  :hover {
    border-color: var(--border-column-brand-secondary-default);
    background-color: var(--bg-column-brand-secondary-default);
  }
`;
