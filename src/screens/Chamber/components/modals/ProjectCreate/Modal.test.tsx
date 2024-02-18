import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import {
  render,
  fireEvent,
  type RenderResult,
  cleanup,
  waitFor,
  act,
} from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import AppRoutes from '@/routes';
import { GetProjectChamberCategoriesDocument } from '@/apollo/graphql';
import { client } from '@/apollo/client';
import { getProjectChamberCategories } from './mockdata';
import { ProjectCreateModal } from './ProjectCreateModal';

let getProjectCategoriesQueryCalled = false;

const projectCategoriesMock = {
  request: {
    query: GetProjectChamberCategoriesDocument,
    variables: {},
  },
  result: () => {
    getProjectCategoriesQueryCalled = true;
    return { data: { getProjectChamberCategories } };
  },
};

const mocks = (): MockedResponse[] => [projectCategoriesMock];
const user = {
  _id: 'someId',
  access: true,
};

describe('<ProjectCreate />', () => {
  const initialEntries = ['/dashboard'];
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeAll(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <AppRoutes />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
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
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={user}>
          <ProjectCreateModal
            isOpen
            handleClose={toggle}
            handleSuccess={handleSuccess}
          />
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getProjectCategoriesQueryCalled).toBeTruthy();
    });

    const projectCreateModal = getByTestId('testProjectCreate');

    expect(projectCreateModal).toBeInTheDocument();
    expect(container).toBeTruthy();

    fireEvent.keyDown(projectCreateModal, { code: 'Escape' });
    expect(toggle).toHaveBeenCalled();
  }, 15000);
});
