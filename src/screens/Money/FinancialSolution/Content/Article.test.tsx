import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import Article from './FinancialSolutionHeader';

describe('Money Page Header', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const { container } = render(
      <BrowserRouter>
        <Article data={undefined} />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
