import { type FC, type ReactNode, type Ref } from 'react';
import { InputWrapper, RightIcon, LableContainer } from './style';
import { Label } from '../styles';

interface InputProps {
  content?: ReactNode;
  inpRef: Ref<HTMLInputElement>;
  toggle: () => void;
  open: boolean;
  placeHolder?: string;
  hideDropDwonIcon?: boolean;
}

const Input: FC<InputProps> = ({
  content,
  inpRef,
  toggle,
  open,
  placeHolder,
  hideDropDwonIcon = false,
}) => (
  <InputWrapper ref={inpRef} onClick={toggle}>
    {content || (
      <LableContainer>
        <Label font="body-l" colorToken="--text-input-neutral-default">
          {placeHolder}
        </Label>
      </LableContainer>
    )}
    {hideDropDwonIcon || (
      <RightIcon
        name="chevron_small_down_m"
        size={24}
        data-testid="styledAddressDownArrow"
        isOpen={open}
        color="--icon-tablecell-neutral-default"
      />
    )}
  </InputWrapper>
);

export default Input;
