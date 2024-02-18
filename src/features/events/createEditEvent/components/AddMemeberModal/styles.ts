import { Stack } from '@/layout';
import { Button as BaseButton } from '@/components';
import styled from 'styled-components';

export const ButtonContainer = styled(Stack)<{ isMobile: boolean }>`
  margin-top: 16px;
  ${({ isMobile }) =>
    isMobile &&
    `
    position: absolute;
    bottom: 0;
    right: 16px;
  `};
`;


export const Button = styled(BaseButton)`
  padding: 16px 40px;
`