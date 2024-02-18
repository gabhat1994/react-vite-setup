import { useCallback, useState, forwardRef, type FocusEvent } from 'react';
import {
  SearchWrapper,
  SearchContainer,
  InputWrapper,
  InputField,
} from './styles';
import { type InviteUserSearchProps } from './types';

export const InviteUserSearch = forwardRef<
  HTMLDivElement,
  InviteUserSearchProps
>(({ inputProps, children }, ref) => {
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (inputProps.onFocus) inputProps.onFocus(e);
      setFocused(true);
    },
    [inputProps],
  );

  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (inputProps.onBlur) inputProps.onBlur(e);
      setFocused(false);
    },
    [inputProps],
  );

  return (
    <SearchWrapper data-testid="invite-user-search" ref={ref}>
      <SearchContainer focused={focused}>
        {children}
        <InputWrapper>
          <InputField {...inputProps} onFocus={onFocus} onBlur={onBlur} />
        </InputWrapper>
      </SearchContainer>
    </SearchWrapper>
  );
});
