import { Button, Icon } from '@/components';
import React from 'react';

type CancelInviteButtonProps = {
  onClick: () => void;
};

export const CancelInviteButton: React.FC<CancelInviteButtonProps> = ({
  onClick,
}) => (
  <Button
    leftIcon={<Icon name="close_m" size={16} />}
    secondary
    intent="negative"
    size="small"
    onClick={onClick}
  >
    Cancel Invite
  </Button>
);
