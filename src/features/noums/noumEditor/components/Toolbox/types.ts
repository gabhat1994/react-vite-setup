import { type Icons } from '@/components/Icon/Icon';
import { type ElementTypeEnum } from '@/apollo/generated/types';
import { type TabsHeaderTypes } from '@/features/noums/components/Toolbox';
import { type ReactNode } from 'react';

export interface ToolboxProps {
  spaceId: string;
  columnId: string;
  handleSelectElementType: () => void;
  position?: number;
  baseElementId?: string;
}

export interface ToolboxTabContentProps {
  activeTab: TabsHeaderTypes;
  handleSelectElementType?: (type: ElementTypeEnum) => void;
}

export interface ToolboxItemProps {
  name: keyof typeof Icons;
  size: number;
  text: string;
  isDisabled: boolean;
  isComingSoon?: boolean;
  toolTipText?: string | ReactNode;
  onClick?: () => void;
  childIndex: number;
}
