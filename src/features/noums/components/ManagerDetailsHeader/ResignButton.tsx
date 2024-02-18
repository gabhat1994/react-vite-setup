import { Button, Icon } from '@/components';
import React from 'react';

type ResignButtonProps = {
  onClick: () => void;
};

export const ResignButton: React.FC<ResignButtonProps> = ({ onClick }) => (
  <Button
    leftIcon={<Icon name="close_m" size={16} />}
    secondary
    intent="negative"
    size="small"
    onClick={onClick}
  >
    Resign from the Manager Role
  </Button>
);
