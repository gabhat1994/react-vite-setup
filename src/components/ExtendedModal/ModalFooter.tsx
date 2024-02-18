import { ModalContext } from '@/components/ExtendedModal/ModalContext';
import { ModalFooterStyled } from '@/components/ExtendedModal/styles';
import { type ModalFooterProps } from '@/components/ExtendedModal/types';
import useModalFullScreenMode from '@/hooks/modal/useModalFullScreenMode';
import React, { useContext } from 'react';

export const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  const { size, spacingMode } = useContext(ModalContext);
  const defaultFullScreen = useModalFullScreenMode(size);

  return (
    <ModalFooterStyled
      {...props}
      spacingMode={spacingMode}
      isFullScreen={props.isFullScreen ?? defaultFullScreen}
    />
  );
};

export default ModalFooter;
