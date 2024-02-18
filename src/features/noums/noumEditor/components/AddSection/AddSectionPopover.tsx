import { type FC, useState } from 'react';

import { AddSectionComponent } from './AddSectionComponent';
import { type SelectLayout } from '../../shared/types/selectSectionLayout';
import { PopoverWrapper } from '../PopoverWrapper';
import { SectionLayoutPicker } from '../SectionLayoutPicker';

export const AddSectionPopover: FC<SelectLayout> = ({
  position = 0,
  setIsLoading,
}) => {
  const [isPopover, setIsPopover] = useState(false);

  return (
    <PopoverWrapper
      offsetY={68}
      isOpen={isPopover}
      onClose={() => setIsPopover(false)}
      renderPopoverContent={() => (
        <SectionLayoutPicker
          position={position}
          setIsPopover={setIsPopover}
          setIsLoading={setIsLoading}
        />
      )}
      renderTargetContent={() => (
        <AddSectionComponent onClick={() => setIsPopover(true)} />
      )}
    />
  );
};

export default AddSectionPopover;
