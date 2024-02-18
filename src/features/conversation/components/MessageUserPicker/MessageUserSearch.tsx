import {
  useCallback,
  useState,
  forwardRef,
  type FocusEvent,
  useRef,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import {
  SearchWrapper,
  SearchContainer,
  InputWrapper,
  InputField,
  ButtonWrapper,
} from './styles';
import { type MessageUserSearchProps } from './types';

export const MessageUserSearch = forwardRef<
  HTMLInputElement,
  MessageUserSearchProps
>(
  (
    {
      inputProps,
      cancellable = true,
      hasSelectedOption = false,
      onCancel,
      children,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [focused, setFocused] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (focused) {
        const timeout = setTimeout(() => {
          inputRef.current?.focus();
          clearTimeout(timeout);
        }, 100);
      }
    }, [focused, inputRef]);

    const onFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (inputProps.onFocus) inputProps.onFocus(e);
        setFocused(true);
      },
      [inputProps],
    );

    const onClick = useCallback(() => {
      setFocused(true);
    }, []);

    const onBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (inputProps.onBlur) inputProps.onBlur(e);
        setFocused(false);
      },
      [inputProps],
    );

    return (
      <SearchWrapper data-testid="user-search" ref={ref}>
        <SearchContainer focused={focused} onClick={onClick}>
          {children}
          <InputWrapper focused={focused || !hasSelectedOption}>
            <InputField
              ref={inputRef}
              {...inputProps}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </InputWrapper>
        </SearchContainer>
        {cancellable && (
          <ButtonWrapper>
            <Button data-testid="cancel-button" textOnly onClick={onCancel}>
              {t('noumena.cancel')}
            </Button>
          </ButtonWrapper>
        )}
      </SearchWrapper>
    );
  },
);
