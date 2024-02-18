import { render } from '@/test-utils';
import { EventConfirmationModal } from './EventConfirmationModal';

const onClose = vi.fn();
const onConfirm = vi.fn();

describe('<EventConfirmationModal>', () => {
  test('Change Privacy modal', () => {
    const { getByTestId, getByText } = render(
      <EventConfirmationModal
        type="change-privacy"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(getByTestId('event-confirmation-modal')).toBeInTheDocument();
    expect(getByTestId('event-confirmation-modal-message')).toHaveTextContent(
      'Are you sure you want to change the event privacy settings?',
    );
    expect(
      getByTestId('event-confirmation-modal-description'),
    ).toHaveTextContent('Some users invited to this event will be removed.');
    expect(getByText('Change Privacy Settings')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  test('Remove Cohost modal', () => {
    const { getByTestId, getByText } = render(
      <EventConfirmationModal
        type="remove-cohost"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(getByTestId('event-confirmation-modal')).toBeInTheDocument();
    expect(getByTestId('event-confirmation-modal-message')).toHaveTextContent(
      'Are you sure you want to remove this co-host?',
    );
    expect(
      getByTestId('event-confirmation-modal-description'),
    ).toHaveTextContent(
      'This member will no longer be able to manage the event.',
    );
    expect(getByText('Yes, Remove this Co-host')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  test('Cancel Event modal', () => {
    const { getByTestId, getByText } = render(
      <EventConfirmationModal
        type="cancel-event"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(getByTestId('event-confirmation-modal')).toBeInTheDocument();
    expect(getByTestId('event-confirmation-modal-message')).toHaveTextContent(
      'Are you sure you want to cancel this event?',
    );
    expect(
      getByTestId('event-confirmation-modal-description'),
    ).toHaveTextContent('Your co-hosts and attendees will be notified.');
    expect(getByText('Yes, Cancel the Event')).toBeInTheDocument();
    expect(getByText('No, Keep it')).toBeInTheDocument();
  });

  test('Discard Change modal', () => {
    const { getByTestId, getByText } = render(
      <EventConfirmationModal
        type="discard"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(getByTestId('event-confirmation-modal')).toBeInTheDocument();
    expect(getByTestId('event-confirmation-modal-message')).toHaveTextContent(
      'Discard changes?',
    );
    expect(
      getByTestId('event-confirmation-modal-description'),
    ).toHaveTextContent(
      'Unsaved changes will be lost. Are you sure you want to leave?',
    );
    expect(getByText('Yes, Discard Changes')).toBeInTheDocument();
    expect(getByText('No, Continue Editing')).toBeInTheDocument();
  });

  test('Cancel invitation modal', () => {
    const { getByTestId, getByText } = render(
      <EventConfirmationModal
        type="cancel-invite"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(getByTestId('event-confirmation-modal')).toBeInTheDocument();
    expect(getByTestId('event-confirmation-modal-message')).toHaveTextContent(
      'Are you sure you want to cancel the invitation?',
    );
    expect(
      getByTestId('event-confirmation-modal-description'),
    ).toHaveTextContent(
      'This member will no longer be able to join the event.',
    );
    expect(getByText('Yes, Cancel the Invitation')).toBeInTheDocument();
    expect(getByText('No, Keep it')).toBeInTheDocument();
  });
});
