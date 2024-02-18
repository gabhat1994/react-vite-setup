import styled from 'styled-components';

export const StyledStep = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid var(--bg-separator-neutral-default);
  :nth-child(2) {
    border-top: unset;
  }
  .step-number {
    width: 32px;
    height: 32px;
    background: var(--bg-counter-brand-primary-default);
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
    color: var(--text-badge-neutral-alt-default);
  }
  .step-content {
    margin-left: 12px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
    color: var(--text-card-neutral-highlighted);
  }
`;

export const Highlight = styled.span`
  /* cursor: pointer; */
  color: var(--text-card-brand-primary-default);
`;
