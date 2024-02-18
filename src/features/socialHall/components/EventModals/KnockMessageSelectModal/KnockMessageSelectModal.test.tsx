import { fireEvent, render } from '@/test-utils';
import {
  KnockMessageModalTypeEnum,
  KnockMessageSelectModal,
} from './KnockMessageSelectModal';

describe('<EventAttendee />', () => {
  test(`render knock message select modal with true`, () => {
    const handleClose = vi.fn();
    const { getByTestId, container } = render(
      <KnockMessageSelectModal
        isOpen={true}
        onClose={handleClose}
        modalType={KnockMessageModalTypeEnum.knock}
      />,
    );
    const cancelButton = getByTestId('cancel-button');
    const knockButton = getByTestId('knock-button');
    fireEvent.click(cancelButton);
    fireEvent.click(knockButton);
    expect(getByTestId('knock-message-select-modal')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
