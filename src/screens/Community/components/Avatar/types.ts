import { type MouseEventHandler } from 'react';
import { type UserOutput } from '@/apollo/generated/types';
import { type Maybe } from '@/common/types';
import { type UserFragment } from '@/apollo/graphql/fragments';

export interface UserAvatarProps {
  user: Maybe<UserOutput | UserFragment>;
  onClick?: MouseEventHandler<HTMLImageElement>;
}
