import { act, render, fireEvent } from '@/test-utils';

import {
  AttendButton,
  AttendingButton,
  EditEventButton,
  GoLiveButton,
  InvitationButton,
  JoinEventButton,
} from '.';

const onClick = vi.fn();

const attendBtnTestId = 'attend-button';
const attendingBtnTestId = 'attending-button-wrapper';
const editEventBtnTestId = 'edit-event-button';
const goLiveBtnTestId = 'event-go-live-button';
const invitationButtonsWrapperTestId = 'invitation-buttons-wrapper';
const declineInvitationBtnTestId = 'decline-invitation-button';
const acceptInvitationBtnTestId = 'accept-invitation-button';
const joinEventBtnTestId = 'join-event-button';

/**
 * Attend button test
 */
describe('AttendButton', () => {
  test('Should render', () => {
    const { getByTestId, getByText } = render(
      <AttendButton onClick={onClick} />,
    );
    expect(getByTestId(attendBtnTestId)).toBeInTheDocument();
    expect(getByText('Attend')).toBeInTheDocument();
    expect(getByTestId(attendBtnTestId)).toHaveStyle(`
      width: max-content;
    `);
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <AttendButton width="100%" flex={1} onClick={onClick} />,
    );
    expect(getByTestId(attendBtnTestId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });

  test('Should be able to click', () => {
    const { getByTestId } = render(
      <AttendButton width="100%" onClick={onClick} />,
    );
    act(() => {
      fireEvent.click(getByTestId(attendBtnTestId));
    });
  });
});

/**
 * Attending button test
 */
describe('AttendingButton', () => {
  test('Should render', () => {
    const { getByTestId } = render(
      <AttendingButton onAttending={onClick} onNotAttending={onClick} />,
    );
    expect(getByTestId(attendingBtnTestId)).toBeInTheDocument();
    expect(getByTestId(attendingBtnTestId)).toHaveStyle(`
      width: 130px;
    `);
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <AttendingButton
        width="100%"
        flex={1}
        onAttending={onClick}
        onNotAttending={onClick}
      />,
    );
    expect(getByTestId(attendingBtnTestId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });

  test('Should have attending value', () => {
    const { getByTestId } = render(
      <AttendingButton
        isAttending
        onAttending={onClick}
        onNotAttending={onClick}
      />,
    );
    expect(getByTestId('attending-label')).toHaveTextContent('Attending');
  });

  test('Should have not attending value', () => {
    const { getByTestId } = render(
      <AttendingButton
        isAttending={false}
        onAttending={onClick}
        onNotAttending={onClick}
      />,
    );
    expect(getByTestId('attending-label')).toHaveTextContent('Not Attending');
  });

  test('Should be able to click', () => {
    const { getByTestId } = render(
      <AttendingButton onAttending={onClick} onNotAttending={onClick} />,
    );
    act(() => {
      fireEvent.click(getByTestId(attendingBtnTestId));
    });
  });
});

/**
 * Edit event button test
 */
describe('EditEventButton', () => {
  test('Should render', () => {
    const { getByTestId, getByText } = render(
      <EditEventButton onClick={onClick} />,
    );
    expect(getByTestId(editEventBtnTestId)).toBeInTheDocument();
    expect(getByText('Edit Event')).toBeInTheDocument();
    expect(getByTestId(editEventBtnTestId)).toHaveStyle(`
      width: max-content;
    `);
  });

  test('Should render icon only', () => {
    const { getByTestId, queryByText } = render(
      <EditEventButton iconOnly onClick={onClick} />,
    );
    expect(getByTestId(editEventBtnTestId)).toBeInTheDocument();
    expect(queryByText('Edit Event')).toBeNull();
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <EditEventButton width="100%" flex={1} onClick={onClick} />,
    );
    expect(getByTestId(editEventBtnTestId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });

  test('Should be able to click', () => {
    const { getByTestId } = render(
      <EditEventButton width="100%" onClick={onClick} />,
    );
    act(() => {
      fireEvent.click(getByTestId(editEventBtnTestId));
    });
  });
});

/**
 * Go live button test
 */
describe('GoLiveButton', () => {
  test('Should render', () => {
    const { getByTestId, getByText } = render(
      <GoLiveButton onClick={onClick} />,
    );
    expect(getByTestId(goLiveBtnTestId)).toBeInTheDocument();
    expect(getByText('Go Live!')).toBeInTheDocument();
    expect(getByTestId(goLiveBtnTestId)).toHaveStyle(`
      width: max-content;
    `);
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <GoLiveButton width="100%" flex={1} onClick={onClick} />,
    );
    expect(getByTestId(goLiveBtnTestId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });

  test('Should be able to click', () => {
    const { getByTestId } = render(
      <GoLiveButton width="100%" onClick={onClick} />,
    );
    act(() => {
      fireEvent.click(getByTestId(goLiveBtnTestId));
    });
  });
});

/**
 * Accept/Decline invitation button test
 */
describe('InvitationButton', () => {
  test('Should render', () => {
    const { getByTestId } = render(
      <InvitationButton onDecline={onClick} onAccept={onClick} />,
    );
    expect(getByTestId(invitationButtonsWrapperTestId)).toBeInTheDocument();
    expect(getByTestId(declineInvitationBtnTestId)).toBeInTheDocument();
    expect(getByTestId(acceptInvitationBtnTestId)).toBeInTheDocument();

    expect(getByTestId(invitationButtonsWrapperTestId)).toHaveStyle(`
      width: max-content;
    `);
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <InvitationButton
        width="100%"
        flex={1}
        onDecline={onClick}
        onAccept={onClick}
      />,
    );
    expect(getByTestId(invitationButtonsWrapperTestId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });

  test('Should be able to click', () => {
    const { getByTestId } = render(
      <InvitationButton width="100%" onDecline={onClick} onAccept={onClick} />,
    );
    act(() => {
      fireEvent.click(getByTestId(declineInvitationBtnTestId));
    });
    act(() => {
      fireEvent.click(getByTestId(acceptInvitationBtnTestId));
    });
  });
});

/**
 * Join event button test
 */
describe('JoinEventButton', () => {
  test('Should render', () => {
    const { getByTestId, getByText } = render(
      <JoinEventButton onClick={onClick} />,
    );
    expect(getByTestId(joinEventBtnTestId)).toBeInTheDocument();
    expect(getByText('Join the Event')).toBeInTheDocument();
    expect(getByTestId(joinEventBtnTestId)).toHaveStyle(`
      width: max-content;
    `);
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <JoinEventButton width="100%" flex={1} onClick={onClick} />,
    );
    expect(getByTestId(joinEventBtnTestId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });

  test('Should be able to click', () => {
    const { getByTestId } = render(
      <JoinEventButton width="100%" onClick={onClick} />,
    );
    act(() => {
      fireEvent.click(getByTestId(joinEventBtnTestId));
    });
  });
});
