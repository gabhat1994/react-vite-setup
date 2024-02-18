import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { HomeOwnerConversationProfile } from './HomeOwnerConversationProfile';
import { MessageElementProvider } from '../contexts/MessageElementProvider';
import { useNoumContextReturnValue } from '../../../RightPanel/elements/NoumActions/mock';

vi.mock('@/screens/Chamber/ViewChamber/ChamberProvider');
const useNoumContextMock = vi.mocked(useNoumContext);

describe('<HomeOwnerConversationProfile />', () => {
  const queryClient = new QueryClient();

  test('render test', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    const { container, getByTestId } = render(
      <MemoryRouter>
        <MockedProvider>
          <QueryClientProvider client={queryClient}>
            <MessageElementProvider>
              <HomeOwnerConversationProfile />
            </MessageElementProvider>
          </QueryClientProvider>
        </MockedProvider>
      </MemoryRouter>,
    );

    expect(getByTestId('receiverprofile')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
