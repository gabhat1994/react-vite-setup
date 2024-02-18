import styled from 'styled-components';

export const Color = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  padding: 0px 20px;
  background-color: var(${(props) => props.color});
`;

export const ColorName = styled.div`
  font-weight: var(--font-body-medium-regular-weight);
  line-height: var(--font-body-medium-line-height);
  font-size: 10px;
  color: var(--color-base-gray-0);
  font-family: var(--font-family);
`;
