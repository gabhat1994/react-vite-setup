import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@/test-utils';
import LoginForm from '.';

const mockFunc = vi.fn();

const renderLoginForm = () =>
  render(
    <BrowserRouter>
      <LoginForm
        beforeSubmit={mockFunc}
        onLoginFailed={mockFunc}
        onLoginSuccess={mockFunc}
      />
    </BrowserRouter>,
  );

describe('StepOne', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('testing LoginForm has loaded or not', () => {
    const { container, getByTestId } = renderLoginForm();
    expect(getByTestId('loginFormContainer')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('testing LoginForm has header or not', () => {
    const { getByTestId } = renderLoginForm();
    expect(getByTestId('heading')).toBeInTheDocument();
  });

  test('has Signup link', () => {
    const { getByTestId } = renderLoginForm();
    expect(getByTestId('signUp')).toBeInTheDocument();
  });

  test('has Recaptcha loaded in the page', () => {
    const { getByTestId } = renderLoginForm();
    expect(getByTestId('recaptcha')).toBeInTheDocument();
  });

  test('Checks onClick event on Signup', () => {
    const { container, getByTestId } = renderLoginForm();
    expect(container).toBeTruthy();
    const signUplick = getByTestId('signUp');
    fireEvent.click(signUplick);
    expect((signUplick as HTMLSpanElement).innerHTML).toBe('Sign Up');
  });

  test('Checks correct tab is shown or not', async () => {
    const { getByTestId } = renderLoginForm();
    const tabsChange = getByTestId('tab-1');
    fireEvent.click(tabsChange);
    expect(screen.getByTestId('Styled-TextField')).toBeInTheDocument();
  });
});
