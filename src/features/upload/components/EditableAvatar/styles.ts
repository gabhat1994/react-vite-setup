import styled from 'styled-components';
import { StyledAvatarContainer } from '@/components/Avatar/Avatar/styles';

export const Container = styled.div<{ noMargin?: boolean }>`
  width: fit-content;
  ${({ noMargin }) =>
    !noMargin &&
    `
  ${StyledAvatarContainer} {
    margin-left: auto;
    margin-right: auto;
  }`}
`;
