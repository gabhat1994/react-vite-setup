import { faker } from '@faker-js/faker';
import { fireEvent, render } from '@/test-utils';
import { NotificationItem } from './NotificationItem';
import { NotificationButton } from './NotificationButton';

const baseProps = {
  avatars: ['https://picsum.photos/150/240'],
  isViewed: false,
  body: <span>body text</span>,
  timestamp: faker.date.past(),
};

describe('NotificationLayout', () => {
  test('Should render NotificationItem with mandatory props', () => {
    const { getByRole, getByText, getAllByTestId } = render(
      <NotificationItem {...baseProps} />,
    );
    expect(getByRole('listitem')).toBeInTheDocument();
    expect(getByText('body text')).toBeInTheDocument();
    expect(getAllByTestId('avatarContainer')).toHaveLength(1);
  });

  test('Should call onClick', () => {
    const onClickFn = vi.fn();
    const { getByRole } = render(
      <NotificationItem {...baseProps} onClick={onClickFn} />,
    );
    fireEvent.click(getByRole('listitem'));

    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  test('Should render buttons', () => {
    const buttons = (
      <div data-testid="test-buttons">
        <NotificationButton variant="primary" onClick={vi.fn()}>
          accept
        </NotificationButton>
        <NotificationButton variant="primary" onClick={vi.fn()}>
          decline
        </NotificationButton>
      </div>
    );
    const { getByTestId, getAllByRole } = render(
      <NotificationItem {...baseProps} buttons={buttons} />,
    );

    const buttonsEl = getByTestId('test-buttons');
    expect(buttonsEl).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(2);
  });

  test('Should render title', () => {
    const titleText = 'title text';
    const { getByText } = render(
      <NotificationItem {...baseProps} title={<span>{titleText}</span>} />,
    );
    expect(getByText(titleText)).toBeInTheDocument();
  });
});
