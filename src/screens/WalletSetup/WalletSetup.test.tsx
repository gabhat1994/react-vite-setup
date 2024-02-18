import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import WalletSetup from './index';

describe('Wallet Setup Flow', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render Wallet set up main page', async () => {
    const { container } = render(
      <BrowserRouter>
        <MockedProvider>
          <WalletSetup />
        </MockedProvider>
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
