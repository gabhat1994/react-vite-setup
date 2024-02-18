import { Icon } from '@/components';

import { ArrowStack, AvatarStack, AvatarImage } from '../styles';
import { type TransactionContext } from './type';
import { icon } from './constants';

type AvatarProps = {
  context: TransactionContext;
  src?: string;
};

export const Avatar = ({ context, src }: AvatarProps) => (
  <AvatarStack>
    <AvatarImage src={src} />
    <ArrowStack context={context}>
      <Icon name={icon[context].name} size={10} color={icon[context].color} />
    </ArrowStack>
  </AvatarStack>
);
