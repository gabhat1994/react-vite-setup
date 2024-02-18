import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import { type Conversation, CancellablePromise } from '@twilio/conversations';
import { client } from '@/apollo/client';
import { MockFile, render } from '@/test-utils';
import { PendingMessageItem } from './PendingMessageItem';
import { type PendingMessage } from '../../types';

const mockPendingMessage: PendingMessage = {
  attributes: {
    id: '1',
    dateCreatedTimestamp: new Date(2022, 6, 11).getTime(),
  },
  mediaContent: [],
  conversation: {} as Conversation,
  author: '12345678',
  dateCreated: new Date(2022, 6, 11),
  index: 0,
  send: () => new CancellablePromise(async () => 1),
};

global.URL.createObjectURL = vi.fn();

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ApolloProvider>
);

describe('PendingMessageItem', () => {
  test.skip('Should render image', () => {
    const imageFormData = new FormData();
    const imageFile = MockFile('file.png', 1024, 'image/png');

    imageFormData.append('file', imageFile);

    const { getByTestId } = render(
      <Wrapper>
        <PendingMessageItem
          message={
            {
              ...mockPendingMessage,
              mediaContent: [['media', imageFormData]],
            } as PendingMessage
          }
        />
      </Wrapper>,
    );
    expect(getByTestId('image-message-bubble')).toBeInTheDocument();
  });

  test.skip('Should render video', () => {
    const videoFormData = new FormData();
    const videoFile = MockFile('file.mp4', 1024, 'video/mp4');
    videoFormData.append('file', videoFile);

    const { getByTestId } = render(
      <Wrapper>
        <PendingMessageItem
          message={
            {
              ...mockPendingMessage,
              mediaContent: [['media', videoFormData]],
            } as PendingMessage
          }
        />
      </Wrapper>,
    );
    expect(getByTestId('video-message-bubble')).toBeInTheDocument();
  });
});
