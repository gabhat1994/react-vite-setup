import { Button, Icon } from '@/components';
import React from 'react';

type DisconnectButtonProps = {
  onClick: () => void;
};

export const DisconnectButton: React.FC<DisconnectButtonProps> = ({
  onClick,
}) => (
  <Button
    leftIcon={<Icon name="close_m" size={16} />}
    secondary
    intent="negative"
    size="small"
    onClick={onClick}
  >
    Disconnect
  </Button>
);
