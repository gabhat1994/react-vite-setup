export type UserProfilePopupProps = {
  showKnockBtn?: boolean;
  showUserPopup: boolean;
  attendeeId: string | undefined;
  onCloseUserPopup: () => void;
};

export type GroupProfilePopupProps = {
  groupId: string | undefined;
  showGroupPopup: boolean;
  onCloseGroupPopup: () => void;
};
