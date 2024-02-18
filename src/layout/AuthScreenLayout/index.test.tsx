import { MemoryRouter } from 'react-router';
import { render } from '@/test-utils';
import AuthScreenLayout from '.';

describe('AuthScreenLayout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthScreenLayout type="login">
          <div>Login</div>
        </AuthScreenLayout>
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });
});
