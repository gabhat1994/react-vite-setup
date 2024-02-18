import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { useNoumContextMock, useNoumContextReturnValue } from './mock';
import { NoumUserConnection } from './NoumUserConnection';

const onHandle = vi.fn();

describe('<NoumUserConnection />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = () =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <NoumUserConnection onHandle={onHandle} />
        </BrowserRouter>
      </MockedProvider>,
    );

  test('Should render', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('user-connection-button')).toBeInTheDocument();
  });
});
