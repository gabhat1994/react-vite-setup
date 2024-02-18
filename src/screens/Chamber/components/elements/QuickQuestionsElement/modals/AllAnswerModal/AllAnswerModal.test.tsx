import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import AllAnswerModal from './AllAnswerModal';

describe('<AddQuestion />', () => {
  afterEach(() => {
    cleanup();
  });

  test('check component is trusthy', () => {
    const { container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AllAnswerModal
          question={{
            _id: '1',
            spaceId: { _id: '123' },
            body: 'test',
            answers: [
              {
                body: 'Yes, I use the 4K HDR mode when I want to record the highest quality footage. It covers all my requirements. It allows me to do my job quickly.',
                createdAt: '2022-07-04T06:14:32.060Z',
                user: {
                  _id: '',
                  firstName: 'Test',
                  lastName: 'Name',
                  profile: {
                    profilePictureThumbnail: '',
                  },
                },
              },
            ],
          }}
          onClose={() => {}}
          isOpen={true}
        />
      </ApolloProvider>,
    );

    expect(container).toBeTruthy();
  });
});
