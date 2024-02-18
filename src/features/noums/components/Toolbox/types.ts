import { type ElementTypeEnum } from '@/apollo/generated/types';
import { type Icons } from '@/components/Icon/Icon';

export interface TabsHeaderTypes {
  name: string;
  image: keyof typeof Icons;
  text: string;
  id: string;
  labelSize: 'small' | 'medium' | 'large' | 'auto';
  group: string;
}

export interface ListOfOptionsTypes {
  size: number;
  type: ElementTypeEnum;
  text: string;
  name: keyof typeof Icons;
  group: string[];
  disabled: boolean;
  isComingSoon?: boolean;
  allowedNoumTypes: string[];
  toolTipText?: string;
  hasPermission?: boolean;
}
