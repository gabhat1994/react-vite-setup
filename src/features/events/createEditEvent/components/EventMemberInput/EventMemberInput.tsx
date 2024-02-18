import { useCallback, useState, forwardRef, type FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import {
  SearchInputField,
  SearchUsersHeader,
  SearchUsersWrapper,
  SearchInputWrapper,
  SearchUsersContainer,
  SearchUsersModalTitle,
  SearchUsersActionButton,
  CancelSearchButtonWrapper,
} from '@/features/events/styles';
import { SelectedUser } from '@/features/events/components/UsersSearchSelector/SelectedUser';

import type { SearchUsersProps } from './types';

export const EventMemberInput = forwardRef<HTMLInputElement, SearchUsersProps>(
  (
    {
      inputProps,
      label,
      isEditing,
      hasSelectedOption = false,
      multiselect,
      selectedOptions,
      isOpened,
      onClose,
      onUnSelectUser,
      hideCancelButton,
      hideSaveButton,
    },
    ref,
  ) => {
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

    return (
      <SearchUsersWrapper
        data-testid="search-users"
        ref={ref}
        isOpened={isOpened}
      >
        {isOpened && !hideSaveButton && (
          <SearchUsersHeader>
            <SearchUsersActionButton
              textOnly
              icon={
                <Icon
                  name="close_m"
                  size={24}
                  color="--icon-button-brand-primary-default"
                />
              }
              onClick={() => onClose(false)}
            />

            <SearchUsersActionButton textOnly onClick={() => onClose(true)}>
              {t('noumena.button.save')}
            </SearchUsersActionButton>
            <SearchUsersModalTitle>{label}</SearchUsersModalTitle>
          </SearchUsersHeader>
        )}
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
