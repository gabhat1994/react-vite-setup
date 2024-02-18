import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 86px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 20px 4px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: var(--bg-tablecell-neutral-hover);
  }
`;

export const UserBody = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserTitle = styled(TSpan)``;
