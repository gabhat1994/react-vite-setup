import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { Rearrage } from './Rearrange';

describe('<Rearrage />', () => {
  test('render', () => {
    const handleSection = vi.fn();
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <Rearrage setSections={handleSection} />
      </ApolloProvider>,
    );
    expect(container).toBeTruthy();

    const RearrangeWapper = getByTestId('rearrange-wapper');
    expect(RearrangeWapper).toHaveStyle(`
      width: 100%;
    `);
  });
});
