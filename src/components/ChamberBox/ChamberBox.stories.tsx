import { type Meta } from '@storybook/react';
import ChamberBox from './ChamberBox';
import { StoriesCnt, StoriesWrapper } from './styles';
import {
  ChamberBoxNameEnum,
  type ChamberBoxProps,
  DiscoveryCategoryEnum,
} from './types';

export const ChamberBoxStories = () => {
  const URL = 'https://www.w3schools.com/howto/img_avatar2.png';

  const data: ChamberBoxProps[] = [
    {
      url: URL,
      name: ChamberBoxNameEnum.project,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured,
    },
    {
      url: URL,
      name: ChamberBoxNameEnum.special,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured,
    },
    {
      url: URL,
      name: ChamberBoxNameEnum.story,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured,
    },
    {
      url: URL,
      name: ChamberBoxNameEnum.member,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured,
    },
    {
      url: URL,
      name: ChamberBoxNameEnum.investment,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured,
    },
    {
      url: URL,
      name: ChamberBoxNameEnum.social,
      title: 'Blockchain Development Chamber',
      ownedby: 'Tom Green',
      followers: 124,
      category: DiscoveryCategoryEnum.Featured,
    },
  ];
  return (
    <StoriesCnt>
      {data.map((el) => (
        <StoriesWrapper>
          <ChamberBox
            name={el.name}
            url={el.url}
            title={el.title}
            ownedby={el.ownedby}
            followers={el.followers}
            category={el.category}
          />
        </StoriesWrapper>
      ))}
    </StoriesCnt>
  );
};

export default {
  title: 'UI/Chambers/ChamberBox',
  component: ChamberBoxStories,
} as Meta<typeof ChamberBoxStories>;
