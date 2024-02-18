import { isEqual } from 'lodash';

import {
  ElementTypeEnum,
  type ElementOutput,
  type NoumCustomPreviewElementInput,
} from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { ElementUtils } from '@/utils/element';
import { SpaceUtils } from '@/utils/space';

export const CustomPreviewUtils = {
  getCustomPreviewElements: (
    space: SpaceOutputFragment,
  ): NoumCustomPreviewElementInput[] =>
    SpaceUtils.getElements(space)
      ?.filter(
        (element) =>
          element &&
          !ElementUtils.isCPAdditionalInfoElement(element) &&
          (ElementUtils.isMediaElement(element) ||
            element.elementType === ElementTypeEnum.Text ||
            element.elementType === ElementTypeEnum.QuickQuestions ||
            element.elementType === ElementTypeEnum.Calendar ||
            element.elementType === ElementTypeEnum.Userposts),
      )
      .map((element) => {
        const customPreviewPosition = ElementUtils.getCPPosition(element!);
        const isCustomPreviewVisible = ElementUtils.isCustomPreviewVisible(
          element!,
        );
        return {
          _id: element?._id || '',
          customPosition: customPreviewPosition,
          isCustomPreviewVisible:
            element?.elementType === ElementTypeEnum.Userposts
              ? undefined
              : isCustomPreviewVisible,
        };
      }) || [],
  hasUnsavedCustomPreview: (
    space: SpaceOutputFragment,
    elements: ElementOutput[],
  ): boolean => {
    const hasUnsavedCPAdditionalInfo = SpaceUtils.getElements(space).some(
      (element) =>
        ElementUtils.isCPAdditionalInfoElement(element) &&
        ElementUtils.isUnsaved(element),
    );
    if (hasUnsavedCPAdditionalInfo) return true;
    if (!space || elements?.length === 0) return false;
    const customPreviewElements =
      CustomPreviewUtils.getCustomPreviewElements(space);
    const isIdentical = isEqual(customPreviewElements, elements);
    return !isIdentical;
  },
};
