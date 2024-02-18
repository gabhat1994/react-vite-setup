import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import SinglePageLayout from './index';

vi.mock('@/screens/Chamber/ViewChamber/ChamberLeftSideBar', () => ({
  ChamberLeftSideBar: 'ChamberLeftSideBar',
}));

describe('Guest Layout', () => {
  it('renders layout for Guest', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <MemoryRouter>
          <SinglePageLayout showBackButton>
            <div>page content</div>
          </SinglePageLayout>
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('single-page-layout-container')).toBeInTheDocument();
  });
});
