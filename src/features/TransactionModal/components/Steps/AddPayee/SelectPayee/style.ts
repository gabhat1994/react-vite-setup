import styled from 'styled-components';

export const Option = styled.div`
  width: 400px;
  height: 88px;
  box-sizing: border-box;
  padding: 20px 16px;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-tablecell-neutral-pressed);
  }
`;

export const OptionName = styled.div`
  width: 70%;
`;
