import {
  type ElementTypeEnum,
  type ElementOutput,
  type NoumLayoutSection,
} from '@/apollo/generated/types';
import { getFilteredEmptyTools } from '../ViewChamber/noumViewHelper';
import { CPVisiblityChangeButtonTooltips } from './constants';

export const filteredSections = (
  sections: NoumLayoutSection[],
  eventsCount: number,
  totalQuestionCount: number,
) =>
  sections.map((section) => ({
    ...section,
    columns: getFilteredEmptyTools(section, eventsCount, totalQuestionCount),
  }));

export const getVisiblityChangeButtonTooltip = (element?: ElementOutput) =>
  !!element && element.elementType
    ? CPVisiblityChangeButtonTooltips[element.elementType as ElementTypeEnum]
    : undefined;
