import styled from 'styled-components';

export const StyledNestedAvatarContainer = styled.div<{
  size: number;
  borderRadius: number;
}>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.borderRadius}px;
`;

export const AvatarChild = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 6px;
`;
