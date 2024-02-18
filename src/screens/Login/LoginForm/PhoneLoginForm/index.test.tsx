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
  waitFor,
} from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import PhoneLoginForm from '.';

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

describe('<PhoneLoginForm /> ', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;
  let mockFn = vi.fn();

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <PhoneLoginForm submitLoginData={mockFn} />
        </BaseWrapper>,
      );
    });
  });
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    mockFn = vi.fn();
  });

  test('should login when correct phone number format is provided', async () => {
    const { getByTestId, getByRole } = mocked;
    const phone = getByTestId('testLoginPhoneInput');
    act(() => {
      fireEvent.change(phone, { target: { value: '2133734253' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    expect(mockFn).toHaveBeenCalled();
  });

  test('Testing for PhoneInput Emptiness ', async () => {
    const { getByTestId, getByRole, getByText } = mocked;
    const phone = getByTestId('testLoginPhoneInput');
    act(() => {
      fireEvent.keyPress(phone, { key: 'Enter', code: 97, charCode: 97 });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    await waitFor(() =>
      expect(getByText('This field cannot be empty')).toBeInTheDocument(),
    );
    expect(mockFn).not.toHaveBeenCalled();
  });
});
