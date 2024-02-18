import { fireEvent, render, waitFor, within } from '@/test-utils';
import { delay } from '@/utils/delay';
import { NotificationButton } from './NotificationButton';
import { NotificationButtons } from './NotificationButtons';

type TestComeponentProps = {
  primaryOnClick: () => Promise<void>;
  secondaryOnClick: () => Promise<void>;
};

const TestComponent: React.FC<TestComeponentProps> = ({
  primaryOnClick,
  secondaryOnClick,
}) => (
  <>
    <NotificationButton
      testId="test-primary-button"
      variant="primary"
      onClick={primaryOnClick}
    />
    <NotificationButton
      testId="test-secondary-button"
      variant="secondary"
      onClick={secondaryOnClick}
    />
  </>
);

describe('NotificationButtons', () => {
  test('Should render children', () => {
    const { getAllByRole } = render(
      <NotificationButtons>
        <TestComponent primaryOnClick={vi.fn()} secondaryOnClick={vi.fn()} />
      </NotificationButtons>,
    );
    expect(getAllByRole('button')).toHaveLength(2);
  });

  test('Should have proper state transitions for primary variant', async () => {
    const onClickFn = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 500);
        }),
    );

    const { getByTestId } = render(
      <NotificationButtons>
        <TestComponent primaryOnClick={onClickFn} secondaryOnClick={vi.fn()} />
      </NotificationButtons>,
    );

    expect(
      within(getByTestId('test-primary-button')).queryByTestId('spinner'),
    ).not.toBeInTheDocument();

    expect(
      within(getByTestId('test-secondary-button')).queryByTestId('spinner'),
    ).not.toBeInTheDocument();

    fireEvent.click(getByTestId('test-primary-button'));

    expect(
      within(getByTestId('test-primary-button')).getByTestId('spinner'),
    ).toBeInTheDocument();

    expect(
      within(getByTestId('test-secondary-button')).queryByTestId('spinner'),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(
        within(getByTestId('test-primary-button')).queryByTestId('spinner'),
      ).not.toBeInTheDocument();

      expect(onClickFn).toHaveBeenCalled();
    });
  });

  test('Should have proper state transitions for secondary variant', async () => {
    const onClickFn = vi.fn(() => delay(() => {}, 500));

    const { getByTestId } = render(
      <NotificationButtons>
        <TestComponent primaryOnClick={vi.fn()} secondaryOnClick={onClickFn} />
      </NotificationButtons>,
    );

    expect(
      within(getByTestId('test-primary-button')).queryByTestId('spinner'),
    ).not.toBeInTheDocument();

    expect(
      within(getByTestId('test-secondary-button')).queryByTestId('spinner'),
    ).not.toBeInTheDocument();

    fireEvent.click(getByTestId('test-secondary-button'));

    expect(
      within(getByTestId('test-secondary-button')).getByTestId('spinner'),
    ).toBeInTheDocument();

    expect(
      within(getByTestId('test-primary-button')).queryByTestId('spinner'),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(
        within(getByTestId('test-secondary-button')).queryByTestId('spinner'),
      ).not.toBeInTheDocument();

      expect(onClickFn).toHaveBeenCalled();
    });
  });
});
