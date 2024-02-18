import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen } from '@/test-utils';
import { TellUsYourStoryModal } from './Modal';

describe('<TellUsYourStoryModal />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <TellUsYourStoryModal open onClose={onClose} calendlyData={undefined} />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('testTellUsYourStoryModal');
    expect(modal).toBeInTheDocument();

    const modalBtn2 = screen.getByTestId('action_button');
    expect(modalBtn2).toBeInTheDocument();
  });
});
