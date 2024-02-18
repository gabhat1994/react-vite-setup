import styled from 'styled-components';

import { Button as ButtonStyled } from '@/components/Button';

export const Button = styled(ButtonStyled)`
  height: 24px;
  min-height: 40px;
  display: flex;
  align-items: center;
  background-color: var(--bg-button-neutral-default);
  :hover {
    background-color: var(--bg-button-neutral-alt-hover);
  }
`;
