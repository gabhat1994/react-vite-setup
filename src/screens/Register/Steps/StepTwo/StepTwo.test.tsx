import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@/test-utils';
import StepTwo from '.';
import { SignUpForm } from './SignUpForm';

describe('SignupForm', () => {
  test(`testing basic container styling of step two`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepTwo
          setStep={() => {}}
          userInfo={{
            firstName: 'Test name',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
          setUserInfo={() => {}}
        />
        ,
      </BrowserRouter>,
    );
    const StyledStepThreeEle = getByTestId('stepTwoContainer');
    expect(StyledStepThreeEle).toHaveStyle(`
        font-family: var(--font-family);
        max-width: 400px;`);

    expect(container).toBeTruthy();
  });

  test(`testing basic container styling`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <SignUpForm
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
          setUserInfo={() => {}}
          setStep={() => {}}
        />
      </BrowserRouter>,
    );
    const StyledStepTwoEle = getByTestId('stepTwoFormInput');
    expect(StyledStepTwoEle).toHaveStyle(`
        appearance: none;
        background-color: transparent;
        margin: 0;
        color: currentColor;
        width: 24px;
        height: 24px;
        border-radius: 0.15em;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
    `);

    expect(container).toBeTruthy();
  });

  test('Checks onClick event on back button', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepTwo
          setStep={() => {}}
          setUserInfo={() => {}}
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    const buttonClick = getByTestId('stepTwoBackButton');
    fireEvent.click(buttonClick);
    expect((buttonClick as HTMLButtonElement).type).toBe('button');
  });

  test('Checks onClick event on submit button', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepTwo
          setStep={() => {}}
          setUserInfo={() => {}}
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    const buttonClick = getByTestId('stepTwoSubmitButton');
    fireEvent.click(buttonClick);
    await waitFor(() => {
      expect(
        screen.getByText('And now your first and last name'),
      ).toBeInTheDocument();
    });
    expect((buttonClick as HTMLButtonElement).type).toBe('submit');
  });

  test('test click event on referral checkbox to check', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepTwo
          setStep={() => {}}
          setUserInfo={() => {}}
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
        />
      </BrowserRouter>,
    );
    const StyledWrapperEle = getByTestId('stepTwoFormInput');
    fireEvent.click(StyledWrapperEle);
    await screen.findByTestId('referralCode');

    expect(container).toBeTruthy();
  });

  test('test click event on referral checkbox to uncheck', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepTwo
          setStep={() => {}}
          setUserInfo={() => {}}
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
        />
      </BrowserRouter>,
    );
    const StyledWrapperEle = getByTestId('stepTwoFormInput');
    expect(StyledWrapperEle).toHaveStyle(`
      appearance: none;
      background-color: transparent;
      margin: 0;
      color: currentColor;
      width: 24px;
      height: 24px;
      border-radius: 0.15em;
      transform: translateY(-0.075em);
      display: grid;
      place-content: center;`);

    fireEvent.click(StyledWrapperEle);
    await screen.findByTestId('referralCode');
    fireEvent.click(StyledWrapperEle);
    await screen.findByTestId('stepTwoFormInput');
    expect(container).toBeTruthy();
  });
});
