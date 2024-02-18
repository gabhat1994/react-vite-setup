import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

interface AvatarWrapperProps {
  isActiveSpeaker?: boolean;
}

interface AvatarMaskProps {
  isOffline?: boolean;
}

const AvatarSize = '56px';

export const AttendeeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  :hover {
    background-color: var(--bg-card-neutral-hover);
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-width: 3px;
  border-color: var(--bg-card-neutral-alt-default);
  ${({ isActiveSpeaker }: AvatarWrapperProps) =>
    isActiveSpeaker &&
    `
      border-color: var(--border-avatar-brand-primary-default);
      border-radius: 16px;
  `}
`;

export const Microphone = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -4px;
  left: -2px;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  background-color: var(--bg-call-ui-neutral-alt-default);
  border: 2px solid var(--border-call-ui-danger-primary-default);
  border-radius: 8px;
  z-index: 2;
`;

export const NameSpan = styled(TSpan)`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  text-transform: capitalize;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EqualizerContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 24px;
  z-index: 2;
  bottom: -10px;
  left: 16px;
  border-radius: 12px;
  box-sizing: border-box;
  border: 2px solid var(--border-call-ui-neutral-alt-default);
  background-color: var(--bg-call-ui-brand-primary-default);
`;

export const BorderContainer = styled.div`
  position: absolute;
  inset: 0 0;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  border-radius: 16px;
  border: 2px solid var(--border-avatar-brand-primary-default);
`;

export const AvatarMask = styled.div<AvatarMaskProps>`
  position: absolute;
  inset: 4px 4px;
  width: ${AvatarSize};
  height: ${AvatarSize};
  z-index: 1;
  border-radius: 12px;
  background: ${({ isOffline }) =>
    isOffline
      ? 'var(--overlay-avatar-neutral-alt-default)'
      : 'var(--overlay-avatar-neutral-default)'};
  opacity: ${({ isOffline }) => (isOffline ? 0.7 : 0.5)};
`;

export const CenterIconContainer = styled.div`
  position: absolute;
  inset: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const InvitedContainer = styled(TSpan)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 8px;
  gap: 10px;
  background: var(--bg-call-ui-brand-secondary-default);
  position: absolute;
  width: 55px;
  height: 24px;
  left: calc(50% - 55px / 2);
  bottom: 0px;
  border: 2px solid var(--border-call-ui-neutral-alt-default);
  border-radius: 1000px;
`;

export const OptionMenuWrapper = styled.div`
  position: relative;
  display: flex;
`;
