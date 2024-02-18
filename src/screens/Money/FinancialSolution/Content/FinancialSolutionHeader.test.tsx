import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import FinancialSolutionHeader from './FinancialSolutionHeader';

describe('Money Page Header', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const { container } = render(
      <BrowserRouter>
        <FinancialSolutionHeader data={undefined} />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
