import { fireEvent, render, screen } from '@/test-utils';
import { ChamberActionModal } from './ChamberActionModal';

const cancelCallback = vi.fn();
const confirmCallback = vi.fn();
const extraBtnCallback = vi.fn();

describe('<ChamberActionModal />', () => {
  test('renders when all props are passed', () => {
    const { getByTestId } = render(
      <ChamberActionModal
        title="Modal title"
        description="Modal description"
        positiveBtnLabel="Are you sure?"
        extraBtnLabel="Save as a Draft"
        negativeBtnLabel="Cancel"
        positiveBtnType="primary"
        positiveBtnIntent="positive"
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
        extraBtnCallback={extraBtnCallback}
      />,
    );

    const primaryBtn = getByTestId('primaryBtn');
    const primaryBtnLabel = getByTestId('primaryBtnLabel');
    const secondaryBtnLabel = getByTestId('secondaryBtnLabel');
    const extraBtn = getByTestId('extraBtn');
    const extraBtnLabel = getByTestId('extraBtnLabel');
    expect(getByTestId('chamberActionModal')).toBeInTheDocument();
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toContainElement(primaryBtnLabel);
    expect(primaryBtnLabel.textContent).toBe('Are you sure?');
    expect(secondaryBtnLabel.textContent).toBe('Cancel');
    expect(extraBtn).toContainElement(extraBtnLabel);
    expect(extraBtnLabel.textContent).toBe('Save as a Draft');
  });

  test('render when mandatory props passed', () => {
    const { getByTestId } = render(
      <ChamberActionModal
        title="Modal title"
        description="Modal description"
        positiveBtnLabel="Confirm"
        positiveBtnType="primary"
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );
    const primaryBtn = getByTestId('primaryBtn');
    const primaryBtnLabel = getByTestId('primaryBtnLabel');
    const secondaryBtnLabel = getByTestId('secondaryBtnLabel');
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toContainElement(primaryBtnLabel);
    expect(primaryBtnLabel.textContent).toBe('Confirm');
    expect(secondaryBtnLabel.textContent).toBe('Close');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ChamberActionModal
        title="Modal title"
        description="Modal description"
        positiveBtnLabel="Confirm"
        positiveBtnType="primary"
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('secondaryBtn'), {
      code: 'Escape',
    });
    expect(cancelCallback).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(cancelCallback).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <ChamberActionModal
        title="Modal title"
        description="Modal description"
        positiveBtnLabel="Confirm"
        positiveBtnType="primary"
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );

    const cancelBtn = screen.getByTestId('secondaryBtn');
    expect(cancelBtn).toBeInTheDocument();

    fireEvent.click(cancelBtn);
    expect(cancelCallback).toHaveBeenCalled();
  });
});
