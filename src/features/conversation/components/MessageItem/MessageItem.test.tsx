import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { type FC, type ReactNode } from 'react';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { mockedConversation, mockedMedia, mockedMessage } from '../../mocks';
import { MessageItem } from './MessageItem';
import { useConversation } from '../../hooks/globalMessages/useConversation';
import { useConversationParticipants } from '../../hooks/globalMessages/useConversationParticipants';

vi.mock('../../hooks/useConversation');
const useConversationMock = vi.mocked(useConversation);

vi.mock('../../hooks/useConversationParticipants');
const useConversationPartipantsMock = vi.mocked(useConversationParticipants);

const queryClient = new QueryClient();

const Wrapper: FC = (props: { children?: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MockedProvider>{props.children}</MockedProvider>
  </QueryClientProvider>
);

describe('<MessageItem />', () => {
  useConversationMock.mockReturnValue({
    conversation: mockedConversation(),
    participants: [],
  });

  useConversationPartipantsMock.mockReturnValue({
    participants: [],
    status: 'success',
  });

  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('return message item', () => {
    const message = mockedMessage();

    const { container } = render(
      <Wrapper>
        <MessageItem message={message} />
      </Wrapper>,
    );

    expect(container).toBeTruthy();
  });

  test('return text message bubble', () => {
    const message = mockedMessage({ body: 'text message' });

    const { container, getByTestId } = render(
      <Wrapper>
        <MessageItem message={message} />
      </Wrapper>,
    );

    expect(getByTestId('text-message-bubble')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('return video message bubble', () => {
    const media = mockedMedia({ contentType: 'video/mp4' });
    const message = mockedMessage({ attachedMedia: [media] });

    const { container, getByTestId } = render(
      <Wrapper>
        <MessageItem message={message} />
      </Wrapper>,
    );

    expect(getByTestId('video-message-bubble')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('return image message bubble', () => {
    const media = mockedMedia({ contentType: 'image/png' });
    const message = mockedMessage({ attachedMedia: [media] });

    const { container, getByTestId } = render(
      <Wrapper>
        <MessageItem message={message} />
      </Wrapper>,
    );

    expect(getByTestId('image-message-bubble')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
