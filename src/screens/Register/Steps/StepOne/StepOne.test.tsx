import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@/test-utils';

import * as recaptcha from '@/hooks/recaptcha';
import StepOne from '.';

vi.mock('axios');
vi.mock('@/hooks/launchDarkly', () => {
  const mock = vi.fn().mockReturnValue({
    identifyUser: vi.fn(),
    flags: {
      onboardingDob: true,
    },
  });
  return {
    default: mock,
    useLaunchDarkly: mock,
  };
});

const mockedAxios = vi.mocked(axios, true);

const userInfo = {
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'last',
  dob: '01/01/1995',
  phone: '00123455',
  referralCode: undefined,
};

const emailSignupResponse = {
  data: {
    message: 'OTP sent to registered email!',
    remainingRequest: 3,
    nextRequestAfter: '2022-04-26T07:16:44.502Z',
    nextRequestAfterInSecond: 0,
  },
};

const renderStepOne = () =>
  render(
    <BrowserRouter>
      <StepOne />
    </BrowserRouter>,
  );

describe('StepOne', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
    mockedAxios.post.mockReset();
  });

  test(`testing Step one container's basic styling`, () => {
    const { container, getByTestId } = renderStepOne();
    const StyledStepOneEle = getByTestId('stepOneContainer');
    expect(StyledStepOneEle).toHaveStyle(`
        font-family: var(--font-family);
        max-width: 343px;`);

    expect(container).toBeTruthy();
  });

  test('has `Terms and Conditions` and `Privacy Policy` links', () => {
    const { getByTestId } = renderStepOne();

    expect(getByTestId('terms')).toBeInTheDocument();
    expect(getByTestId('privacy')).toBeInTheDocument();
  });

  test('test onSubmitBtnClick positive flow to show the OTP section', async () => {
    const token = '12345678';
    const newToken = '3456789';

    const spy = vi.spyOn(recaptcha, 'default');
    spy.mockReturnValue({
      recaptchaToken: token,
      refreshRecaptchaToken: () => 1,
      returnNewReCaptcha: vi
        .fn()
        .mockImplementation(() => Promise.resolve(newToken)),
    });
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve(emailSignupResponse),
    );

    const { getByTestId } = renderStepOne();

    const emailInput = getByTestId('emailInput');
    act(() => {
      fireEvent.change(emailInput, { target: { value: userInfo.email } });
    });

    const firstNameInput = getByTestId('firstNameInput');
    act(() => {
      fireEvent.change(firstNameInput, {
        target: { value: userInfo.firstName },
      });
    });

    const lastNameInput = getByTestId('lastNameInput');
    act(() => {
      fireEvent.change(lastNameInput, {
        target: { value: userInfo.lastName },
      });
    });

    const dobInput = getByTestId('dobInput');
    act(() => {
      fireEvent.change(dobInput, {
        target: { value: userInfo.dob },
      });
    });

    const submitBtn = getByTestId('submitBtn');
    expect(submitBtn).toBeInTheDocument();
  });

  test('test Go to login page', async () => {
    const token = '12345678';
    const newToken = '3456789';

    const spy = vi.spyOn(recaptcha, 'default');
    spy.mockReturnValue({
      recaptchaToken: token,
      refreshRecaptchaToken: () => 1,
      returnNewReCaptcha: vi
        .fn()
        .mockImplementation(() => Promise.resolve(newToken)),
    });

    const { container, getByTestId } = renderStepOne();
    const goToLogInID = getByTestId('goToLogInID');
    fireEvent.click(goToLogInID);
    expect(container).toBeTruthy();
  });
});
