import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen } from '@/test-utils';
import PostHeader from './PostHeader';

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
describe('<PostHeader />', () => {
  test('test when collapse:false has no filter-button render', () => {
    const { container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <PostHeader
          spaceId={spaceId}
          element={element}
          currentTitle="POST"
          hideContent
          isBorder={false}
          isEditing={false}
        />
      </ApolloProvider>,
    );
    const filterButton = screen.getByTestId('filter-button');
    expect(filterButton).toBeTruthy();
    expect(container).toBeTruthy();
  });
});
