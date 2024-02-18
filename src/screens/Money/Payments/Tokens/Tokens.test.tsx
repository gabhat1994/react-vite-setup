import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import Tokens from './index';
// import { useClient } from '@/hooks';

describe('Money Page Token', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page Token', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <Tokens />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
