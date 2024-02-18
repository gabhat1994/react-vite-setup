import { render } from '@/test-utils';
import { EventDescription } from './EventDescription';

const testId = 'event-description-testid';

describe('EventDescription', () => {
  test('Should render', () => {
    const { getByTestId } = render(
      <EventDescription description="test" onClickSeeMore={() => {}} />,
    );
    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
