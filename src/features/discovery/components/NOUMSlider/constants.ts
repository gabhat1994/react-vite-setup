import { ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { type CardProps } from './types';

export const DESKTOP_ITEMS_COUNT = 4;
export const OTHER_VIEWS_COUNT = 3;
export const SLIDER_BREAK_POINT = 1439;

const URL = 'https://www.w3schools.com/howto/img_avatar2.png';

export const CardItems: CardProps[] = [
  {
    url: URL,
    name: ChamberBoxNameEnum.project,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 124,
    _id: '1',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.social,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 124,
    _id: '2',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.story,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 124,
    _id: '3',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.member,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 124,
    _id: '4',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.investment,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 132,
    _id: '5',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.social,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 134,
    _id: '6',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.investment,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Hardy',
    followers: 126,
    _id: '7',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.social,
    title: 'Blockchain Development Chamber',
    ownedby: 'Mat Green',
    followers: 144,
    _id: '8',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.story,
    title: 'Blockchain Development Chamber',
    ownedby: 'Hobert Green',
    followers: 122,
    _id: '9',
  },
  {
    url: URL,
    name: ChamberBoxNameEnum.project,
    title: 'Blockchain Development Chamber',
    ownedby: 'Tom Green',
    followers: 124,
    _id: '10',
  },
];
