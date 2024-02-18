import { render } from '@/test-utils';
import { Stepper } from './Stepper';

describe('<Stepper />', () => {
  test('render', () => {
    const { getByTestId } = render(<Stepper currentStep={2} completed={4} />);

    expect(getByTestId('stepper-root-container')).toHaveStyle(`
      position: relative;
      width: 100%;
    `);

    const StepperContainerEl = getByTestId('stepper-container');
    expect(StepperContainerEl).toHaveStyle(`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `);
    expect(StepperContainerEl.childElementCount).toEqual(4);

    const PBContainerEl = getByTestId('stepper-pb-container');
    expect(PBContainerEl).toHaveStyle(`
      width: calc(100% - 20px);
      padding: 0 10px;
      position: absolute;
      top: 9px;
      left: 0;
      display: flex;
      align-items: center;
      border-radius: 10px;
    `);

    const PBBackgroundContainerEl = getByTestId('stepper-pb-bg-container');
    expect(PBBackgroundContainerEl).toHaveStyle(`
      width: calc(100% - 20px);
      padding: 0 10px;
      position: absolute;
      top: 6px;
      left: 0;
      display: flex;
      align-items: center;
      border-radius: 10px;
    `);
  });
});
