import Skeleton from 'react-loading-skeleton';
import { Spacer } from '@/layout';
import { Underline } from '@/components/ChamberBox/styles';

export const StyledSkeleton = ({
  w,
  h,
  r,
}: {
  w: number | string;
  h: number | string;
  r?: number;
}) => (
  <Skeleton
    width={w}
    height={h}
    style={{
      borderRadius: r,
      maxWidth: '100%',
      lineHeight: 'unset !important',
    }}
  />
);

const SkeletonChamberBox = () => (
  <>
    <StyledSkeleton w={168} h={24} r={10} />
    <StyledSkeleton w={152} h={14} r={24} />
    <Spacer height={24} />
    <Underline />
    <StyledSkeleton w={94} h={16} r={10} />
  </>
);

export default SkeletonChamberBox;
