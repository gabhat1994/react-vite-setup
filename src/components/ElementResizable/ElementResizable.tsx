import { Resizable, type ResizableProps } from 're-resizable';
import { memo } from 'react';

type ElementResizableProps = ResizableProps & {
  children: React.ReactNode;
  disable?: boolean;
  percentSize?: number;
};

const handleStylesCommon: React.CSSProperties = {
  background: `var(--bg-body-neutral-alt-highlighted)`,
  border: `1px solid var(--border-input-brand-primary-default)`,
  width: '12px',
  height: '12px',
};

const handleStylesBottomRight: React.CSSProperties = {
  ...handleStylesCommon,
  bottom: 0,
  right: 0,
};

const handleStylesTopRight: React.CSSProperties = {
  ...handleStylesCommon,
  top: 0,
  right: 0,
};

const handleStylesTopLeft: React.CSSProperties = {
  ...handleStylesCommon,
  top: 0,
  left: 0,
};

const handleStylesBottomLeft: React.CSSProperties = {
  ...handleStylesCommon,
  bottom: 0,
  left: 0,
};

const ElementResizable = memo(
  ({
    children,
    disable,
    percentSize = 30,
    ...props
  }: ElementResizableProps) => (
    <Resizable
      {...props}
      defaultSize={{
        width: percentSize ? `${percentSize}%` : 'auto',
        height: '100%',
      }}
      size={{ width: `${percentSize}%`, height: '100%' }}
      lockAspectRatio={true}
      minWidth="10%"
      maxWidth="100%"
      enable={{
        topRight: !disable,
        bottomRight: !disable,
        bottomLeft: !disable,
        topLeft: !disable,
      }}
      handleStyles={
        disable
          ? undefined
          : {
              topRight: handleStylesTopRight,
              bottomRight: handleStylesBottomRight,
              bottomLeft: handleStylesBottomLeft,
              topLeft: handleStylesTopLeft,
            }
      }
    >
      {children}
    </Resizable>
  ),
);

export default ElementResizable;
