import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { FullScreenLayout } from './index';

describe('Full Screen Layout', () => {
  it('renders full screen layout', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <MemoryRouter>
          <FullScreenLayout>
            <div>page content</div>
          </FullScreenLayout>
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('full-screen-layout-container')).toBeInTheDocument();
  });
});
