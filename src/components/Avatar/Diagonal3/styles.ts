import styled from 'styled-components';

export const StyledDiagonalAvatar3Container = styled.div<{
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

export const StyledAvatarTopContainer = styled.div<{
  size: number;
  border: number;
  borderRadius: number;
  area: number;
  specialSpacing?: number;
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
  left: ${(props) => props.specialSpacing || props.area / 4}px;
`;

export const StyledAvatarLeftContainer = styled.div<{
  size: number;
  border: number;
  borderRadius: number;
  sizeOfSmallest: number;
  specialSpacing?: number;
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
  top: ${(props) =>
    !props.isInline ? props.specialSpacing || props.sizeOfSmallest / 4 : 0}px;
  left: ${(props) => -props.border}px;
`;

export const StyledAvatarBottom = styled.div<{
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
  top: ${(props) => (props.isInline ? '0' : 'unset')};
`;
