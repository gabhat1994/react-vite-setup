import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { PostElement } from './PostElement';

const spaceId = '';
const element = {
  __typename: undefined,
  _id: undefined,
  bodyContent: undefined,
  bodyContentJson: undefined,
  bodyContentType: undefined,
  draft: undefined,
  elementType: undefined,
  headerContent: undefined,
  percentCompleted: undefined,
  position: undefined,
  status: undefined,
  tempStatus: undefined,
  unSaved: undefined,
  viewOnly: undefined,
};

describe('<PostElement />', () => {
  test('test PostElement render', () => {
    const { container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <PostElement
          spaceId={spaceId}
          element={element}
          currentTitle="POST"
          hideContent
          isBorder={false}
          isEditing={true}
        />
      </ApolloProvider>,
    );
    expect(container).toBeTruthy();
  });
});
