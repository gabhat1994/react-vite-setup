import { render, screen, fireEvent } from '@/test-utils';
import ChamberEditMode from './Modal';

const onClose = vi.fn();
const markAsVistied = vi.fn();

describe('<ChamberEditMode />', () => {
  test('renders', () => {
    render(
      <ChamberEditMode
        isOpen
        handleClose={onClose}
        handleMarkAsVisited={markAsVistied}
        markSpaceAsEditedLoading={false}
      />,
    );

    const modal = screen.getByTestId('testChamberEditMode');
    expect(modal).toBeInTheDocument();

    const modalTitle = screen.getByTestId('titleChamberEditMode');
    expect(modalTitle).toBeInTheDocument();

    const modalBody = screen.getByTestId('bodyChamberEditMode');
    expect(modalBody).toBeInTheDocument();
    const modalBodyRemenber = screen.getByTestId('bodyRememberChamberEditMode');
    expect(modalBodyRemenber).toBeInTheDocument();

    const modalBtn = screen.getByTestId('closeChamberEditMode');
    expect(modalBtn).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ChamberEditMode
        isOpen
        handleClose={onClose}
        handleMarkAsVisited={markAsVistied}
        markSpaceAsEditedLoading={false}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('testChamberEditMode'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <ChamberEditMode
        isOpen
        handleClose={onClose}
        handleMarkAsVisited={markAsVistied}
        markSpaceAsEditedLoading={false}
      />,
    );

    const modalBtn = screen.getByTestId('closeChamberEditMode');
    expect(modalBtn).toBeInTheDocument();

    fireEvent.click(modalBtn);
    expect(onClose).toHaveBeenCalled();
    expect(markAsVistied).toHaveBeenCalled();
  });
});
