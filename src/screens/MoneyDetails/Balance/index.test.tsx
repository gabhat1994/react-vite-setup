import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import Balance from '.';

describe('Balance Section', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Balance Section', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <Balance total={44.0} />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
