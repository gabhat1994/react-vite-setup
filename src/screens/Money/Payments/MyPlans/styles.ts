import styled from 'styled-components';

export const PlanInfo = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const PlanInfoTile = styled.div`
  display: flex;
  border: 1px solid var(--border-card-neutral-highlighted);
  align-items: flex-start;
  padding: 12px;
  border-radius: 8px;
  gap: 16px;
  flex: none;
  flex-grow: 1;
  box-sizing: border-box;
`;

export const PlanSelected = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;