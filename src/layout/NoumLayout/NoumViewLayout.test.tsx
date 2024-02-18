import { render } from '@/test-utils';
import { NoumViewLayout } from '.';

describe('NoumLayout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <NoumViewLayout header={<div>Header</div>} hasSideBar={false}>
        <div>Body</div>
      </NoumViewLayout>,
    );
    expect(container).toBeTruthy();
  });
});
