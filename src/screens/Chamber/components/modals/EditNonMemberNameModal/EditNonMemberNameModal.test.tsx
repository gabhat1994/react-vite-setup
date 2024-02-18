import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { EditNonMemberNameModal } from './EditNonMemberNameModal';

const confirmCallback = vi.fn();
const extraBtnCallback = vi.fn();

describe('<EditNonMemberNameModal />', () => {
  test('renders when all props are passed', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <EditNonMemberNameModal
            isOpen
            confirmCallback={confirmCallback}
            extraBtnCallback={extraBtnCallback}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    const primaryBtn = getByTestId('primaryBtn');
    const primaryBtnLabel = getByTestId('primaryBtnLabel');
    const extraBtn = getByTestId('extraBtn');
    const extraBtnLabel = getByTestId('extraBtnLabel');
    expect(getByTestId('editNonMemberNameModal')).toBeInTheDocument();
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toContainElement(primaryBtnLabel);
    expect(primaryBtnLabel.textContent).toBe('Continue');
    expect(extraBtn).toContainElement(extraBtnLabel);
    expect(extraBtnLabel.textContent).toBe('Create An Account');
  });
});
