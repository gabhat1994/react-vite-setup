import styled from 'styled-components';

export const CustomToolTipWrapper = styled.div`
  font-size: var(--font-systeminfo-small-size);
  padding: 10px 16px;
  border-radius: 8px;

  & * {
    color: var(--text-tooltip-neutral-alt-default);
  }
`;
