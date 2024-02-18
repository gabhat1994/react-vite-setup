import { useCallback, useState, forwardRef, type FocusEvent } from 'react';
import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import { SelectedUser } from '../UsersSearchSelector/SelectedUser';
import {
  SearchUsersWrapper,
  SearchUsersContainer,
  SearchInputWrapper,
  SearchInputField,
  SearchUsersHeader,
  SearchUsersActionButton,
  SearchUsersModalTitle,
  SearchIconWrapper,
} from '../../styles';
import type { SearchUsersProps } from '../../createEditEvent/components/EventMemberInput/types';

export const MembersSearch = forwardRef<HTMLInputElement, SearchUsersProps>(
  (
    {
      inputProps,
      label,
      hasSelectedOption = false,
      multiselect,
      selectedOptions,
      isOpened,
      onClose,
      onUnSelectUser,
    },
    ref,
  ) => {
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
        {isOpened && (
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
        <SearchUsersContainer focused={focused} isOpened={isOpened}>
          {(!selectedOptions.length || !isOpened) && (
            <SearchIconWrapper>
              <Icon
                data-testid="event-search-members-icon"
                name="search_m"
                size={24}
                color="--icon-card-neutral-default"
              />
            </SearchIconWrapper>
          )}
          {isOpened &&
            selectedOptions.map((s) => (
              <SelectedUser
                key={s.key}
                multiselect={multiselect}
                data={s}
                onRemove={onUnSelectUser}
              />
            ))}
          <SearchInputWrapper
            focused={focused || !hasSelectedOption}
            hasSelectedOption={Boolean(isOpened && hasSelectedOption)}
          >
            <SearchInputField
              {...inputProps}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </SearchInputWrapper>
        </SearchUsersContainer>
      </SearchUsersWrapper>
    );
  },
);
