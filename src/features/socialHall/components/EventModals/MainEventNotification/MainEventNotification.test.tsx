import { Icon } from '@/components/Icon';
import { fireEvent, render } from '@/test-utils';
import { MainEventNotification } from './MainEventNotification';

describe('<MainEventNotification />', () => {
  test(`render raise-hand notification without buttons`, () => {
    const { getByTestId, container, queryByTestId } = render(
      <MainEventNotification
        isOpen={true}
        onDecline={() => {}}
        onConfirm={() => {}}
        description="You raised your hand. We will let the speaker know you want to talk"
        icon={<Icon imageIconName="raise_hand_m" size={24} />}
      />,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('main-event-notification')).toBeInTheDocument();
    expect(queryByTestId('decline-button')).toBeNull();
    expect(queryByTestId('confirm-button')).toBeNull();
  });
  test(`render invite-to-stage notification with buttons`, () => {
    const { getByTestId, container } = render(
      <MainEventNotification
        isOpen={true}
        onDecline={() => {}}
        onConfirm={() => {}}
        showButtons
        description="Cate is inviting you to Stage to speak"
        icon={
          <Icon
            name="mic_on_m"
            size={24}
            color="--icon-card-placeholder-neutral-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('main-event-notification')).toBeInTheDocument();
    const cancelButton = getByTestId('decline-button');
    const knockButton = getByTestId('confirm-button');
    fireEvent.click(cancelButton);
    fireEvent.click(knockButton);
  });
  test(`render move-to-audience notification without buttons`, () => {
    const { getByTestId, container, queryByTestId } = render(
      <MainEventNotification
        isOpen={true}
        onDecline={() => {}}
        onConfirm={() => {}}
        description="Cate moved you to the audience"
        icon={
          <Icon
            name="mic_off_m"
            size={24}
            color="--icon-card-placeholder-neutral-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('main-event-notification')).toBeInTheDocument();
    expect(queryByTestId('decline-button')).toBeNull();
    expect(queryByTestId('confirm-button')).toBeNull();
  });
});
