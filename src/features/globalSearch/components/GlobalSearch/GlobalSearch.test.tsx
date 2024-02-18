import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { GlobalSearchResultType } from '@/features/globalSearch/components/GlobalSearch/types';
import { type DropdownItemType } from '@/components/Dropdown';
import GlobalSearch from './GlobalSearch';

const setup = () => {
  const mockedRecentSearchesResults: DropdownItemType<GlobalSearchResultType>[] =
    [
      {
        key: '1',
        type: 'value',
        value: GlobalSearchResultType.Member,
        description: 'E-commerce consultant · Connected',
        label: 'John Doe',
      },
      {
        key: '2',
        type: 'value',
        value: GlobalSearchResultType.Noum,
        description: 'Owned by Tom Green · Following',
        label: 'Personal Branding',
      },
      {
        key: '3',
        type: 'value',
        value: GlobalSearchResultType.Noum,
        description: 'Owned by Tom Green',
        label: 'Drone Prototype Project',
      },
      {
        key: '4',
        type: 'value',
        value: GlobalSearchResultType.Noum,
        description: 'Owned by Tom Green  · Connected',
        label: 'Copyright Law 101',
      },
      {
        key: '5',
        type: 'value',
        value: GlobalSearchResultType.Event,
        description: '07/24/2022 · Invited',
        label: 'Business Plan Review with Stella Smith',
      },
    ];

  return render(
    <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
      <BrowserRouter>
        <GlobalSearch recentSearchesResults={mockedRecentSearchesResults} />
      </BrowserRouter>
    </ApolloProvider>,
  );
};

describe('Global Search', () => {
  test('should render properly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('global-search-input')).toBeInTheDocument();
  });
});
