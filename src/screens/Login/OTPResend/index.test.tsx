import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router';
import { type FC } from 'react';
import {
  act,
  fireEvent,
  type queries,
  render,
  type RenderResult,
  waitFor,
  waitForElementToBeRemoved,
} from '@/test-utils';
import { LaunchDarklyProvider } from '@/providers/LaunchDarklyProvider';
import { IdentityServices } from '@/services/rest/identity';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { type LoginData } from '../types';
import OTPResend from '.';

const mockOnLoginSuccess = vi.fn();
const mockBeforeSubmit = vi.fn();
const mockOnLoginFailed = vi.fn();

const mocks = (): MockedResponse[] => [];

const user = {
  _id: 'someId',
};

const loginData: LoginData = {
  type: 'email',
  value: 'radheyma@noumena.global',
};
const phoneLoginData: LoginData = {
  type: 'phone',
  value: 'radheyma@noumena.global',
};
const initialEntries = ['/login'];

const BaseWrapper: FC = (props) => (
  <MockedProvider addTypename={false} mocks={mocks()}>
    <AuthProvider client={client} initialUser={user}>
      <MemoryRouter initialEntries={initialEntries}>
        <LaunchDarklyProvider>{props.children}</LaunchDarklyProvider>
      </MemoryRouter>
    </AuthProvider>
  </MockedProvider>
);

vi.mock('@/services/rest/identity', () => ({
  IdentityServices: {
    signInPhone: vi.fn().mockResolvedValue({}),
    signInEmail: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('@/hooks/recaptcha', () => ({
  useRecaptcha: vi.fn().mockReturnValue({
    recaptchaToken: '',
    refreshRecaptchaToken: vi.fn(),
    returnNewReCaptcha: vi.fn().mockResolvedValue('newToken'),
  }),
}));

vi.mock('@/hooks/client', () => ({
  useClient: vi.fn().mockReturnValue({
    client: null,
    initClient: vi.fn(),
    initTimer: vi.fn(),
    setStartTimer: vi.fn(),
  }),
}));
vi.mock('@/hooks/socialHall/useSocialHallCall', () => ({
  useSocialHallCall: vi.fn().mockReturnValue({
    closeAgoraConnection: vi.fn(),
  }),
}));

vi.mock('@/hooks/fcmDeviceToken', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { useFCMDeviceToken } = await vi.importActual<any>(
    '@/hooks/fcmDeviceToken.stub',
  );
  return {
    useFCMDeviceToken,
  };
});

vi.mock('@/hooks/launchDarkly', () => {
  const mock = vi.fn().mockReturnValue({
    identifyUser: vi.fn(),
    flags: {},
  });
  return {
    default: mock,
    useLaunchDarkly: mock,
  };
});

const funcProps = {
  beforeSubmit: mockBeforeSubmit,
  onLoginFailed: mockOnLoginFailed,
  onLoginSuccess: mockOnLoginSuccess,
};

describe('<OTPResend /> ', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  test('Testing component, button event with default remaining requests', async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            loginData={loginData}
            timeLeftForNextResend={0}
            remainingRequests={3}
            isResendLoading={false}
            {...funcProps}
          />
        </BaseWrapper>,
      );
    });

    const { getByTestId } = mocked;
    const button = getByTestId('resend-verify-button');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(mockBeforeSubmit).toHaveBeenCalled();
    });
  });

  test('Testing for exact message text when zero remaining requests', async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            loginData={loginData}
            timeLeftForNextResend={0}
            remainingRequests={0}
            isResendLoading={false}
            {...funcProps}
          />
        </BaseWrapper>,
      );
    });
    const { getByText } = mocked;

    await waitFor(() => {
      expect(
        getByText('Please wait 24h before requesting a new code.'),
      ).toBeInTheDocument();
    });
  });

  test('Testing for no button with less remaining requests', async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            loginData={loginData}
            timeLeftForNextResend={1}
            remainingRequests={2}
            isResendLoading={false}
            {...funcProps}
          />
        </BaseWrapper>,
      );
    });
    const { getByTestId, queryByTestId, findByTestId, getByText } = mocked;
    const codeSentSpan = getByTestId('code-sent-span');
    const waitSpan = getByTestId('resend-wait-span');
    expect(codeSentSpan).toBeInTheDocument();
    expect(waitSpan).toBeInTheDocument();
    expect(queryByTestId('resend-verify-button')).not.toBeInTheDocument();
    await waitForElementToBeRemoved(await findByTestId('code-sent-span'), {
      timeout: 5000,
    });
    await waitFor(() => {
      const cautionMessage = getByTestId('resend-caution-message');
      expect(cautionMessage).toBeInTheDocument();
      expect(
        getByText(/We limit the number attempts per day./i, { exact: false }),
      ).toBeInTheDocument();
    });
  });

  test('Testing component,button event without providing the default props', async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            timeLeftForNextResend={undefined}
            remainingRequests={2}
            {...funcProps}
          />
        </BaseWrapper>,
      );
    });
    const { getByTestId } = mocked;
    const button = getByTestId('resend-verify-button');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(mockBeforeSubmit).toHaveBeenCalled();
    });
  });

  test('Testing component behaviour, method calls when Identity service returns error, should not call onLoginSuccess', async () => {
    vi.spyOn(IdentityServices, 'signInEmail').mockResolvedValue({
      errorMessage: 'something went wrong',
    });
    const onSuccess = vi.fn();
    const onBeforeSubmit = vi.fn();
    const onFailed = vi.fn();
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            loginData={loginData}
            timeLeftForNextResend={undefined}
            remainingRequests={2}
            beforeSubmit={onBeforeSubmit}
            onLoginSuccess={onSuccess}
            onLoginFailed={onFailed}
          />
        </BaseWrapper>,
      );
    });
    const { getByTestId } = mocked;
    const button = getByTestId('resend-verify-button');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    await waitFor(() => {
      expect(onBeforeSubmit).toHaveBeenCalled();
      expect(onFailed).toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });

  test('Testing component,button event with phone login type', async () => {
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            loginData={phoneLoginData}
            timeLeftForNextResend={undefined}
            remainingRequests={2}
            {...funcProps}
          />
        </BaseWrapper>,
      );
    });
    const { getByTestId } = mocked;
    const button = getByTestId('resend-verify-button');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(mockBeforeSubmit).toHaveBeenCalled();
    });
  });

  test('Should not call any action functions/methods if recaptchaToken is undefined and recaptcha flag has value in launchDarkly', async () => {
    const onSuccess = vi.fn();
    const onBeforeSubmit = vi.fn();
    const onFailed = vi.fn();
    await act(async () => {
      mocked = render(
        <BaseWrapper>
          <OTPResend
            loginData={phoneLoginData}
            timeLeftForNextResend={undefined}
            remainingRequests={2}
            beforeSubmit={onBeforeSubmit}
            onLoginSuccess={onSuccess}
            onLoginFailed={onFailed}
          />
        </BaseWrapper>,
      );
    });

    const { getByTestId } = mocked;
    const button = getByTestId('resend-verify-button');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(onBeforeSubmit).not.toHaveBeenCalled();
      expect(onFailed).not.toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });
});
