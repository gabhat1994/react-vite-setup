import { getPBFontSize } from '@/utils/dimens';
import { render } from '@/test-utils';
import { ProgressBar } from './ProgressBar';

describe('<ProgressBar />', () => {
  test('render', () => {
    const { getByTestId } = render(<ProgressBar percentage={50} />);
    const PBFillerEl = expect(getByTestId('pb-filler'));
    PBFillerEl.toHaveStyle(`
      width: 50%;
      height: 20px;
      background-color: var(--bg-progressbar-brand-primary-default);
      transition: width 0.3s ease-in-out;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    `);
    PBFillerEl.toBeEmptyDOMElement();
  });

  test('render with color', () => {
    const { getByTestId } = render(
      <ProgressBar
        percentage={50}
        color="var(--bg-progressbar-neutral-alt-default)"
      />,
    );
    const PBFillerEl = expect(getByTestId('pb-filler'));
    PBFillerEl.toHaveStyle(`
      background-color: var(--bg-progressbar-neutral-alt-default);
    `);
    PBFillerEl.toBeEmptyDOMElement();
  });

  test('render with label', () => {
    const { getByTestId } = render(<ProgressBar percentage={50} isLabel />);
    const PBLabelEl = expect(getByTestId('pb-label'));
    PBLabelEl.toHaveStyle(`
      color: var(--text-button-neutral-alt-default);
      font-family: var(--font-family);
      font-weight: bold;
      font-size: 12px;
    `);
  });

  test('render with label & height', () => {
    const { getByTestId } = render(
      <ProgressBar percentage={50} barSize={30} isLabel />,
    );
    const PBFillerEl = expect(getByTestId('pb-filler'));
    const PBLabelEl = expect(getByTestId('pb-label'));
    PBFillerEl.toHaveStyle(`
      height: 30px;
    `);

    const fontSize = getPBFontSize(30);
    PBLabelEl.toHaveStyle(`
      font-size: ${fontSize}px;
    `);
  });

  test('render with background color', () => {
    const { getByTestId } = render(
      <ProgressBar
        percentage={50}
        backgroudColor="var(--bg-progressbar-brand-primary-default)"
      />,
    );
    const PBContainerEl = expect(getByTestId('pb-container'));
    PBContainerEl.toHaveStyle(`
      background-color: 'var(--bg-progressbar-brand-primary-default)';
    `);
  });
});
