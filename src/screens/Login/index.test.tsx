import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  render,
  type RenderResult,
  type Matcher,
  type MatcherOptions,
  act,
  fireEvent,
  type queries,
  waitFor,
  cleanup,
} from '@/test-utils';
import { IdentityServices } from '@/services/rest/identity';
import { AuthProvider } from '@/features/auth/contexts';
import Login from '.';

const mocks = (): MockedResponse[] => [];

const user = {
  _id: 'someId',
};

let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

vi.mock('@/services/rest/identity', () => ({
  IdentityServices: {
    signInPhone: vi.fn().mockResolvedValue({}),
    signInEmail: vi.fn().mockResolvedValue({}),
    signInPhoneVerification: vi.fn().mockResolvedValue({
      user: {
        userStatus: '',
      },
      token: {
        accessToken: '',
        refreshToken: '',
        expiresIn: '',
      },
    }),
    signInEmailVerification: vi.fn().mockResolvedValue({
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
    returnNewReCaptcha: vi.fn().mockResolvedValue('newToken'),
  }),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<{}>('react-router-dom')),
  useLocation: () => ({
    locationState: {
      fromPath: undefined,
    },
  }),
}));

const initialEntries = ['/login'];

const RenderComponent = async () => {
  await act(async () => {
    const client = new ApolloClient({ cache: new InMemoryCache() });
    mocked = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={user}>
          <MemoryRouter initialEntries={initialEntries}>
            <Login />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );
  });
};
describe('<Login /> ', () => {
  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  const otpLogic = async (getByTestId: {
    (id: Matcher, options?: MatcherOptions | undefined): HTMLElement;
    (id: Matcher, options?: MatcherOptions | undefined): HTMLElement;
    (arg0: string): Document | Node | Element | Window;
  }) => {
    const [input1, input2, input3, input4] = [
      getByTestId('OtpInputTestId-0'),
      getByTestId('OtpInputTestId-1'),
      getByTestId('OtpInputTestId-2'),
      getByTestId('OtpInputTestId-3'),
    ];
    input1.focus();
    act(() => {
      fireEvent.change(input1, { target: { value: 1 } });
    });
    expect(input2).toBeInTheDocument();
    input2.focus();
    act(() => {
      fireEvent.change(input2, { target: { value: 1 } });
    });
    input3.focus();
    act(() => {
      fireEvent.change(input3, { target: { value: 1 } });
    });
    input4.focus();
    act(() => {
      fireEvent.change(input4, { target: { value: 1 } });
    });
    await act(async () => {
      fireEvent.click(getByTestId('otp-submit-button'));
    });
  };

  test('Testing for rendering', async () => {
    await RenderComponent();
    const { container, getByTestId } = mocked;
    expect(container).toBeTruthy();
    expect(getByTestId('loginFormContainer')).toBeInTheDocument();
  });

  test('Testing component, button event with default remaining requests', async () => {
    await RenderComponent();
    const { getByTestId, getByRole } = mocked;
    const phoneTab = getByTestId('tab-0');
    act(() => {
      fireEvent.click(phoneTab);
    });
    const phone = getByTestId('testLoginPhoneInput');
    act(() => {
      fireEvent.change(phone, { target: { value: '9704555586' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    await otpLogic(getByTestId);
  });

  test('Testing for SignIn failure via phone', async () => {
    vi.spyOn(IdentityServices, 'signInEmail').mockResolvedValueOnce({
      errorMessage: 'something went wrong',
      errorStatus: 404,
    });
    vi.spyOn(IdentityServices, 'signInPhone').mockResolvedValueOnce({
      errorMessage: 'something went wrong',
      errorStatus: 404,
    });

    await RenderComponent();

    const { getByTestId, getByRole, queryByText } = mocked;
    const phoneTab = getByTestId('tab-0');
    act(() => {
      fireEvent.click(phoneTab);
    });
    const phone = getByTestId('testLoginPhoneInput');
    act(() => {
      fireEvent.change(phone, { target: { value: '9704555586' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    await waitFor(() => {
      expect(
        queryByText('Your phone number does not exist. Please sign up first.'),
      ).toBeInTheDocument();
    });
  });

  test('Testing for Login Failure scenarios, otp button event', async () => {
    vi.spyOn(IdentityServices, 'signInPhoneVerification').mockResolvedValueOnce(
      {
        errorMessage: 'something went wrong',
        errorStatus: 404,
      },
    );
    vi.spyOn(IdentityServices, 'signInEmailVerification').mockResolvedValueOnce(
      {
        errorMessage: 'something went wrong',
        errorStatus: 404,
      },
    );
    await RenderComponent();

    const { getByTestId, getByRole } = mocked;
    const phoneTab = getByTestId('tab-0');
    act(() => {
      fireEvent.click(phoneTab);
    });
    const phone = getByTestId('testLoginPhoneInput');
    act(() => {
      fireEvent.change(phone, { target: { value: '9704555586' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    await otpLogic(getByTestId);
    const backButton = getByTestId('otp-back-button');
    act(() => {
      fireEvent.click(backButton);
    });
    await waitFor(() => {
      const firstStep = getByTestId('loginFormContainer');
      expect(firstStep).toBeInTheDocument();
    });
  });

  test('Testing component, Successful Sign, resend verify button event', async () => {
    vi.spyOn(IdentityServices, 'signInEmail').mockResolvedValueOnce({
      message: 'success',
      remainingRequest: 2,
    });
    vi.spyOn(IdentityServices, 'signInPhone').mockResolvedValueOnce({
      message: 'success',
      remainingRequest: 2,
    });

    await RenderComponent();

    const { getByTestId, getByRole } = mocked;
    const phoneTab = getByTestId('tab-0');
    act(() => {
      fireEvent.click(phoneTab);
    });
    const phone = getByTestId('testLoginPhoneInput');
    act(() => {
      fireEvent.change(phone, { target: { value: '9704555586' } });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    await waitFor(() => {
      const resendOtp = getByTestId('resend-verify-button');
      act(() => {
        fireEvent.click(resendOtp);
      });
    });
    const back = getByTestId('otp-back-button');
    const next = getByTestId('otp-submit-button');
    expect(back).toBeInTheDocument();
    expect(next).toBeInTheDocument();
  });

  test('Testing component, for Email Sign In with valid email address', async () => {
    vi.spyOn(IdentityServices, 'signInEmail').mockResolvedValueOnce({
      message: 'success',
      remainingRequest: 2,
    });
    vi.spyOn(IdentityServices, 'signInPhone').mockResolvedValueOnce({
      message: 'success',
      remainingRequest: 2,
    });

    await RenderComponent();

    const { getByTestId, getByRole, queryByText } = mocked;

    await waitFor(() => getByTestId('testEmailLoginTextField'));
    act(() => {
      fireEvent.change(getByTestId('testEmailLoginTextField'), {
        target: { value: 'radheym@noumena.global' },
      });
    });
    const loginBtnWithText = getByRole('button', {
      name: /Login/i,
    });
    await act(async () => {
      fireEvent.click(loginBtnWithText);
    });
    expect(
      queryByText('Please use a valid email address (email@address.com)'),
    ).toBeFalsy();
  });
});
