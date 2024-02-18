import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, render } from '@/test-utils';
import { demoNotifications, singleNotification } from '../data';
import { KnockNotification } from './KnockNotification';

describe('<KnockNotification />', () => {
  vi.useFakeTimers();
  const props = {
    isSingle: true,
  };
  test(`check incoming notification is displayed or not`, () => {
    act(() => {
      vi.runAllTimers();
    });
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <KnockNotification notification={singleNotification[0]} {...props} />,
      </ApolloProvider>,
    );
    const SingleKnockNotification = getByTestId(
      'outgoing_notification_wrapper',
    );
    expect(SingleKnockNotification).toHaveStyle(`
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: 16px;
      box-sizing: border-box;
      padding: 12px;
      gap: 16px;
    `);
    expect(getByTestId('outgoing_notification_wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('check incoming message is displayed correctly or not', () => {
    const { getByText, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <KnockNotification notification={demoNotifications[1]} {...props} />,
      </ApolloProvider>,
    );

    expect(
      getByText('Sorry, busy now but I will come and find you later.'),
    ).toBeTruthy();

    expect(getByTestId('accept_button')).toBeInTheDocument();
    expect(getByTestId('close_button')).toBeInTheDocument();
  });

  test('check declined message is displayed correctly or not', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <KnockNotification notification={demoNotifications[2]} {...props} />,
      </ApolloProvider>,
    );

    expect(
      getByTestId('outgoing_notification_declined_wrapper'),
    ).toBeInTheDocument();
  });
});
