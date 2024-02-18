import { type CSSProperties } from 'react';
import { StyledSkeleton } from '@/components/ChamberBox/SkeletonChamberBox';

interface SizedSkeletonType extends CSSProperties {
  w?: number | string;
  h?: number | string;
  r?: number;
}

export const SizedSkeleton = ({
  w = 128,
  h = 128,
  r = 8,
  maxWidth,
}: SizedSkeletonType) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      maxWidth,
      lineHeight: 'unset',
    }}
  >
    <StyledSkeleton w={w} h={h} r={r} />
  </div>
);

export const SkeletonLoaderAvatar = () => (
  <SizedSkeleton w={128} h={128} r={8} />
);

export const SkeletonLoaderPost = () => <SizedSkeleton w={40} h={40} r={8} />;
export const SkeletonLoaderPostII = () => <SizedSkeleton w={56} h={56} r={8} />;
export const SkeletonLoaderImageInline = () => (
  <SizedSkeleton w={117} h={64} r={8} />
);
