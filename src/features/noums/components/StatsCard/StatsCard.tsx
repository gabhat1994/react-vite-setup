import { Tag } from '@/components';
import { SizedSkeleton } from '@/components/SkeletonLoader';
import React from 'react';
import S from './styles';

type StatsCardProps = {
  label: string;
  value: string | number | undefined;
  loading: boolean;
};
export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  loading,
}) => (
  <S.Container>
    <>
      {loading ? (
        <>
          <SizedSkeleton w="125px" h={30} />
          <SizedSkeleton w="35px" h={30} />
        </>
      ) : (
        <>
          <Tag tertiary size="small" contentFont="footnote-bold">
            {label}
          </Tag>
          <S.ValueText>{value}</S.ValueText>
        </>
      )}
    </>
  </S.Container>
);
