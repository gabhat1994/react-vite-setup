import styled from 'styled-components';

const Container = styled.div<{
  size: number;
  color?: string;
  isPinned?: boolean;
  height?: string | null;
  width?: string | null;
}>`
  height: ${(props) => props.height ?? props.size}px;
  width: ${(props) => props.width ?? props.size}px;
  display: flex;
  ${(props) => (props.onClick ? 'cursor: pointer;' : '')};
  * {
    fill: ${(props) => `var(${props.color})`} !important;
  }
  path {
    fill: ${(props) => `var(${props.color})`} !important;
  }
  position: relative;
  ${({ isPinned }) => (isPinned ? 'svg {position: absolute;}' : '')}
`;

export const ImageIcon = styled.img<{ size: number }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default Container;
