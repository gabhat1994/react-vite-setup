import { render } from '@/test-utils';
import SelectPayee from '.';

describe('Select Payee screen', () => {
  const handleStateChange = vi.fn();
  it('should render select payee screen', () => {
    const { container } = render(
      <SelectPayee handleStateChange={handleStateChange} />,
    );
    expect(container).toBeTruthy();
  });
});
