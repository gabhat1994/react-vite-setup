import { Icon } from '@/components';
import { useLaunchDarkly } from '@/hooks';

import { Button } from './styles';
import { type EventAddHostBtnProps } from './types';

export const AddMemberBtn = ({
  onClick,
  label,
  disabled,
}: EventAddHostBtnProps) => {
  const {
    flags: { createNewEventV2 },
  } = useLaunchDarkly();

  return (
    <Button
      data-testid="add-host-btn"
      disabled={disabled}
      textOnly={!createNewEventV2}
      leftIcon={
        createNewEventV2 ? (
          <></>
        ) : (
          <Icon
            name="add_m"
            size={24}
            color="--icon-button-brand-secondary-default"
          />
        )
      }
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
