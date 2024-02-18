import { type IconProps } from '../Icon/Icon';

type ListItemIconBackground = 'neutral' | 'transparent';

export interface ListItemIconProps {
  iconName: IconProps['name'];
  backgroundColor?: ListItemIconBackground;
}
