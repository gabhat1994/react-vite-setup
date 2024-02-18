import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { systemInfoSmallTypography } from '@/components/Typography';

export const ControlPanelWrapper = styled.div<{ disabled: boolean }>`
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: 96px;
  box-sizing: border-box;
  background-color: var(--bg-card-neutral-alt-default);
  box-shadow: 1px -1px 0px var(--color-base-gray-90);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 8px;
    height: 88px;
  }
  ${({ disabled }) =>
    disabled &&
    `
    filter: opacity(0.7);
    pointer-events: none;
    cursor: disabled;
  `}
`;

export const ControlPanelIcon = styled.div<{
  bgColor?: string;
  cursorAllowed?: boolean;
  hoverColor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 56px;
  min-width: 56px;
  box-sizing: border-box;
  background-color: ${({ bgColor }) =>
    bgColor ?? 'var(--bg-button-neutral-default)'};
  border-radius: 8px;
  cursor: ${({ cursorAllowed }) =>
    !cursorAllowed ? 'not-allowed' : 'pointer'};
  padding: 0 16px;
  svg {
    ${({ cursorAllowed }) =>
      !cursorAllowed &&
      `
      opacity: 0.3;
    `}
  }

  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    top: -28px;
    ${systemInfoSmallTypography.systemInfoSmall}
  }
  :hover {
    background-color: ${({ hoverColor }) =>
      hoverColor ?? 'var(--bg-button-neutral-alt-hover)'};
  }
`;

export const ControlPanelMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    justify-content: center;
    width: 100%;
    gap: 8px;
  }
`;

export const BadgeContainer = styled.div`
  width: 12px;
  height: 12px;
  background-color: var(--border-badge-neutral-alt-default);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 13px;
  z-index: 10;
`;

export const BadgeNotification = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--bg-badge-danger-primary-default);
  z-index: 10;
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  width: 20px;
  height: 20px;
  background: var(--bg-badge-danger-warning-primary);
  border-radius: 10px;
  div {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    top: 0;
    margin: auto;
  }
`;
