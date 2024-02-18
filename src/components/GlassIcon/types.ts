import { type GlassIconName } from '@/assets/glass-icons';

export type { GlassIconName } from '@/assets/glass-icons';

export type AnimatedGlassIconState = 'default' | 'hover' | 'active';

export interface AnimatedGlassIconProps {
  name: GlassIconName;
  size: number;
  rotate?: boolean;
}
