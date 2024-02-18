import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render, screen } from '@/test-utils';
import { ChamberRestoreModal } from './ChamberRestoreModal';

const cancelCallback = vi.fn();
const sucessCallback = vi.fn();
const spaceId = 'testSpaceId';
const version = '2022-05-20T15:13:57.573Z';

describe('<ChamberRestoreModal />', () => {
  test('renders', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberRestoreModal
          spaceId={spaceId}
          isOpen
          version={version}
          cancelCallback={cancelCallback}
          sucessCallback={sucessCallback}
        />
        ,
      </ApolloProvider>,
    );

    const descripton = getByTestId('description1');
    expect(descripton).toBeInTheDocument();
    const description2 = getByTestId('description2');
    expect(description2).toBeInTheDocument();
    expect(getByTestId('chamberActionModal')).toBeInTheDocument();

    const primaryBtn = getByTestId('primaryBtn');
    const primaryBtnLabel = getByTestId('primaryBtnLabel');
    const secondaryBtn = getByTestId('secondaryBtn');
    const secondaryBtnLabel = getByTestId('secondaryBtnLabel');
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toContainElement(primaryBtnLabel);
    expect(secondaryBtn).toContainElement(secondaryBtnLabel);
    expect(primaryBtnLabel.textContent).toBe('Yes, Restore');
    expect(secondaryBtnLabel.textContent).toBe('Cancel');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberRestoreModal
          spaceId={spaceId}
          isOpen
          version={version}
          cancelCallback={cancelCallback}
          sucessCallback={sucessCallback}
        />
      </ApolloProvider>,
    );

    fireEvent.keyDown(screen.getByTestId('secondaryBtn'), {
      code: 'Escape',
    });
    expect(cancelCallback).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(cancelCallback).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberRestoreModal
          spaceId={spaceId}
          isOpen
          version={version}
          cancelCallback={cancelCallback}
          sucessCallback={sucessCallback}
        />
      </ApolloProvider>,
    );

    const confirmBtn = screen.getByTestId('primaryBtn');
    expect(confirmBtn).toBeInTheDocument();

    fireEvent.click(confirmBtn);
    const waitingActionModal = screen.getByTestId('loadingSpinnerModal');
    expect(waitingActionModal).toBeInTheDocument();
  });
});
