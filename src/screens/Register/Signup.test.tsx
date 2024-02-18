import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import Signup from '.';

describe('SignupForm', () => {
  test(`testing basic container styling`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    const StyledStepTwoEle = getByTestId('SIGN_UP');
    expect(StyledStepTwoEle).toHaveStyle(`
        font-family: var(--font-family);
        `);

    expect(container).toBeTruthy();
  });
});
