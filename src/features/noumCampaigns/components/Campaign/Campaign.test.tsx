import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import { campaignsListData } from './mock';
import Campaign from './Campaign';

describe('<Campaign />', () => {
  afterEach(() => {
    cleanup();
  });

  test('render Campaign', () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <Campaign {...campaignsListData[0]} />
      </BrowserRouter>,
    );

    expect(container).toBeTruthy();
    expect(getByTestId('campaign-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-header-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-filters-testid')).toBeInTheDocument();
    expect(
      getByTestId('campaign-summary-container-testid'),
    ).toBeInTheDocument();
  });
  test('Test Active Campaign', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <BrowserRouter>
        <Campaign {...campaignsListData[0]} />
      </BrowserRouter>,
    );

    expect(getByTestId('campaign-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-header-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-filters-testid')).toBeInTheDocument();
    expect(
      getByTestId('campaign-summary-container-testid'),
    ).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
    expect(queryByTestId('campaign-actions-testid')).toBeInTheDocument();
  });
  test('Test Cancelled Campaign', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <BrowserRouter>
        <Campaign {...campaignsListData[2]} />
      </BrowserRouter>,
    );

    expect(getByTestId('campaign-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-header-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-filters-testid')).toBeInTheDocument();
    expect(
      getByTestId('campaign-summary-container-testid'),
    ).toBeInTheDocument();
    expect(getByText('Cancelled')).toBeInTheDocument();
    expect(queryByTestId('campaign-actions-testid')).not.toBeInTheDocument();
  });
  test('Test Finished Campaign', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <BrowserRouter>
        <Campaign {...campaignsListData[1]} />
      </BrowserRouter>,
    );

    expect(getByTestId('campaign-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-header-testid')).toBeInTheDocument();
    expect(getByTestId('campaign-filters-testid')).toBeInTheDocument();
    expect(
      getByTestId('campaign-summary-container-testid'),
    ).toBeInTheDocument();
    expect(getByText('Finished')).toBeInTheDocument();
    expect(queryByTestId('campaign-actions-testid')).not.toBeInTheDocument();
  });
});
