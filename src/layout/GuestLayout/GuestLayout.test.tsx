import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import GuestLayout from '.';

describe('Guest Layout', () => {
  it('renders layout for Guest', () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <MemoryRouter>
          <GuestLayout>
            <div>page content</div>
          </GuestLayout>
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('guest-layout-container')).toBeInTheDocument();
  });
});
