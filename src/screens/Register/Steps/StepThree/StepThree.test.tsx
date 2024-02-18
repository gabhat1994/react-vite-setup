import { fireEvent, render, screen } from '@/test-utils';
import StepThree from '.';
import SignUpForm from './SignUpForm';

describe('SignupForm', () => {
  const step = vi.fn();
  test('Checks onClick event on back button', async () => {
    const { container, getByTestId } = render(
      <StepThree
        setStep={step}
        userInfo={{
          firstName: 'first name',
          lastName: 'last name',
          profile: { socialLinks: [{ link: 'abc.com/xyz', name: 'abc' }] },
        }}
      />,
    );
    expect(container).toBeTruthy();
    const buttonClick = getByTestId('stepThreeBackButton');
    fireEvent.click(buttonClick);
    expect((buttonClick as HTMLButtonElement).type).toBe('button');
  });

  test('Checks onClick event on submit button', async () => {
    const { container, getByTestId } = render(
      <StepThree
        setStep={step}
        userInfo={{
          firstName: 'first name',
          lastName: 'last name',
          profile: { socialLinks: [{ link: 'abc.com/xyz', name: 'abc' }] },
        }}
      />,
    );
    expect(container).toBeTruthy();
    const buttonClick = getByTestId('stepThreeSubmitButton');
    fireEvent.click(buttonClick);
    expect((buttonClick as HTMLButtonElement).type).toBe('submit');
  });

  test('Checks onClick event on back button', async () => {
    const { container, getByTestId } = render(
      <StepThree
        setStep={step}
        userInfo={{
          firstName: 'first name',
          lastName: 'last name',
          profile: { socialLinks: [{ link: 'abc.com/xyz', name: 'abc' }] },
        }}
      />,
    );
    const urlfield = getByTestId('urlfield0');
    fireEvent.change(urlfield, { target: { value: 'www.google.com/abc' } });
    fireEvent.blur(urlfield);
    await screen.findByText('Add another link');
    expect(container).toBeTruthy();
  });

  test(`testing step three container's basic styling`, () => {
    const { container, getByTestId } = render(
      <StepThree
        setStep={step}
        userInfo={{
          firstName: 'Test name',
          lastName: '',
          profile: { socialLinks: [{}] },
        }}
      />,
    );
    const StyledStepThreeEle = getByTestId('stepThreeContainer');
    expect(StyledStepThreeEle).toHaveStyle(`
        font-family: var(--font-family);
        max-width: 400px;`);

    expect(container).toBeTruthy();
  });

  test(`testing step three form container's basic styling`, async () => {
    const { container, getByTestId } = render(
      <SignUpForm
        userInfo={{
          firstName: 'Test name',
          lastName: '',
          profile: { socialLinks: [{}] },
        }}
        setStep={step}
      />,
    );
    const StyledStepThreeEle = getByTestId('stepThreeFormContainer');
    expect(StyledStepThreeEle).toHaveStyle(`width:100%`);

    expect(container).toBeTruthy();
  });
});
