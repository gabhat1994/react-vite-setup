import styled from 'styled-components';

export const AvatarWrapper = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-width: 3px;
  border-color: var(--border-button-neutral-alt-default);
  gap: 16px;
  border-radius: 12px;
`;

export const CancelIconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -4px;
  right: -2px;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  background-color: var(--bg-button-brand-primary-default);
  border: 2px solid var(--border-button-neutral-alt-default);
  border-radius: 12px;
  z-index: 2;
  cursor: pointer;
`;
