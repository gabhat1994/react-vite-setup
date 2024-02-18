import { useState } from 'react';

import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';

import { type DocumentType } from '@/apollo/generated/types';
import { Picker } from './Picker';

type DwollaDocumentDropDownProps = {
  documentOptions: DropdownValueType<DocumentType, string>[];
  onSelect: (option: DropdownValueType<DocumentType, string>) => void;
  isMobile: boolean;
  variant: 'primary' | 'success';
};

export const DwollaDocumentDropDown = ({
  documentOptions,
  onSelect,
  isMobile,
  variant,
}: DwollaDocumentDropDownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      usePortal={true}
      usePopStyle={true}
      isAnimation={false}
      options={documentOptions}
      hideIcons
      placement="bottom-start"
      onSelectOption={(option) => {
        onSelect(option);
      }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {({ inputRef, toggle }: DropdownTargetProps<HTMLDivElement>) => (
        <div style={{ width: '100%' }} ref={inputRef}>
          <Picker
            variant={variant}
            isOpen={open}
            onToggle={toggle}
            isMobile={isMobile}
          />
        </div>
      )}
    </Dropdown>
  );
};
