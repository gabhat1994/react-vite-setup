import { type CSSProperties } from 'react';
import Skeleton from 'react-loading-skeleton';

interface SizedSkeletonProps {
  w?: number | string;
  h?: number | string;
  r?: number;
  maxWidth?: CSSProperties['maxWidth'];
}

export function SizedSkeleton({
  w = 128,
  h = 128,
  r = 8,
  maxWidth,
}: SizedSkeletonProps) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: r,
        maxWidth,
        lineHeight: 'unset',
      }}
    >
      <Skeleton
        width={w}
        height={h}
        style={{
          borderRadius: r,
          maxWidth: '100%',
          lineHeight: 'unset !important',
        }}
      />
    </div>
  );
}
