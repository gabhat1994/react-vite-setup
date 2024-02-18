import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import Reference from './index';

const renderReferenceScreen = () =>
  render(
    <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
      <BrowserRouter>
        <Reference />
      </BrowserRouter>
    </ApolloProvider>,
  );

describe('<Reference />', () => {
  test('render reference page', () => {
    const { container } = renderReferenceScreen();
    expect(container).toBeTruthy();
  });
});
