import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import ChamberBox from './ChamberBox';
import { type ChamberBoxNameEnum, type ChamberBoxProps, DiscoveryCategoryEnum } from './types';

describe('<ChamberBox />', () => {
  afterEach(() => {
    cleanup();
  });

  test('render chamber tabs ', () => {
    const URL = 'https://www.w3schools.com/howto/img_avatar2.png';

    const data: ChamberBoxProps = {
      url: URL,
      name: 'project' as ChamberBoxNameEnum,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured
    };
    const { getByTestId } = render(
      <BrowserRouter>
        <ChamberBox
          url={data.url}
          name={data.name as ChamberBoxNameEnum}
          title={data.title}
          ownedby={data.ownedby}
          followers={data.followers}
          category={DiscoveryCategoryEnum.Featured}
        />
      </BrowserRouter>,
    );

    expect(getByTestId('chamberbox-testid')).toHaveStyle(`
        border-radius: 16px;
        display: flex;
    `);
  });
});
