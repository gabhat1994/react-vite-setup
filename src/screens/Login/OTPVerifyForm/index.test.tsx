import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router';
import {
  cleanup,
  fireEvent,
  type queries,
  render,
  type RenderResult,
  waitFor,
  act,
} from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import OTPVerifyForm from '.';

const mocks = (): MockedResponse[] => [];

const user = {
  _id: 'someId',
};

const mockFunc = vi.fn();

describe('<OTPVerifyForm />', () => {
  const initialEntries = ['/login'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <OTPVerifyForm
                backStep={mockFunc}
                beforeSubmit={mockFunc}
                onVerifyFailed={mockFunc}
                onVerifySuccess={mockFunc}
                remainingRequests={0}
                timeLeftForNextResend={80000}
              />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing render', () => {
    const { container } = mocked;
    expect(container).toBeTruthy();
  });
  test('Testing click back button event', async () => {
    const { getByTestId } = mocked;
    const button = getByTestId('otp-back-button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFunc).toHaveBeenCalled();
    });
  });
  test('Testing click submit button event', async () => {
    const { getByTestId } = mocked;
    const button = getByTestId('otp-submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
