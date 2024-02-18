import { render, screen } from '@/test-utils';
import { ChamberArchiveModal } from './ChamberArchiveModal';

describe('<ChamberArchiveModal />', () => {
  test('renders', () => {
    const onClose = vi.fn();
    const onArchive = vi.fn();
    render(
      <ChamberArchiveModal
        noumName="test"
        isOpen
        handleClose={onClose}
        onArchive={onArchive}
      />,
    );

    const modal = screen.getByTestId('chamberArchiveModal');
    expect(modal).toBeInTheDocument();
  });
});
