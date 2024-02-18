import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@/test-utils';
import StepPending from '.';

describe('SignupStepPending', () => {
  test(`testing basic container styling`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepPending />
      </BrowserRouter>,
    );
    const StyledStepPendingEle = getByTestId('stepPendingContainer');
    expect(StyledStepPendingEle).toHaveStyle(`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        width: 360px;`);

    expect(container).toBeTruthy();
  });
  test('Checks onClick event and respective styles', async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <StepPending />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    const buttonClick = getByTestId('stepPendingButton');
    fireEvent.click(buttonClick, { route: '/' });
    expect(getByTestId('stepPendingButton')).toBeInTheDocument();
  });
});
