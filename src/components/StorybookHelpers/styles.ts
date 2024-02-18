import styled from 'styled-components';

export const StyledLabelGroup = styled.div<{ columns: number }>`
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
  grid-column: 1 / ${({ columns }) => columns};
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  width: 100%;
`;

export const LabelWrapStyled = styled.span`
  margin-bottom: 16px;
`;

export const LabelStyled = styled.label`
  margin-bottom: 4px;
  padding-top: 8px;
  display: inline-block;
  font-family: var(--font-family);
  font-size: var(--font-body-medium-size);
  font-weight: var(--font-body-medium-weight);
`;
