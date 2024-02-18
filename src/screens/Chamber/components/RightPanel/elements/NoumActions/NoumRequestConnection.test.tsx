import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { useNoumContextMock, useNoumContextReturnValue } from './mock';
import { NoumRequestConnection } from './NoumRequestConnection';

const onHandle = vi.fn();

describe('<NoumRequestConnection />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = () =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <NoumRequestConnection onHandle={onHandle} />
        </BrowserRouter>
      </MockedProvider>,
    );

  test('Should render', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('request-connection-button')).toBeInTheDocument();
  });
});
