import { Stack } from '@/layout';
import { TSpan } from '@/components';
import { StyledSkeleton } from '@/components/ChamberBox/SkeletonChamberBox';
import { NoumsMemberButton } from '../styles';

type Props = {
  label: string;
  counts: number;
  isClickable: boolean;
  loading: boolean;
  isHidden: boolean;
  onClick?: () => void;
};

const NoumMembersTab = ({
  label,
  counts,
  isClickable,
  loading,
  isHidden,
  onClick,
}: Props) => {
  if (loading) return <StyledSkeleton w={100} h={15} r={8} />;
  if (isHidden) return null;
  return (
    <NoumsMemberButton
      textOnly
      onClick={onClick}
      isHovered={isClickable}
      disabled={!isClickable}
    >
      <Stack gap={4} align="center">
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-default"
        >
          {counts.toLocaleString()}
        </TSpan>
        <TSpan
          font="footnote-bold"
          colorToken="--text-tablecell-header-neutral-default"
        >
          {label}
        </TSpan>
      </Stack>
    </NoumsMemberButton>
  );
};
export default NoumMembersTab;
