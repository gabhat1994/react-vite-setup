import React from 'react';
import { Button } from '@/components/Button';
import { BottomSheet, BottomSheetBody } from '@/components/BottomSheet';
import Icon, { type IconProps } from '@/components/Icon/Icon';

export interface ChamberBottomSheetItem {
  key: string;
  label: string;
  icon: IconProps['name'];
  iconColor: string;
  onClick: () => void;
}

export const ChamberBottomSheet: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  dropDownOptions: ChamberBottomSheetItem[];
}> = ({ isOpen, handleClose, dropDownOptions }) => (
  <BottomSheet
    enableCloseButton
    testId="chamber-BottomSheet"
    open={isOpen}
    onClose={handleClose}
    style={{ padding: 16, maxWidth: 375 }}
    usePortal={true}
    position="fixed"
  >
    <BottomSheetBody
      style={{
        justifyContent: 'flex-end',
        paddingBottom: '30px',
        gap: 8,
      }}
    >
      {dropDownOptions.map((item) => (
        <Button
          size="full"
          leftIcon={<Icon color={item.iconColor} name={item.icon} size={24} />}
          onClick={item.onClick}
          key={item.key}
        >
          {item.label}
        </Button>
      ))}
    </BottomSheetBody>
  </BottomSheet>
);
