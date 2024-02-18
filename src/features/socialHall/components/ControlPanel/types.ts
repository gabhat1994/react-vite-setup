export type ControlPanelProps = {
  isReconnecting: boolean;
  onToggleChat: () => void;
  onToggleMember: () => void;
  isNewMessage?: boolean;
  showChatPanel?: boolean;
  showMembersPanel: boolean;
};

export type VideoControlProps = {
  isError?: boolean;
  isLoading?: boolean;
  onToggle: () => void;
  isCameraEnable: boolean;
};

export type MuteControlProps = {
  isError?: boolean;
  isMuted: boolean;
  isLoading?: boolean;
  onToggle: () => void;
};

export type ModalType = 'leaveEvent' | 'finishEvent';
