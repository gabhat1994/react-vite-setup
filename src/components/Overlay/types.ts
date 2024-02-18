export type OverlayProps = {
  zIndex?: number;
  type: OverlayType;
};

export type OverlayType = 'non-interactive'; // possible to extend the type such as mask, image, etc
