import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@/test-utils';
import StepFour from '.';

describe('Signup', () => {
  test(`testing basic container styling`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepFour
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
        />
      </BrowserRouter>,
    );
    const StyledStepFourEle = getByTestId('stepFourContainer');
    expect(StyledStepFourEle).toHaveStyle(`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 12px;
        width: 360px;`);

    expect(container).toBeTruthy();
  });
  test('Checks onClick event and respective styles', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepFour
          userInfo={{
            firstName: '',
            lastName: '',
            profile: { socialLinks: [{}] },
          }}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    const buttonClick = getByTestId('stepFourButton');
    fireEvent.click(buttonClick, { route: '/' });
    expect(getByTestId('stepFourButton')).toBeInTheDocument();
  });
});
