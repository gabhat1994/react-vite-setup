import styled, { css } from 'styled-components';
import { Card } from '@/components/Card';
import {
  bodyTypography,
  headingTypography,
  badgeCountTypography,
  systemInfoSmallTypography,
} from '@/components/Typography';
import { mediaSizesForNoumLayout, sizes } from '@/constants/devices';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Stack } from '@/layout';
import { StyledFlexRow } from '../elements/SkeletonLoader/styled';

export const ProfileSummaryLocation = styled.span`
  display: block;
  ${bodyTypography.bodyMediumBold}
  color: var(--text-card-neutral-default);
`;

export const StyledCard = styled(Card)`
  padding: 24px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 16px;
    border-radius: 0px;
  }
`;

export const ProfileSummaryDataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 60%;
  position: relative;
`;

export const FavouriteIcon = styled(Icon)<{ isMobile?: boolean }>`
  ${({ isMobile }) => isMobile && `margin-top: 10px;`}
  ${({ isMobile }) => !isMobile && `position: absolute;`}
  ${({ isMobile }) => !isMobile && `top: 0px;`}
  ${({ isMobile }) => !isMobile && `right: 0px;`}
`;

export const ProfileSummaryName = styled.span<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  color: var(--text-card-header-neutral-highlighted);
  ${headingTypography.headingMediumBold};
  ${({ disabled }) =>
    disabled &&
    `color: var(--text-card-header-neutral-default);
    `}
  word-break: break-word;
`;

export const NoumHeaderAdditionalDetails = styled.div<{ isEdit?: boolean }>`
  display: flex;
  gap: 8px;
  @media (max-width: ${mediaSizesForNoumLayout.LAPTOP_S_MIN}) {
    ${({ isEdit }) =>
      isEdit &&
      `gap: 3px
    `};
  }
`;

export const NoumEditorHead = styled.span<{ isCoverPhoto?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: end;
  ${({ isCoverPhoto }) => isCoverPhoto && 'margin-top: -15px;'};
  gap: 24px;
  color: var(--text-card-header-neutral-default);
  ${bodyTypography.bodyMedium}
  @media (max-width: ${sizes.TABLET_L}) {
    ${({ isCoverPhoto }) => !isCoverPhoto && 'padding: 16px;'};
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }
`;

export const NoumEditorEdit = styled.div`
  flex-grow: 1;
  align-self: end;
  vertical-align: top;
  display: flex;
  justify-content: end;
`;

export const ProfilePictureHeader = styled.div<{ isCoverPhoto?: boolean }>`
  width: 128px;
  ${({ isCoverPhoto }) => isCoverPhoto && 'margin-left: 16px;'};
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 80px;
  }
`;

export const NoumsMemberButton = styled(Button)<{ isHovered?: boolean }>`
  cursor: default;
  ${({ isHovered }) =>
    isHovered &&
    css`
      cursor: pointer;
      &:hover * {
        color: var(--text-button-neutral-pressed);
      }
    `}
`;

export const FavWrapper = styled.div`
  .favrouites {
    position: relative;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    position: absolute;
    top: -17px;
    right: 10px;
  }
`;

export const NoumEditorStyledCard = styled(Card)`
  padding: 24px;
  @media (max-width: ${sizes.TABLET}) {
    padding: 0px 0px 16px 0px;
    border-radius: 0px;
  }
`;

export const TagWrapper = styled(Stack)`
  color: var(--text-badge-neutral-default);
  background: var(--bg-badge-neutral-default);
  border-radius: 8px;
  border-color: var(--border-badge-neutral-default);
  cursor: pointer;
`;

export const TagInComplete = styled.div`
  color: var(--text-card-neutral-alt-default);
  background: var(--color-base-solid-orange);
  border-color: var(--border-badge-neutral-default);
  border-radius: 8px;
  width: max-content;
  padding: 2px 6px;
  ${badgeCountTypography.badgeCount}
`;

export const InCompleteIconContainer = styled.div`
  background: var(--bg-badge-danger-warning-primary);
  border-color: var(--border-badge-neutral-default);
  border-radius: 50%;
  width: max-content;
  padding: 2px;
`;

export const TooltipWrapper = styled.div<{ isLeft?: boolean }>`
  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    top: -28px;
    left: ${({ isLeft }) => (isLeft ? '90px' : '-10px')};
    ${systemInfoSmallTypography.systemInfoSmall}
  }
`;

export const InfoStackWrapper = styled.div<{ isSummaryDescription?: boolean }>`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  @media (max-width: ${sizes.TABLET}) {
    ${({ isSummaryDescription }) => isSummaryDescription && 'padding: 0 16px'};
  }
  ${StyledFlexRow}
`;

export const OwnedWrapper = styled.div`
  display: flex;
  gap: 4px;
  color: var(--text-card-neutral-default);
`;
