import {
  type Knock,
  KnockType,
  type UserOutput,
} from '@/apollo/generated/types';

export const knockMock: Knock[] = [
  {
    _id: '1',
    knockerUserId: '12',
    knockStatus: KnockType.Accepted,
  },
  {
    _id: '2',
    knockerUserId: '22',
    receiverUserId: '123',
    knockStatus: KnockType.Cancelled,
  },
  {
    _id: '3',
    knockerUserId: '32',
    receiverUserId: '123',
    knockStatus: KnockType.Accepted,
  },
  {
    _id: '4',
    knockerUserId: '42',
    receiverUserId: '123',
    knockStatus: KnockType.Declined,
  },
  {
    _id: '5',
    knockerUserId: '52',
    receiverUser: {
      _id: '25',
    },
    knockStatus: KnockType.Pending,
  },
  {
    _id: '6',
    knockerUserId: '62',
    receiverUser: {
      _id: '25',
    },
    receiverUserId: '123',
    knockStatus: KnockType.Pending,
  },
];

export const declinedKnocks = knockMock.slice(2).map((item) => ({
  ...item,
  knockStatus: KnockType.Accepted,
}));

export const userOutput: UserOutput[] = [
  {
    _id: '1',
  },
  {
    _id: '2',
  },
  {
    _id: '3',
  },
  {
    _id: '4',
  },
  {
    _id: '5',
  },
];
