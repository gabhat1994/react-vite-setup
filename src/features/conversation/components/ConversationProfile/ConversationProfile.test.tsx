import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumContextReturnValue } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/mock';
import { ConversationProfile } from './ConversationProfile';
import { useConversationDetails } from '../../hooks/globalMessages/useConversationDetails';

vi.mock('@/screens/Chamber/ViewChamber/ChamberProvider');
const useNoumContextMock = vi.mocked(useNoumContext);

vi.mock('../../hooks/useConversationDetails');
const useConversationDetailsMock = vi.mocked(useConversationDetails);
const useConversationDeatilsReturnValue = {
  title: '',
  users: [],
  participants: [],
  isGroupConversation: false,
  isConversationBlocked: false,
  isBlocked: false,
  getParticipantById: vi.fn(),
  createdBy: undefined,
  loading: false,
};

describe('<ConversationProfile />', () => {
  const queryClient = new QueryClient();

  test('render test', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    useConversationDetailsMock.mockReturnValue({
      ...useConversationDeatilsReturnValue,
    });

    const { container } = render(
      <MemoryRouter>
        <MockedProvider>
          <QueryClientProvider client={queryClient}>
            <ConversationProfile />
          </QueryClientProvider>
        </MockedProvider>
      </MemoryRouter>,
    );

    expect(container).toBeTruthy();
  });
});
