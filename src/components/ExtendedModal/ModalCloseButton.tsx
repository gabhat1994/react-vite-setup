import { type FC } from 'react';
import { type CSSProperties } from 'styled-components';
import { Icon } from '@/components/Icon';
import { CloseButtonWrapper } from './styles';
import { Button } from '../Button';
import { type IModal, type IModalCloseButtonStyle } from './types';

export const ModalCloseButton: FC<
  IModalCloseButtonStyle & {
    onClose: IModal['onClose'];
    padding?: CSSProperties['padding'];
    transparentModalCloseButton?: Boolean;
    isFullScreen?: boolean;
    hasBackButton?: boolean;
  }
> = (props) => (
  <CloseButtonWrapper
    isFullScreen={props.isFullScreen}
    top={props.top || props.padding}
    horizontal={props.horizontal || props.padding}
    enforceLeft={props.enforceLeft || props.hasBackButton || props.isFullScreen}
    enforceRight={
      props.enforceRight || (!props.isFullScreen && !props.enforceLeft)
    }
    transparentModalCloseButton={props.transparentModalCloseButton}
  >
    <Button
      {...props}
      testId="modal_close_btn"
      size="small"
      tertiary={!props?.primary}
      style={!props.defaultBtnForMobile ? { width: 'auto' } : {}}
      textOnly={
        (!props.defaultBtnForMobile && props.isFullScreen) ||
        props.hasBackButton
      }
      icon={
        <Icon
          style={{ paddingTop: props.hasBackButton ? 6 : 0 }}
          name={props.hasBackButton ? 'arrow_left_m' : 'close_m'}
          size={24}
          color={props.color || '--icon-button-brand-primary-default'}
        />
      }
      onClick={props.onClose}
    />
  </CloseButtonWrapper>
);

export default ModalCloseButton;
