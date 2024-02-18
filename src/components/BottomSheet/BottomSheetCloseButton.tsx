import { type FC } from 'react';
import { type CSSProperties } from 'styled-components';
import { Icon } from '@/components/Icon';
import { type IBottomSheet } from './types';
import { Button } from '../Button';
import S from './styles';

 const BottomSheetCloseButton: FC<{
  onClose: IBottomSheet['onClose'];
  padding?: CSSProperties['padding'];
  textOnly?: boolean;
}> = (props) => (
  <S.CloseButtonWrapper padding={props.padding}>
    <Button
      size="small"
      tertiary
      textOnly={props.textOnly}
      icon={
        <Icon name="close_m" size={16} color="--icon-button-neutral-default" />
      }
      onClick={props.onClose}
    />
  </S.CloseButtonWrapper>
);

export default BottomSheetCloseButton;
