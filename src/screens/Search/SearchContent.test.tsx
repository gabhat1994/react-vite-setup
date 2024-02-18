import { EntityType } from '@/apollo/generated/types';
import { render } from '@/test-utils';
import SearchContent from './SearchContent';

describe('ShowOtp', () => {
  test('render', () => {
    const { container } = render(
      <SearchContent
        data={{
          id: '1',
          entityType: EntityType.HomeNoum,
          user: {
            id: '1',
            name: 'name',
            thumbnailUrl: 'thumbnailUrl',
            title: 'user',
            isNoumenaEmployee: false,
          },
        }}
      />,
    );

    expect(container).toBeTruthy();
  });
});
