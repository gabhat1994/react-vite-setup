import { MemoryRouter } from 'react-router';
import { render, screen } from '@/test-utils';
import { AcceptedUser } from './index';

describe('<AcceptedUser />', () => {
  test('renders', () => {
    render(
      <MemoryRouter>
        <AcceptedUser />
      </MemoryRouter>,
    );
    const button = screen.getByTestId('continue_button');
    expect(button).toBeInTheDocument();
  });
});
