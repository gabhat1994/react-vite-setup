import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import MoneyDetails from './index';

describe('MoneyDetails Page', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <MoneyDetails />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
