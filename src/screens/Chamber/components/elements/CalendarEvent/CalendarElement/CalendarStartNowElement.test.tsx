import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { OnDemandEventModal } from '@/features/events/onDemandEvent';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

describe('<CalendarStartNowElement>', () => {
  const handleClose = vi.fn();
  test('render', () => {
    const { queryByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <OnDemandEventModal
            chamberId="ab121m132n"
            onClose={handleClose}
            isOpen
            isProjectNoum={false}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );

    expect(queryByTestId('calendar-start-now')).toBeTruthy();
  });
});
