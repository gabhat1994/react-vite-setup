import { type FC } from 'react';
import { type NoumLayoutSectionType } from '@/apollo/generated/types';
import { SectionLayoutItem } from '../SectionLayoutItem';
import { columnsLayout } from '../constants';
import { type EmptySectionsProps } from '../types';

export const EmptySections: FC<EmptySectionsProps> = ({
  handleSelectSectionType,
}) => (
  <>
    {columnsLayout.map((layout) => (
      <SectionLayoutItem
        layoutSectionType={layout.layoutSectionType as NoumLayoutSectionType}
        handleSelectSectionType={handleSelectSectionType}
        key={`section-layout-item-${layout.layoutSectionType}`}
        columnsArray={layout.column}
      />
    ))}
  </>
);
