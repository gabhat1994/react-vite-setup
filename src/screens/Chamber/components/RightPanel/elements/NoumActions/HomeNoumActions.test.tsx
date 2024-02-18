import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { useNoumContextMock, useNoumContextReturnValue } from './mock';
import { HomeNoumActions } from './HomeNoumActions';

describe('<HomeNoumActions />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = () =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <HomeNoumActions />
        </BrowserRouter>
      </MockedProvider>,
    );

  test('Should render', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('home-noum-actions')).toBeInTheDocument();
  });
});
