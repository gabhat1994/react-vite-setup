import styled from 'styled-components';

export const RadioboxOuter = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const RadioboxInner = styled.span<{ active: boolean }>`
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  background: var(--bg-radiobutton-neutral-alt-default);
  border: 1px solid var(--border-radiobutton-neutral-default);
  box-sizing: border-box;
  display: flex;
  & > div {
    display: flex;
    margin: auto;
  }
`;

export const RadioTick = styled.div<{ colorToken: string }>`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${({ colorToken }) => `var(${colorToken})`};
`;
