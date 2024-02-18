import { type RefObject } from 'react';
import { DEFAULT_LARGE_ZOOM, DEFAULT_ZOOM_STEP } from './constants';

export const getXYTouch = (e: React.TouchEvent) => {
  let x = 0;
  let y = 0;
  if (e.touches && e.touches.length) {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  }
  return { x, y };
};

export const getXYGeneric = (e: React.MouseEvent) => ({
  x: e.pageX,
  y: e.pageY,
});

const defaultBoundingRect = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

export const getCoordinatesOnDoubleClick = (
  e: React.MouseEvent,
  containerRef: RefObject<HTMLDivElement>,
) => {
  const zoomStep = DEFAULT_ZOOM_STEP;
  const doubleClickZoom = DEFAULT_LARGE_ZOOM;
  const xy = getXYGeneric(e);

  const z =
    (zoomStep < 1 ? Math.ceil(doubleClickZoom / zoomStep) : zoomStep) *
    zoomStep;

  const cbr =
    containerRef.current?.getBoundingClientRect?.() || defaultBoundingRect();

  const ccx = cbr.x + cbr.width / 2;
  const ccy = cbr.y + cbr.height / 2;
  const modifiedX = (xy.x - ccx) * -1 * z;
  const modifiedY = (xy.y - ccy) * -1 * z;

  return {
    x: modifiedX,
    y: modifiedY,
    z,
  };
};
