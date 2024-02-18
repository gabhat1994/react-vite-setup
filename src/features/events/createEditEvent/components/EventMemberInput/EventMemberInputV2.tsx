import { useTranslation } from 'react-i18next';
import { useCallback, useState, forwardRef, type FocusEvent } from 'react';

import {
  SearchInputField,
  SearchUsersWrapper,
  SearchInputWrapper,
  CancelSearchButtonWrapper,
} from '@/features/events/styles';
import { Spacer } from '@/layout';
import { Icon } from '@/components';
import { useBreakpoints } from '@/hooks';
import { Button } from '@/components/Button';
import { SelectedUser } from '@/features/events/components/UsersSearchSelector/SelectedUser';

import type { SearchUsersProps } from './types';
import { SearchUsersContainer } from './styles';

export const EventMemberInputV2 = forwardRef<
  HTMLInputElement,
  SearchUsersProps
>(
  (
    {
      inputProps,
      isEditing,
      hasSelectedOption = false,
      multiselect,
      selectedOptions,
      isOpened,
      onClose,
      onUnSelectUser,
      hideCancelButton,
    },
    ref,
  ) => {
    const { isDesktop } = useBreakpoints();
    const { t } = useTranslation();
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

    const showSearchIcon = isDesktop && !focused && !selectedOptions.length;

    return (
      <SearchUsersWrapper
        data-testid="meber-search-users"
        ref={ref}
        isOpened={isOpened}
      >
        {isEditing && (
          <>
            <SearchUsersContainer focused={focused} isOpened={isOpened}>
              {selectedOptions.map((s) => (
                <SelectedUser
                  key={s.key}
                  multiselect={multiselect}
                  data={s}
                  onRemove={onUnSelectUser}
                />
              ))}
              <SearchInputWrapper
                focused={focused || !hasSelectedOption}
                hasSelectedOption={hasSelectedOption}
              >
                {showSearchIcon && (
                  <>
                    <Icon
                      name="search_m"
                      size={24}
                      color="--icon-input-neutral-default"
                    />
                    <Spacer width={8} />
                  </>
                )}
                <SearchInputField
                  {...inputProps}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </SearchInputWrapper>
            </SearchUsersContainer>
            {!hideCancelButton && (
              <CancelSearchButtonWrapper>
                <Button
                  data-testid="cancel-button"
                  textOnly
                  onClick={() => onClose(false)}
                >
                  {t('noumena.cancel')}
                </Button>
              </CancelSearchButtonWrapper>
            )}
          </>
        )}
      </SearchUsersWrapper>
    );
  },
);
