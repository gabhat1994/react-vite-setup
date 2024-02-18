import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { getSpaceById } from '@/screens/Chamber/ViewChamber/mockdata';
import { SpaceStatusEnum } from '@/apollo/generated/types';
import { useNoumContextMock, useNoumContextReturnValue } from './mock';
import { NoumOwnerActions } from './NoumOwnerActions';

describe('<NoumOwnerActions />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = () =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <NoumOwnerActions />
        </BrowserRouter>
      </MockedProvider>,
    );

  test('Should render archived mode', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
      space: {
        ...getSpaceById,
        status: SpaceStatusEnum.Archived,
      },
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('archived-noum-actions')).toBeInTheDocument();
  });

  test('Should not render archived mode', () => {
    useNoumContextMock.mockReturnValue({
      ...useNoumContextReturnValue,
      space: {
        ...getSpaceById,
        status: SpaceStatusEnum.Published,
      },
    });

    const { container, getByTestId } = setup();
    expect(container).toBeTruthy();
    expect(getByTestId('edit-noum-actions')).toBeInTheDocument();
  });
});
