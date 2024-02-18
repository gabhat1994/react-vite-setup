import { type HTMLAttributes } from 'react';
import { type HomeChambersEnum } from '@/screens/Chamber/components/Element/types';
import { type IWrapper } from '@/screens/Chamber/components/ElementWrapper/types';
import { type Maybe } from '@/common/types';
import { type Icons } from '@/components/Icon/Icon';

export type HomeChamberProps = {
  image: keyof typeof Icons;
  text: string;
  buttonText: string;
  elementType: HomeChambersEnum;
  isEditing: boolean | undefined;
  currentTitle?: string;
  isBorder?: boolean;
  wrapperProps: HTMLAttributes<HTMLDivElement> & IWrapper;
  spaceId: string;
  position: Maybe<number> | undefined;
  bodyContentJson?: unknown;
  elementId?: Maybe<string> | undefined;
  hideContent?: boolean;
  isHighlight?: boolean;
  columnWidth?: number;
};

export type UseHomeChambersProps = {
  elementType: HomeChambersEnum;
  spaceId: string;
  elementPosition: Maybe<number> | undefined;
  bodyContentJson?: unknown;
  elementId?: Maybe<string> | undefined;
  isEditing?: boolean;
};
