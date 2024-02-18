import styled from 'styled-components';

export const StyledInlineAvatarContainer = styled.div<{
  height: number;
  width: number;
  borderRadius: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.borderRadius}px;
  overflow: hidden;
  display: flex;
`;

export const StyledContentFrame = styled.div<{
  size: number;
  border: number;
  radius: number;
  marginLeft: number;
}>`
  width: ${(props) => props.size + props.border}px;
  height: ${(props) => props.size + props.border}px;
  border-radius: ${(props) => props.radius}px;
  background-color: transparent;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;

  margin-top: ${(props) => -(props.border / 2)}px;
  margin-left: ${(props) => -props.marginLeft}px;
`;

export const StyledAvatarContainer = styled.div<{
  height: number;
  width: number;
  radius: number;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: ${(props) => props.radius}px;
  overflow: hidden;
`;

export const StyledAvatarImage = styled.img<{
  size: number;
  radius: number;
  border?: boolean;
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  box-sizing: border-box;
  border-radius: ${(props) => props.radius}px;
  border: ${(props) =>
    props.border ? '2px solid var(--bg-card-neutral-alt-default)' : 0};
  overflow: hidden;
`;
