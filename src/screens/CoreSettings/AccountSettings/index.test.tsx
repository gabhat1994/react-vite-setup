import { MockedProvider } from '@apollo/client/testing';
import { type queries, fireEvent } from '@testing-library/react';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import AccountSettings from './index';

const user = {
  _id: 'someId',
};
describe('<AccountSettings />', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;
  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false}>
          <AuthProvider client={client} initialUser={user}>
            <AccountSettings />
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const { container } = mocked;
    expect(container).toBeTruthy();
  });
  test('Testing for presence of Button Edit Phone', () => {
    const { container, queryByTestId } = mocked;

    expect(container).toBeTruthy();

    expect(queryByTestId('edit-phone')).toBeInTheDocument();
  });

  test('Testing the clickable action of  Button Edit Phone', async () => {
    const { getByTestId } = mocked;

    const button = getByTestId('edit-phone');

    fireEvent.click(button);
  });

  test('Testing for presence of Button Edit Email', () => {
    const { container, queryByTestId } = mocked;

    expect(container).toBeTruthy();

    expect(queryByTestId('edit-email')).toBeInTheDocument();
  });

  test('Testing the clickable action of  Button Edit Email', async () => {
    const { getByTestId } = mocked;

    const button = getByTestId('edit-email');

    fireEvent.click(button);
  });

  test('Testing for presence of Button Delete Account', () => {
    const { container, queryByTestId } = mocked;
    expect(container).toBeTruthy();
    expect(queryByTestId('delete-account')).toBeInTheDocument();
  });
});
