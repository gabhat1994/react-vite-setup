import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import generate from 'uniqid';
import {
  SkeletonContainer,
  FooterSkeleton,
  SkeletonItem,
  ItemSkeletonWrapper,
  RightSkeletonWrapper,
  ButtonSkeletonWrapper,
} from './styles';

export const InvitedByMeSkeleton = () => (
  <SkeletonContainer data-testid="invited-by-me-skeleton">
    <SkeletonTheme borderRadius={8}>
      <Skeleton width={143} />

      {Array.from({ length: 3 }).map(() => (
        <SkeletonItem key={generate()} data-testid="skeleton_item">
          <ItemSkeletonWrapper>
            <Skeleton width={40} height={40} />
            <RightSkeletonWrapper>
              <Skeleton width={140} />
              <Skeleton width={198} />
            </RightSkeletonWrapper>
          </ItemSkeletonWrapper>
          <ItemSkeletonWrapper>
            <ButtonSkeletonWrapper>
              <Skeleton height={40} />
            </ButtonSkeletonWrapper>
            <ButtonSkeletonWrapper>
              <Skeleton height={40} />
            </ButtonSkeletonWrapper>
          </ItemSkeletonWrapper>
        </SkeletonItem>
      ))}

      <FooterSkeleton>
        <Skeleton width={214} />
      </FooterSkeleton>
    </SkeletonTheme>
  </SkeletonContainer>
);
