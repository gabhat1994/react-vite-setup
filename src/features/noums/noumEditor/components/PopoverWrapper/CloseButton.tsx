import { type FC } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { CloseButtonWrapper } from './styles';

export const CloseButton: FC<{ onClose: () => void }> = (props) => (
  <CloseButtonWrapper>
    <Button
      {...props}
      testId="popover_close_btn"
      size="small"
      textOnly
      icon={
        <Icon name="close_m" size={24} color="--icon-card-neutral-default" />
      }
      onClick={props.onClose}
    />
  </CloseButtonWrapper>
);
