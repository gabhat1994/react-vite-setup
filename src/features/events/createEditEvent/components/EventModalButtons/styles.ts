import styled from 'styled-components';

import { Button as ButtonStyled } from '@/components';

export const Button = styled(ButtonStyled)<{ isNoumEditor?: boolean }>`
  ${({ isNoumEditor }) => isNoumEditor && 'padding: 16px 40px'};
`;
