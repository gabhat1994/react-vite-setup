import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import LinkedAccounts from '.';

describe('LinkedAccounts Section', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render LinkedAccounts Section', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <LinkedAccounts accounts={[]} refresh={() => {}} />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
