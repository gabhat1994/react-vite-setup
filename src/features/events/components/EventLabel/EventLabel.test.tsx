import { render } from '@/test-utils';

import { EventLabel } from './EventLabel';

const testId = 'event-label';

/**
 * Not Attending label test
 */
describe('NotAttendingLabel', () => {
  test('Should render', () => {
    const { getByTestId, getByText } = render(
      <EventLabel variant="not_attending" />,
    );
    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveStyle(`
      width: max-content;
      background-color: var(--bg-button-neutral-default);
    `);
    expect(getByText('Not Attending')).toBeInTheDocument();
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <EventLabel width="100%" flex={1} variant="not_attending" />,
    );
    expect(getByTestId(testId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });
});

/**
 * Event Finished label test
 */
describe('EventFinishedLabel', () => {
  test('Should render', () => {
    const { getByTestId, getByText } = render(
      <EventLabel variant="finished" />,
    );
    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveStyle(`
      width: max-content;
      background-color: var(--bg-button-neutral-disabled);
    `);
    expect(getByText('Event Finished')).toBeInTheDocument();
  });

  test('Should have style', () => {
    const { getByTestId } = render(
      <EventLabel width="100%" flex={1} variant="finished" />,
    );
    expect(getByTestId(testId)).toHaveStyle(`
      width: 100%;
      flex: 1;
    `);
  });
});
