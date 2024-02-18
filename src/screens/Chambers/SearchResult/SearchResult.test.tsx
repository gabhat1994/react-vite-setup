import { render } from '@/test-utils';
import { SearchResult } from './SearchResult';

describe('SearchResult', () => {
  test('Should render children with data', () => {
    const { getByTestId, queryByTestId } = render(
      <SearchResult isNoum>
        <span data-testid="children" />
      </SearchResult>,
    );
    expect(queryByTestId('no-result-wrapper')).toBeNull();
    expect(getByTestId('children')).toBeInTheDocument();
  });

  test('Should not render children with empty data', () => {
    const { getByTestId, queryByTestId } = render(
      <SearchResult>
        <span data-testid="children" />
      </SearchResult>,
    );
    expect(getByTestId('no-result-wrapper')).toBeInTheDocument();
    expect(queryByTestId('children')).toBeNull();
  });

  test('Display empty message', () => {
    const { getByTestId } = render(
      <SearchResult noResultText="No results" noResultSubText="Change criteria">
        <span data-testid="children" />
      </SearchResult>,
    );
    expect(getByTestId('no-result-message')).toBeInTheDocument();
    expect(getByTestId('no-result-message')).toHaveTextContent('No results');

    expect(getByTestId('no-result-sub-message')).toBeInTheDocument();
    expect(getByTestId('no-result-sub-message')).toHaveTextContent(
      'Change criteria',
    );
  });

  test('Display default empty message', () => {
    const { getByTestId } = render(
      <SearchResult>
        <span data-testid="children" />
      </SearchResult>,
    );
    expect(getByTestId('no-result-default-message')).toBeInTheDocument();
  });
});
