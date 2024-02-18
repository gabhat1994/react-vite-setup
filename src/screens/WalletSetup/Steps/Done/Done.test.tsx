import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';

import Done from './index';

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Done />
    </BrowserRouter>,
  );

describe('Wallet set up flow Done screen', () => {
  it('Should render the "Done" screen', async () => {
    const { container } = renderComponent();
    expect(container).toBeTruthy();
  });

  it('Has "Continue" button enabled by default', async () => {
    const { getByTestId } = renderComponent();
    const button = getByTestId('done-submit-button');
    expect(button).toBeEnabled();
  });
});
