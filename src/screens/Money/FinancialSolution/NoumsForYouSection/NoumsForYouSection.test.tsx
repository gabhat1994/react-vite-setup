import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import NoumsForYouSection from './NoumsForYouSection';

describe('Money Page Noum', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <NoumsForYouSection recommendedNoumIds={['', '']} />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
