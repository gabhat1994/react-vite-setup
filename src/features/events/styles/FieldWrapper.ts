import styled from 'styled-components';

export const FieldWrapper = styled.div<{
  noBorder?: boolean;
}>`
  width: 100%;
  padding: 24px 0;
  border-bottom: ${({ noBorder }) =>
    noBorder ? 'none' : '1px solid var(--bg-separator-neutral-default)'};
`;
