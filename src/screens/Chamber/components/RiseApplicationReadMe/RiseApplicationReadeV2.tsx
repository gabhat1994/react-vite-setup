import {
  NoumLayoutSectionType,
  NoumLayoutSectionVerticalAlignType,
} from '@/apollo/generated/types';
import { useBreakpoints } from '@/hooks';
import { memo } from 'react';
import NoumViewElement from '../../ViewChamber/NoumViewElement';
import {
  NoumSectionContainer,
  NoumSectionLayout,
} from '../NoumSections/Styles';
import { ColumnContainer } from '../SectionElementRearrange/styles';
import { RiseAboutMeSectionData } from './constant';

export const RiseApplicationReadMeV2 = memo(() => {
  const { isSmallerThanLaptop } = useBreakpoints();
  return (
    <NoumSectionContainer isBackground={true}>
      <NoumSectionLayout
        isSmallerThanLaptop={isSmallerThanLaptop}
        noumSectionType={NoumLayoutSectionType.SingleColumn_700Px}
        sectionAlign={NoumLayoutSectionVerticalAlignType.Center}
      >
        <ColumnContainer
          data-testid="noum-section-column"
          gap={12}
          vertical
          isBackground={true}
        >
          <NoumViewElement
            tools={[RiseAboutMeSectionData]}
            isCompleteLoading={true}
            elementId={null}
          />
        </ColumnContainer>
      </NoumSectionLayout>
    </NoumSectionContainer>
  );
});
