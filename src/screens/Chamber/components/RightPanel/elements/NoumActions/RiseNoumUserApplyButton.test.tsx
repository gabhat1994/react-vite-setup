import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { useNoumContextMock, useNoumContextReturnValue } from './mock';
import { RiseNoumUserApplyButton } from './RiseNoumUserApplyButton';

describe('<RiseNoumUserApplyButton />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = () =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <RiseNoumUserApplyButton />
        </BrowserRouter>
      </MockedProvider>,
    );

  test('Should render', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('user-rise-apply-button')).toBeInTheDocument();
  });
});
