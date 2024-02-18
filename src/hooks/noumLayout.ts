import { get } from 'lodash';
import { type NoumLayoutSection } from '@/apollo/generated/types';
import { ElementUtils } from '@/utils/element';

const getSectionPosition = (
  section: NoumLayoutSection,
  published?: boolean,
): number => {
  const positionPublished = get(section, 'position');
  if (published) {
    return positionPublished || 0;
  }
  const positionDraft = get(section, 'draft.position');
  const positionUnsaved = get(section, 'unSaved.position');
  return positionUnsaved ?? positionDraft ?? positionPublished ?? 0;
};

const sortSection = (
  section1: NoumLayoutSection,
  section2: NoumLayoutSection,
  published?: boolean,
) => {
  const position1 = getSectionPosition(section1, published);
  const position2 = getSectionPosition(section2, published);
  return position1 - position2;
};

const filterAndSortedPublished = (sections: NoumLayoutSection[]) =>
  sections
    .filter(
      (section) =>
        section.visible && hasCustomPreviewAdditionalInfoElement(section),
    )
    .sort((a, b) => sortSection(a, b, true))
    .map((section) => ({
      ...section,
      columns: section.columns.map((col) => ({
        ...col,
        tools: col.tools
          .filter(ElementUtils.filterEditing)
          .sort(ElementUtils.sortPublished),
      })),
    }));

const hasCustomPreviewAdditionalInfoElement = (
  section: NoumLayoutSection,
): boolean =>
  section.columns.some((column) =>
    ElementUtils.hasCustomPreviewAdditionalInfoElement(column.tools),
  );

export const NoumLayoutUtils = {
  hasCustomPreviewAdditionalInfoElement,
  filterAndSortedPublished,
};
