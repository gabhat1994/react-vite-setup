import { MemoryRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, fireEvent, type RenderResult, cleanup } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import AppRoutes from '@/routes';
import { client } from '@/apollo/client';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { HomeNoumProjectWorkExperience } from './Modal';

const user = {
  _id: 'someId',
  access: true,
};

describe('<HomeNoumProjectWorkExperience />', () => {
  const initialEntries = ['/noum/624692222bb3ac788479ae7e'];
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(() => {
    mocked = render(
      <ApolloProvider client={client}>
        <MockedProvider addTypename={false}>
          <AuthProvider initialUser={user} client={client}>
            <QueryClientProvider client={new QueryClient()}>
              <MemoryRouter initialEntries={initialEntries}>
                <AppRoutes />
              </MemoryRouter>
            </QueryClientProvider>
          </AuthProvider>
        </MockedProvider>
      </ApolloProvider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const { container } = mocked;
    expect(container).toBeTruthy();
  });

  test('renders', async () => {
    const toggle = vi.fn();
    const handleSuccess = vi.fn();

    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <HomeNoumProjectWorkExperience
          isOpen
          handleClose={toggle}
          handleSuccess={handleSuccess}
          elementType={ElementTypeEnum.ProjectWorkExperience}
          position={1}
        />
      </ApolloProvider>,
    );

    const HomeNoumProjectWorkExperienceModal = getByTestId(
      'testHomeNoumProjectWorkExperience',
    );

    expect(HomeNoumProjectWorkExperienceModal).toBeInTheDocument();
    expect(container).toBeTruthy();

    fireEvent.keyDown(HomeNoumProjectWorkExperienceModal, { code: 'Escape' });
    expect(toggle).toHaveBeenCalled();
  });
});
