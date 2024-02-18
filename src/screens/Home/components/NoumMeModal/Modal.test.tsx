import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@/test-utils';
import { NoumMeModal } from './Modal';

describe('<NoumMeModal />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <NoumMeModal open onClose={onClose} />
        </BrowserRouter>
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testNoumMeModal');
    expect(modal).toBeInTheDocument();

    const modalBtn2 = screen.getByTestId('action_button');
    expect(modalBtn2).toBeInTheDocument();
  });
});
