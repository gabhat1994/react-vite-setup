import styled, { css } from 'styled-components';
import { Card } from '@/components/Card';
import {
  NoumLayoutSectionType,
  NoumLayoutSectionVerticalAlignType,
} from '@/apollo/generated/types';
import { mediaSizes } from '@/constants/devices';

export const NoumSectionContainer = styled(Card)<{
  isBackground?: boolean;
  height?: number;
  isEmptySection?: boolean;
  isEdit?: boolean;
}>`
  overflow: visible;
  width: 100%;
  transition: all 0.1s ease-in-out;
  padding: ${({ isEdit, isEmptySection, isBackground }) =>
    isEdit
      ? isEmptySection && !isBackground
        ? '0'
        : '16px'
      : !isBackground
      ? '0px'
      : '16px'};
  ${({ isBackground }) => !isBackground && 'background: none'};
  height: ${({ height }) => (height ? `${height}px` : 'unset')};
  ${({ isEdit }) =>
    !isEdit &&
    css`
      display: none;
      &:has(.element-visibility) {
        display: block;
      }
    `}

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding: 16px 0;
  }
`;

const getTemplateColumns = (noumSectionType?: NoumLayoutSectionType) => {
  switch (noumSectionType) {
    case NoumLayoutSectionType.TwoColumnsRightWider:
      return '64.5% max(34.5%)';
    case NoumLayoutSectionType.TwoColumnsLeftWider:
      return 'max(34.5%) 64.5%';
    case NoumLayoutSectionType.TwoEqualColumns:
      return 'minmax(0, 1fr) minmax(0, 1fr)';
    case NoumLayoutSectionType.ThreeEqualColumns:
      return 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)';
    case NoumLayoutSectionType.SingleColumn_700Px:
      return '700px';
    default:
      return 'minmax(auto, 100%)';
  }
};

export const NoumSectionLayout = styled.div<{
  noumSectionType?: NoumLayoutSectionType;
  isSmallerThanLaptop: boolean;
  sectionAlign?: NoumLayoutSectionVerticalAlignType;
}>`
  box-sizing: border-box;
  display: grid;
  transition: all 0.1s ease-in-out;
  width: 100%;
  align-items: ${({ sectionAlign }) =>
    sectionAlign === NoumLayoutSectionVerticalAlignType.Top
      ? 'flex-start'
      : sectionAlign === NoumLayoutSectionVerticalAlignType.Bottom
      ? 'flex-end'
      : 'center'};
  justify-content: center;
  grid-gap: 16px;
  grid-template-columns: ${({ noumSectionType, isSmallerThanLaptop }) =>
    isSmallerThanLaptop ? '1fr' : getTemplateColumns(noumSectionType)};
  grid-template-rows: auto;
  grid-template-areas: 'body';

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: block;
  }
`;
