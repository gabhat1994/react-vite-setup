import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render, screen } from '@/test-utils';
import { ElementWrapper } from './ElementWrapper';

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

describe('<ElementWrapper />', () => {
  test('test expected styling of wrapper container', () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('wrapper');
    expect(StyledWrapperEle).toHaveStyle(`
      position: relative;
      transition: all 0.1s ease-in-out;
      display: flex;
      flex-direction: column;
      border: none;
      cursor: default;
      padding: 16px;
      vertical-align: middle;
    `);

    expect(container).toBeTruthy();
  });

  test('test expected styling of wrapperHead in view mode', () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('WrapperView');
    expect(StyledWrapperEle).toHaveStyle(`
        display: inline-flex;
        gap: 12px;
        justify-content: flex-start;
        width: 100%;`);

    expect(container).toBeTruthy();
  });

  test('test expected styling of wrapperHead in edit mode', () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element} isEditing={true}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('wrapperEditing');
    expect(StyledWrapperEle).toHaveStyle(`
        display: inline-flex;
        gap: 12px;
        justify-content: space-between;
        width: 100%;`);

    expect(container).toBeTruthy();
  });

  test('test expected styling of head content', () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element} isEditing={true}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('headContent');
    expect(StyledWrapperEle).toHaveStyle(`
        display: inline-flex;
        align-items: center;`);

    expect(container).toBeTruthy();
  });

  test('test collapse (View mode)', async () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('childContainer');
    const StyledCollapseBtn = getByTestId('collapse-button');
    expect(StyledWrapperEle).toHaveStyle(`width:100%;`);
    fireEvent.click(StyledCollapseBtn);
    await screen.findByTestId('childContainer');
    expect(StyledWrapperEle).toHaveStyle(`
    margin-top: 16px; width: 100%;`);

    expect(container).toBeTruthy();
  });

  test('test click event on title (Edit mode)', async () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element} isEditing={true}>
          <div>content</div>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('wrapperTitle');
    fireEvent.click(StyledWrapperEle);
    const textfield = await screen.findByTestId('TextField');
    fireEvent.change(textfield, { target: { value: '345' } });
    expect((textfield as HTMLInputElement).value).toBe('345');

    expect(container).toBeTruthy();
  });

  test('test click event on onConfirm button (Edit mode)', async () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element} isEditing={true}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('wrapperTitle');
    fireEvent.click(StyledWrapperEle);
    const buttonWrapperEle = await screen.findByTestId('onConfirm');
    fireEvent.click(buttonWrapperEle);
    await screen.findByTestId('wrapperTitle');

    expect(container).toBeTruthy();
  });

  test('test click event on onCancel button (Edit mode)', async () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element} isEditing={true}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    const StyledWrapperEle = getByTestId('wrapperTitle');
    fireEvent.click(StyledWrapperEle);
    const buttonWrapperEle = await screen.findByTestId('onClose');
    fireEvent.click(buttonWrapperEle);
    await screen.findByTestId('wrapperTitle');

    expect(container).toBeTruthy();
  });

  test('inner text will be "<>content</>"', () => {
    const { getByText } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ElementWrapper spaceId={spaceId} element={element} isEditing={true}>
          <>content</>
        </ElementWrapper>
      </ApolloProvider>,
    );
    expect(getByText('content')).toBeInTheDocument();
  });
});
