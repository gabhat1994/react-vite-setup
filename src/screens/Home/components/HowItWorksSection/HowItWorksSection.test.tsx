import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import HowItWorksSection from './HowItWorksSection';

describe('Home Page HowItWorksSection', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render HowItWorksSection', async () => {
    const { container } = render(
      <BrowserRouter>
        <HowItWorksSection data={undefined} />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
