import styled from 'styled-components';

export const StyledDiagonalAvatar2Container = styled.div<{
  size: number;
  borderRadius: number;
}>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.borderRadius}px;
`;

export const StyledAvatar = styled.img<{ size: number; borderRadius: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.borderRadius}px;
  overflow: hidden;
`;

export const StyledAvatarTopLeftContainer = styled.div<{
  size: number;
  border: number;
  borderRadius: number;
  isInline: boolean;
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.borderRadius}px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0px;
  left: 0px;
`;

export const StyledAvatarBottomRight = styled.div<{
  size: number;
  border: number;
  borderRadius: number;
  isInline: boolean;
}>`
  width: ${(props) => props.size + 2 * props.border}px;
  height: ${(props) => props.size + 2 * props.border}px;
  border-radius: ${(props) => props.borderRadius}px;
  background-color: transparent;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: ${(props) => (!props.isInline ? `${-props.border}px` : 'unset')};
  right: ${(props) => -props.border}px;
  top: ${(props) => (!props.isInline ? 'unset' : '0')};
`;
