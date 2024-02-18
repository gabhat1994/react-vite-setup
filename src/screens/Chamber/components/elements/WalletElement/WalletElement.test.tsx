import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import {
  BodyContentEnum,
  type ElementOutput,
  ElementStatusEnum,
} from '@/apollo/generated/types';
import { WalletElement } from './WalletElement';

describe('WalletElement', () => {
  const mockElement: ElementOutput = {
    _id: '628fbca2e748a996ac4164b9',
    bodyContent: '',
    bodyContentJson: null,
    bodyContentType: BodyContentEnum.Url,
    draft: {
      bodyContent: null,
      bodyContentJson: null,
      headerContent: null,
      isDeleted: true,
      position: null,
      __typename: 'ElementInnerOutput',
    },
    elementType: 'WALLET',
    headerContent: null,
    position: 3,
    status: 'PUBLISHED',
    tempStatus: ElementStatusEnum.Draft,
    unSaved: null,
    viewOnly: null,
    __typename: 'ElementOutput',
  };
  const mockSpaceId = '123';
  afterEach(() => {
    cleanup();
  });
  it('WalletElement with isOwner true', async () => {
    const { container } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <WalletElement
            spaceId={mockSpaceId}
            element={mockElement}
            isOwner={true}
          />
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
  it('WalletElement with isOwner false', async () => {
    const { container } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <WalletElement
            spaceId={mockSpaceId}
            element={mockElement}
            isOwner={false}
          />
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
