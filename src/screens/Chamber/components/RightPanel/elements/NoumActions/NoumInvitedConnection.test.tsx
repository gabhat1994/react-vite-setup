import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { useNoumContextMock, useNoumContextReturnValue } from './mock';
import { NoumInvitedConnection } from './NoumInvitedConnection';

const onHandle = vi.fn();

describe('<NoumInvitedConnection />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = () =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <NoumInvitedConnection onHandle={onHandle} />
        </BrowserRouter>
      </MockedProvider>,
    );

  test('Should render', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('noum-invited-connections')).toBeInTheDocument();
  });
});
