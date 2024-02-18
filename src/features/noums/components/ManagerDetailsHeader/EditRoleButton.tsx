import { Button, Icon } from '@/components';
import React from 'react';

type EditRoleButtonProps = {
  onClick: () => void;
};

export const EditRoleButton: React.FC<EditRoleButtonProps> = ({ onClick }) => (
  <Button
    leftIcon={<Icon name="edit_m" size={16} />}
    tertiary
    size="small"
    onClick={onClick}
  >
    Edit Role
  </Button>
);
