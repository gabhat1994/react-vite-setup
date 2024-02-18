import { createPortal } from 'react-dom';
import { type ReactPortal, useRef } from 'react';
import PortalContainer from './styles';
import { type PortalProps } from './types';

const root = document.createElement('div');
root.className = 'modal-root';
document.body.append(root);

export function Portal({
  children,
  fullHeight,
  position = 'absolute',
}: PortalProps): ReactPortal | null {
  const renderedChildrenOnce = useRef(false);

  if (children) {
    renderedChildrenOnce.current = true;
  }

  return renderedChildrenOnce.current
    ? createPortal(
        <PortalContainer fullHeight={fullHeight} position={position}>
          {children}
        </PortalContainer>,
        root,
      )
    : null;
}

export default Portal;
