import { cleanup, fireEvent, render } from '@/test-utils';
import { getStepBgColor, getStepColor, getStepPointBgDimens } from './helpers';
import { StepPoint } from './StepPoint';

describe('<StepPoint />', () => {
  afterEach(() => {
    cleanup();
  });

  test('render of passed step point', () => {
    const mockCallBack = vi.fn();
    const { getByTestId } = render(
      <StepPoint isPassed={true} pointNum={1} onClick={mockCallBack} />,
    );

    const StepPointContainerEl = getByTestId('steppoint-container');
    expect(StepPointContainerEl).toHaveStyle(`
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${getStepBgColor(true)};
      ${getStepPointBgDimens(true)}
    `);
    fireEvent.click(StepPointContainerEl);
    expect(mockCallBack).toBeCalledWith(1);

    expect(getByTestId('steppoint-point')).toHaveStyle(`
      height: 8px;
      width: 8px;
      border-radius: 100%;
      transition: background-color 0.2s linear 0s;
      background-color: ${getStepColor(true)}
    `);
  });
  test('render of unpassed step point', () => {
    const mockCallBack = vi.fn();
    const { getByTestId } = render(
      <StepPoint isPassed={false} pointNum={2} onClick={mockCallBack} />,
    );

    const StepPointContainerEl = getByTestId('steppoint-container');
    expect(StepPointContainerEl).toHaveStyle(`
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${getStepBgColor(false)};
      ${getStepPointBgDimens(false)}
    `);
    fireEvent.click(StepPointContainerEl);
    expect(mockCallBack).toBeCalledWith(2);

    expect(getByTestId('steppoint-point')).toHaveStyle(`
      height: 8px;
      width: 8px;
      border-radius: 100%;
      transition: background-color 0.2s linear 0s;
      background-color: ${getStepColor(false)};
    `);
  });
});
