import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';

import { AddMembers } from '.';

describe('<EventMembersField>', () => {
  test('EventMembersField', () => {
    const onRemoveMember = vi.fn();
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AddMembers onCancelInvitation={onRemoveMember} />
      </ApolloProvider>,
    );

    expect(queryByTestId('event-members-field')).toBeTruthy();
  });
});
