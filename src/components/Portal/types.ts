import { type Property } from 'csstype';
import { type ReactNode } from 'react';

export interface PortalProps {
  children: ReactNode;
  fullHeight?: boolean;
  position?: Property.Position;
}
