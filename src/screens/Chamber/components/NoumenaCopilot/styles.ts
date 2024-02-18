import styled from 'styled-components';
import { flexRow, borderBox } from '@/common/globalStyles';

export const NoumenaCopilotContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 12px 16px 0px;
  gap: 12px;
`;

export const ResultWrapper = styled.div`
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 16px;
  margin: 16px;
  border-radius: 16px;
  background-color: #e2eef1;
  color: var(--text-color);
  ${flexRow}
  ${borderBox}
`;
export const StyledAvatar = styled.img`
  min-width: 52px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
`;

export const KeywordWrapper = styled.div`
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 16px;
  margin: 16px;
  border-radius: 16px;
  background-color: #dff4df;
  display: flex;
  flex-direction: row-reverse;
  color: var(--text-color);
`;

export const NoResultWrapper = styled.div`
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 16px;
  margin: 16px;
  border-radius: 16px;
  color: var(--text-color);
  ${flexRow}
  ${borderBox}
`;
