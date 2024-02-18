import { type CSSProperties } from 'styled-components';
import { type Property } from 'csstype';
import { type Icons } from '../Icon/Icon';

export interface InputListTypes<TabId extends string = string> {
  name: string;
  image?: keyof typeof Icons;
  text: string | React.ReactElement;
  labelSize: 'small' | 'medium' | 'large' | 'auto';
  id?: TabId;
  showDot?: boolean;
  dotColor?: string;
}

type TabsFormMode = 'isBackground' | 'isUnderline' | 'isActiveBackgroundOnly';

export type TabsFormProps<TabId extends string = string> = {
  inputList: InputListTypes<TabId>[];
  onChange: (val: TabId) => void;
  selectedId: TabId;
  mode?: TabsFormMode;
  isWithoutImage?: boolean;
  iconSize?: number;
  fontSize?: string;
  fullWidth?: boolean;
  tabWidth?: string;
  tabCSS?: CSSProperties;
  animateOnLoad?: boolean;
  isMobile?: boolean;
  windowSize?: number;
  manualScroll?: boolean;
  textFont?: string;
  maxHeight?: Property.MaxHeight;
  justifyContent?: Property.JustifyContent;
  gap?: number;
};
