import { MemoryRouter } from 'react-router';
import { EntityType } from '@/apollo/generated/types';
import { render } from '@/test-utils';
import SearchList from './SearchList';

describe('ShowOtp', () => {
  test('render', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchList
          result={[
            {
              id: '1',
              entityType: EntityType.HomeNoum,
              user: {
                id: '1',
                name: 'name',
                thumbnailUrl: 'thumbnailUrl',
                title: 'user',
                isNoumenaEmployee: false,
              },
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(container).toBeTruthy();
  });
});
