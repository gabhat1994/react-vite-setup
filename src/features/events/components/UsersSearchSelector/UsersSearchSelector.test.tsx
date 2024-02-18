import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { t } from 'i18next';
import { render } from '@/test-utils';
import { UsersSearchSelector } from '.';
import { MembersSearch } from '../EventMembers/MembersSearch';

describe('<UsersSearchSelector>', () => {
  test('UsersSearchSelector', () => {
    const setMembers = vi.fn();
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <UsersSearchSelector
          type="member"
          chamberId=""
          initialData={[]}
          searchPlaceholder={t('noumena.event.modal.add_members_placeholder')}
          onChangeSelectedUsers={setMembers}
          dropdownProps={{
            placement: 'bottom',
            usePortal: false,
          }}
          renderSearch={({
            inputProps,
            inputRef,
            selectedOptions,
            isOpened,
            hasSelectedOption,
            onUnSelectUser,
            onClose,
          }) => (
            <MembersSearch
              multiselect
              ref={inputRef}
              label={t('noumena.event.modal.invite_members_title')}
              inputProps={inputProps}
              hasSelectedOption={hasSelectedOption}
              selectedOptions={selectedOptions}
              isOpened={isOpened}
              onUnSelectUser={onUnSelectUser}
              onClose={onClose}
            />
          )}
        />
      </ApolloProvider>,
    );

    expect(queryByTestId('users-search-selector')).toBeTruthy();
  });
});
