import { client } from '@/apollo/client';
import { NoumLinkStatus, ProjectChamberType } from '@/apollo/generated/types';
import { GetNoumLinksDocument, type NoumLinkFragment } from '@/apollo/graphql';
import { AuthProvider } from '@/features/auth/contexts';
import { cleanup, render, type RenderResult } from '@/test-utils';
import { cleanList } from '@/utils/list';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NoumContent from './NoumContent';

const getNoumLinks: NoumLinkFragment[] = [
  {
    _id: '1',
    status: NoumLinkStatus.Linked,
    projectType: ProjectChamberType.Public,
    linkedAt: new Date(),
    connectionsCount: 120,
    followersCount: 26,
    linkedNoumsCount: 12,
    linkedNoums: [
      {
        _id: '1',
        profileImage: '',
        name: '',
        category: {
          _id: '1',
          name: 'project',
        },
      },
      {
        _id: '2',
        profileImage: '',
        name: '',
        category: {
          _id: '2',
          name: 'social',
        },
      },
    ],
  },
];

const getNoumLinksMock = {
  request: {
    query: GetNoumLinksDocument,
  },
  result: () => ({ data: { getNoumLinks } }),
};

const mocks = (): MockedResponse[] => [getNoumLinksMock];

describe('<Linked NoumContent />', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(() => {
    mocked = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={{ _id: 'someId' }}>
          <BrowserRouter>
            <NoumContent
              noumLinkId=""
              noumsCount={0}
              connectionsCount={0}
              followersCount={0}
              linkedNoums={cleanList(getNoumLinks[0].linkedNoums)}
              linkedAt={new Date().toString()}
            />
          </BrowserRouter>
        </AuthProvider>
      </MockedProvider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const { container } = mocked;
    expect(container).toBeTruthy();
  });
});
