import { fireEvent, render } from '@/test-utils';
import { endEventModalData } from './data';
import { EventModal } from './EventModal';

describe('<EventAttendee />', () => {
  test(`render default event modal`, () => {
    const handleClose = vi.fn();
    const { getByTestId, container } = render(
      <EventModal isOpen={true} onClose={handleClose} {...endEventModalData} />,
    );
    const confirmButton = getByTestId('confirm-button');
    const cancelButton = getByTestId('cancel-button');
    fireEvent.click(confirmButton);
    fireEvent.click(cancelButton);
    expect(getByTestId('default-event-modal')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
