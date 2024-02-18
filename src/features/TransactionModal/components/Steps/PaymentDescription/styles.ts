import styled from 'styled-components';

export const Tooltip = styled.div`
  position: absolute;
  padding: 10px 16px 10px 16px;
  box-sizing: border-box;
  width: 240px;
  height: auto;
  background-color: var(--bg-tooltip-neutral-default);
  border-radius: 8px;
  opacity: 0.95;
  z-index: 1000000000;
  bottom: -350%;
  left: -20%;
  display: flex;
  flex-direction: column;
`;
