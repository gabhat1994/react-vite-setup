import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type FC } from 'react';
import {
  render,
  type RenderResult,
  act,
  fireEvent,
  type queries,
  cleanup,
} from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import EmailLoginForm from '.';

const mocks = (): MockedResponse[] => [];

const user = {
  _id: 'someId',
};

vi.mock('@/services/rest/identity', () => ({
  IdentityServices: {
    signInPhone: async () => Promise.resolve({}),
    signInEmail: async () => Promise.resolve({}),
    signInPhoneVerification: async () =>
      Promise.resolve({
        user: {
          userStatus: '',
        },
        token: {
          accessToken: '',
          refreshToken: '',
          expiresIn: '',
        },
      }),
    signInEmailVerification: async () =>
      Promise.resolve({
        user: {
          userStatus: '',
        },
        token: {
          accessToken: '',
          refreshToken: '',
          expiresIn: '',
        },
      }),
  },
}));
vi.mock('@/hooks/recaptcha', () => ({
  useRecaptcha: vi.fn().mockReturnValue({
    recaptchaToken: '',
    refreshRecaptchaToken: vi.fn(),
    returnNewReCaptcha: () => Promise.resolve('newToken'),
  }),
}));

const initialEntries = ['/login'];

const BaseWrapper: FC = (props) => (
  <MockedProvider addTypename={false} mocks={mocks()}>
    <AuthProvider client={client} initialUser={user}>
      <MemoryRouter initialEntries={initialEntries}>
        {props.children}
      </MemoryRouter>
    </AuthProvider>
  </MockedProvider>
);

describe('<Login /> ', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;
  let mockFn = vi.fn();

  afterAll(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <EmailLoginForm submitLoginData={mockFn} />
        </BaseWrapper>,
      );
    });
  });

  afterEach(() => {
    cleanup();
    mockFn = vi.fn();
  });

  test('should login when value ', async () => {
    const { getByTestId, getByRole } = mocked;
    const email = getByTestId('testEmailLoginTextField');
    act(() => {
      fireEvent.change(email, { target: { value: 'radheym@noumena.global' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    expect(mockFn).toHaveBeenCalled();
  });

  test('Should call the handleKeypress event ', async () => {
    const { getByTestId, getByRole } = mocked;
    const email = getByTestId('testEmailLoginTextField');
    act(() => {
      fireEvent.change(email, { target: { value: 'radheym' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    expect(mockFn).not.toHaveBeenCalled();
  });
});
