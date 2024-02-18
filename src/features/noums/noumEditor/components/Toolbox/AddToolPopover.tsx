import { type FC, useCallback, useState } from 'react';
import { PopoverWrapper } from '../PopoverWrapper';
import { Toolbox } from './Toolbox';
import { AddSectionComponent } from '../AddSection/AddSectionComponent';

type AddToolPopoverProps = {
  spaceId?: string;
  baseElementId?: string;
  columnId: string;
  isOpen?: boolean;
  onClose?: () => void;
  position?: number;
};

export const AddToolPopover: FC<AddToolPopoverProps> = ({
  spaceId,
  columnId,
  isOpen = false,
  onClose,
  position = 1,
  baseElementId,
}) => {
  const [isPopover, setIsPopover] = useState(isOpen);

  const onSelectElementType = useCallback(() => {
    setIsPopover(false);
    onClose!();
  }, [onClose]);

  return (
    <PopoverWrapper
      width={500}
      offsetY={68}
      isOpen={isPopover}
      onClose={() => {
        setIsPopover(false);
        onClose!();
      }}
      renderPopoverContent={() => (
        <Toolbox
          spaceId={spaceId || ''}
          handleSelectElementType={onSelectElementType}
          columnId={columnId || ''}
          position={position}
          baseElementId={baseElementId}
        />
      )}
      renderTargetContent={() => (
        <AddSectionComponent onClick={() => setIsPopover(true)} />
      )}
    />
  );
};

export default AddToolPopover;
