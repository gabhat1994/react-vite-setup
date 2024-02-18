import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import OpsInvoiceSummaryLayout from './index';

describe('ops view for invoice summary', () => {
  it('renders layout for ops view for invoice summary', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <MemoryRouter>
          <OpsInvoiceSummaryLayout>
            <div>page content</div>
          </OpsInvoiceSummaryLayout>
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
    expect(
      getByTestId('ops-invoice--summary-layout-container'),
    ).toBeInTheDocument();
  });
});
