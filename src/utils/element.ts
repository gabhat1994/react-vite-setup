import { get, merge, map } from 'lodash';
import validator from 'validator';
import * as Sentry from '@sentry/react';
import { type ListOfOptionsTypes } from '@/features/noums/components/Toolbox';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import { type NoumLayoutToolMetaValues } from '@/screens/Chamber/components/ElementWrapper';
import {
  BodyContentEnum,
  type ElementOutput,
  ElementStatusEnum,
  ElementTypeEnum,
  type Maybe,
  type NoumCustomPreviewElementInput,
  type NoumLayoutSection,
  type NoumLayoutColumn,
} from '@/apollo/generated/types';
import { type Icons } from '@/components/Icon/Icon';
import { cleanList } from './list';

const publishableElementTypes: Record<string, boolean> = {
  [ElementTypeEnum.QuickQuestions]: true,
  [ElementTypeEnum.Home]: true,
  [ElementTypeEnum.Image]: true,
  [ElementTypeEnum.Message]: true,
  [ElementTypeEnum.Wallet]: true,
  [ElementTypeEnum.Text]: true,
  [ElementTypeEnum.Video]: true,
  [ElementTypeEnum.EducationTraining]: true,
  [ElementTypeEnum.ProjectWorkExperience]: true,
  [ElementTypeEnum.BusinessBrief]: true,
  [ElementTypeEnum.AchievementAward]: true,
  [ElementTypeEnum.PublicationDesignPatterns]: true,
  [ElementTypeEnum.Skills]: true,
  [ElementTypeEnum.PersonalInterest]: true,
  [ElementTypeEnum.SocialInterest]: true,
  [ElementTypeEnum.Connection]: true,
  [ElementTypeEnum.Calendar]: true,
  [ElementTypeEnum.Userposts]: true,
  [ElementTypeEnum.Usernetwork]: true,
  [ElementTypeEnum.FilesManager]: true,
  [ElementTypeEnum.ContractManager]: true,
};

const publishableMasterElementTypes: Record<string, boolean> = {
  [ElementTypeEnum.QuickQuestions]: false,
  [ElementTypeEnum.Text]: true,
  [ElementTypeEnum.Image]: true,
  [ElementTypeEnum.Video]: true,
  [ElementTypeEnum.Calendar]: true,
  [ElementTypeEnum.BusinessBrief]: true,
  [ElementTypeEnum.ProjectWorkExperience]: true,
  [ElementTypeEnum.EducationTraining]: true,
  [ElementTypeEnum.AchievementAward]: true,
  [ElementTypeEnum.PublicationDesignPatterns]: true,
  [ElementTypeEnum.PersonalInterest]: true,
  [ElementTypeEnum.SocialInterest]: true,
  [ElementTypeEnum.Userposts]: true,
  [ElementTypeEnum.Skills]: true,
};

const defaultMasterElementTypes: Record<string, boolean> = {
  [ElementTypeEnum.Message]: true,
  [ElementTypeEnum.Usernetwork]: true,
  [ElementTypeEnum.Skills]: true,
};

// const publishableRequiredContentElements: Record<string, boolean> = {
//   [ElementTypeEnum.ProjectWorkExperience]: true,
//   [ElementTypeEnum.EducationTraining]: true,
//   [ElementTypeEnum.AchievementAward]: true,
//   [ElementTypeEnum.BusinessBrief]: true,
//   [ElementTypeEnum.PublicationDesignPatterns]: true,
//   [ElementTypeEnum.PersonalInterest]: true,
//   [ElementTypeEnum.SocialInterest]: true,
//   [ElementTypeEnum.Calendar]: false,
// };

const singleElementsForNoum: Record<string, boolean> = {
  [ElementTypeEnum.Message]: true,
  [ElementTypeEnum.QuickQuestions]: true,
  [ElementTypeEnum.Userposts]: true,
  [ElementTypeEnum.Calendar]: true,
  [ElementTypeEnum.Wallet]: true,
  [ElementTypeEnum.BusinessBrief]: true,
  [ElementTypeEnum.ProjectWorkExperience]: true,
  [ElementTypeEnum.EducationTraining]: true,
  [ElementTypeEnum.AchievementAward]: true,
  [ElementTypeEnum.PublicationDesignPatterns]: true,
  [ElementTypeEnum.PersonalInterest]: true,
  [ElementTypeEnum.SocialInterest]: true,
  [ElementTypeEnum.Skills]: true,
  [ElementTypeEnum.Usernetwork]: true,
  [ElementTypeEnum.FilesManager]: true,
  [ElementTypeEnum.ContractManager]: true,
};

type RecordIconValueProps = {
  [key in ElementTypeEnum]?: keyof typeof Icons;
};

const IconByElementType: RecordIconValueProps = {
  [ElementTypeEnum.Text]: 'text_m',
  [ElementTypeEnum.Image]: 'picture_m',
  [ElementTypeEnum.Video]: 'play_m',
  [ElementTypeEnum.Message]: 'message_m',
  [ElementTypeEnum.QuickQuestions]: 'quick_questions_m',
  [ElementTypeEnum.Userposts]: 'posts_m',
  [ElementTypeEnum.Calendar]: 'calendar_m',
  [ElementTypeEnum.Wallet]: 'wallet_m',
  [ElementTypeEnum.BusinessBrief]: 'lecterm_m',
  [ElementTypeEnum.ProjectWorkExperience]: 'briefcase_s',
  [ElementTypeEnum.EducationTraining]: 'education_s',
  [ElementTypeEnum.AchievementAward]: 'avard_s',
  [ElementTypeEnum.PublicationDesignPatterns]: 'blub_s',
  [ElementTypeEnum.PersonalInterest]: 'interest_s',
  [ElementTypeEnum.SocialInterest]: 'heart_s',
  [ElementTypeEnum.Usernetwork]: 'network_m',
  [ElementTypeEnum.FilesManager]: 'file_m',
  [ElementTypeEnum.ContractManager]: 'contract_m',
};

interface Networks {
  behance: string;
  dribbble: string;
  github: string;
  instagram: string;
  linkedin: string;
  medium: string;
  twitter: string;
  www: string;
}

const ElementGetters = {
  getIconName: (element: ElementOutput): keyof typeof Icons | undefined =>
    IconByElementType[element.elementType as ElementTypeEnum] ?? undefined,
  getPosition: (element: ElementOutput, published?: boolean): number => {
    const positionPublished = get(element, 'position');
    if (published) {
      return positionPublished || 0;
    }
    const positionDraft = get(element, 'draft.position');
    const positionUnsaved = get(element, 'unSaved.position');
    return positionUnsaved ?? positionDraft ?? positionPublished ?? 0;
  },

  getSectionPosition: (element: NoumLayoutSection): number => {
    const positionPublished = get(element, 'position');
    return positionPublished ?? 0;
  },

  getCPPosition: (element: ElementOutput): number => {
    const positionPublished = get(element, 'customPreviewPosition');
    const positionCPDraft = get(element, 'draft.customPreviewPosition');

    return positionCPDraft ?? positionPublished ?? 0;
  },
  getBodyContent: (
    element: ElementOutput,
    published?: boolean,
    isRestored?: boolean,
    ignoreUnsaved?: boolean,
  ): string | null => {
    const bodyContentPublished = get(element, 'bodyContent');
    if (published || isRestored) {
      return bodyContentPublished || null;
    }
    const bodyContentDraft = get(element, 'draft.bodyContent');
    const bodyContentUnsaved = ignoreUnsaved
      ? null
      : get(element, 'unSaved.bodyContent');
    return (
      bodyContentUnsaved ?? bodyContentDraft ?? bodyContentPublished ?? null
    );
  },
  getHeaderContent: (
    element: ElementOutput,
    published?: boolean,
    isRestored?: boolean,
  ): string | null => {
    const headerContentPublished = get(element, 'headerContent');
    if (published || isRestored) {
      return headerContentPublished || null;
    }
    const headerContentDraft = get(element, 'draft.headerContent');
    const headerContentUnsaved = get(element, 'unSaved.headerContent');
    return (
      headerContentUnsaved ||
      headerContentDraft ||
      headerContentPublished ||
      null
    );
  },
  getElementAttributeByKey: (
    element: ElementOutput,
    attributeKey: string,
    published?: boolean,
    isRestored?: boolean,
  ): unknown => {
    const attributePublished = get(element, attributeKey);
    if (published || isRestored) {
      return attributePublished || null;
    }
    const attributeDraft = get(element, `draft.${attributeKey}`);
    const attributeUnsaved = get(element, `unSaved.${attributeKey}`);
    return attributeUnsaved || attributeDraft || attributePublished || null;
  },

  getBodyContentHTML: (element: ElementOutput, published?: boolean) => {
    let bodyContent = ElementGetters.getBodyContent(element, published) || '';
    if (bodyContent.startsWith('"') && bodyContent.endsWith('"')) {
      bodyContent = bodyContent.substr(1, bodyContent.length - 2);
    }
    return bodyContent;
  },

  getBodyContentJson: (element: ElementOutput, published?: boolean) => {
    const bodyContentPublished = get(element, 'bodyContentJson');
    if (published) {
      return bodyContentPublished || null;
    }
    const bodyContentDraft = get(element, 'draft.bodyContentJson');
    const bodyContentUnsaved = get(element, 'unSaved.bodyContentJson');
    return (
      bodyContentUnsaved || bodyContentDraft || bodyContentPublished || null
    );
  },

  getBodyContentTypeFromElementType: (
    elementType: ElementTypeEnum,
  ): BodyContentEnum => {
    switch (elementType) {
      case ElementTypeEnum.Text:
        return BodyContentEnum.Text;
      case ElementTypeEnum.Video:
      case ElementTypeEnum.Image:
        return BodyContentEnum.Url;
      default:
        return BodyContentEnum.Text;
    }
  },
  getIsDeleted: (element: ElementOutput, published?: boolean): boolean => {
    const isDeletedPublished = get(element, 'isDeleted');
    if (published) {
      return isDeletedPublished || false;
    }
    const isDeletedDraft = get(element, 'draft.isDeleted');
    const isDeletedUnsaved = get(element, 'unSaved.isDeleted');
    return isDeletedUnsaved || isDeletedDraft || isDeletedPublished || false;
  },
  getPublished: (element: ElementOutput) => {
    const position = ElementGetters.getPosition(element, true);
    const bodyContent = ElementGetters.getBodyContent(element, true);
    const headerContent = ElementGetters.getHeaderContent(element, true);
    const meta = ElementGetters.getElementAttributeByKey(
      element,
      'meta',
      true,
    ) as NoumLayoutToolMetaValues;
    return { position, bodyContent, headerContent, meta };
  },

  getUnpublished: (element: ElementOutput): Partial<ElementOutput> => {
    const position = ElementGetters.getPosition(element);
    const bodyContent = ElementGetters.getBodyContent(element);
    const headerContent = ElementGetters.getHeaderContent(element);
    const meta = ElementGetters.getElementAttributeByKey(
      element,
      'meta',
    ) as NoumLayoutToolMetaValues;
    return { position, bodyContent, headerContent, meta };
  },
  getElementIds: (elements: Maybe<ElementOutput>[] | null = []) =>
    cleanList(elements?.map((element) => element?._id)),
};

const ElementStatus = {
  isDraft: (element: ElementOutput) => {
    const status = get(element, 'status');
    const tempStatus = get(element, 'tempStatus');
    const draft = get(element, 'draft');
    return (
      status === ElementStatusEnum.Draft ||
      tempStatus === ElementStatusEnum.Draft ||
      !!draft
    );
  },
  isUnsaved: (element: ElementOutput) => {
    const tempStatus = get(element, 'tempStatus');
    const unSaved = get(element, 'unSaved');
    return tempStatus === ElementStatusEnum.Unsaved || !!unSaved;
  },
  unSavedCPElements: (
    element: ElementOutput[],
    customPreviewElements: NoumCustomPreviewElementInput[],
  ) => {
    const result = element.map((obj) => {
      const isInclude = customPreviewElements.find(
        (item) => item._id === obj._id,
      );
      return {
        ...obj,
        customPreviewPosition: isInclude?.customPosition,
        isCustomPreviewVisible: isInclude?.isCustomPreviewVisible,
        draft: {
          ...obj.draft,
          customPreviewPosition: isInclude?.customPosition,
          isCustomPreviewVisible: isInclude?.isCustomPreviewVisible,
        },
      };
    });
    return result;
  },
  isEmpty: (element: ElementOutput, published?: boolean) => {
    const isDeleted = ElementGetters.getIsDeleted(element);
    const content = ElementGetters.getBodyContent(element, published);
    if (ElementStatus.isMediaElement(element)) {
      return !validator.isURL(encodeURI(content || ''));
    }
    if (element.elementType === ElementTypeEnum.Text) {
      return !content?.includes('<');
    }
    if (isDeleted) {
      return false;
    }
    return false;
  },
  /* Image or Video element */
  isMediaElement: (element: ElementOutput) =>
    ElementStatus.isVideoElement(element) ||
    ElementStatus.isImageElement(element),
  isImageElement: (element: ElementOutput) =>
    !!element && element.elementType === ElementTypeEnum.Image,
  isVideoElement: (element: ElementOutput) =>
    !!element && element.elementType === ElementTypeEnum.Video,
  isPostsElement: (element?: ElementOutput) =>
    !!element && element.elementType === ElementTypeEnum.Userposts,
  isImageAndVideoNotEmpty: (element: ElementOutput, published?: boolean) => {
    const content = ElementGetters.getBodyContent(element, published);

    if (ElementStatus.isMediaElement(element)) {
      return validator.isURL(encodeURI(content || ''));
    }
    return false;
  },
  isCPVisibilityChangeable: (element: ElementOutput) =>
    !ElementStatus.isCPAdditionalInfoElement(element) &&
    [
      ElementTypeEnum.Text,
      ElementTypeEnum.Video,
      ElementTypeEnum.QuickQuestions,
      ElementTypeEnum.Calendar,
      ElementTypeEnum.Image,
    ].includes(element.elementType as ElementTypeEnum),
  isCustomPreviewEditable: (element: ElementOutput) =>
    ElementStatus.isCPVisibilityChangeable(element) ||
    ElementStatus.isPostsElement(element),
  isCPAdditionalInfoElement: (element: ElementOutput) =>
    element.elementType === ElementTypeEnum.Text &&
    (element.isCustomPreviewAdditionalInfo || false),
};

const ElementSortAndFilter = {
  filterPublished: (element: ElementOutput, isMasterNoum: Boolean = false) =>
    element.status === ElementStatusEnum.Published &&
    !ElementStatus.isEmpty(element) &&
    !ElementStatus.isCPAdditionalInfoElement(element) &&
    (isMasterNoum
      ? publishableMasterElementTypes[element.elementType || ''] ||
        defaultMasterElementTypes[element.elementType || '']
      : publishableElementTypes[element.elementType || '']),
  filterCPPublished: (
    element: ElementOutput,
    selectedCustomPreviewTab: string | undefined,
  ) => {
    if (element.elementType === ElementTypeEnum.Userposts) {
      return true;
    }

    let newElement =
      element.elementType !== ElementTypeEnum.Message &&
      element.elementType !== ElementTypeEnum.Wallet &&
      element.elementType !== ElementTypeEnum.FilesManager &&
      element.elementType !== ElementTypeEnum.ContractManager;

    if (selectedCustomPreviewTab === CustomPreviewTabEnum.Preview) {
      if (ElementStatus.isEmpty(element)) {
        return false;
      }
      newElement =
        newElement &&
        (element.draft
          ? !!element.draft.isCustomPreviewVisible
          : !!element.isCustomPreviewVisible);
    }
    return newElement;
  },
  filterEditing: (element: ElementOutput) =>
    !ElementGetters.getIsDeleted(element) &&
    !ElementStatus.isCPAdditionalInfoElement(element),
  sortPublished: (element1: ElementOutput, element2: ElementOutput) => {
    const position1 = ElementGetters.getPosition(element1, true);
    const position2 = ElementGetters.getPosition(element2, true);
    return position1 - position2;
  },
  sortCPPublished: (element1: ElementOutput, element2: ElementOutput) => {
    const position1 = ElementGetters.getCPPosition(element1);
    const position2 = ElementGetters.getCPPosition(element2);
    if (ElementStatus.isCPAdditionalInfoElement(element1)) return -1;
    if (ElementStatus.isCPAdditionalInfoElement(element2)) return 1;
    return position1 - position2;
  },
  sortUnpublished: (element1: ElementOutput, element2: ElementOutput) => {
    const position1 = ElementGetters.getPosition(element1);
    const position2 = ElementGetters.getPosition(element2);
    return position1 - position2;
  },
  sortSectionUnPublished: (
    element1: NoumLayoutSection,
    element2: NoumLayoutSection,
  ) => {
    const position1 = ElementGetters.getSectionPosition(element1);
    const position2 = ElementGetters.getSectionPosition(element2);
    return position1 - position2;
  },
  filterAndSortCPPublished: (
    elements: ElementOutput[],
    selectedCustomPreviewTab?: string,
  ): ElementOutput[] =>
    elements
      .filter((element) =>
        ElementSortAndFilter.filterCPPublished(
          element,
          selectedCustomPreviewTab,
        ),
      )
      .sort(ElementSortAndFilter.sortCPPublished),
  unSavedfilterAndSortCPPublished: (
    elements: ElementOutput[],
    customPreviewElements: NoumCustomPreviewElementInput[],
    selectedCustomPreviewTab: string | undefined,
  ): ElementOutput[] => {
    const unsaved = ElementStatus.unSavedCPElements(
      elements,
      customPreviewElements,
    );
    const unSavedCP = unsaved
      .filter((element) =>
        ElementSortAndFilter.filterCPPublished(
          element,
          selectedCustomPreviewTab,
        ),
      )
      .sort(ElementSortAndFilter.sortCPPublished);

    return unSavedCP;
  },
  filterAndSortPublished: (
    elements: ElementOutput[],
    isMasterNoum: Boolean = false,
  ): ElementOutput[] =>
    elements
      .filter((element) =>
        ElementSortAndFilter.filterPublished(element, isMasterNoum),
      )
      .sort(ElementSortAndFilter.sortPublished),
  sectionSortUnPublished: (
    sections: NoumLayoutSection[],
  ): NoumLayoutSection[] =>
    sections
      .filter((section) => section.visible)
      .sort(ElementSortAndFilter.sortSectionUnPublished),

  filterAndSortNoumEditor2: (elements: ElementOutput[]): ElementOutput[] =>
    elements
      .filter(ElementSortAndFilter.filterEditing)
      .sort(ElementSortAndFilter.sortPublished),
  filterAndSortUnpublished: (elements: ElementOutput[]): ElementOutput[] =>
    elements
      .filter(ElementSortAndFilter.filterEditing)
      .sort(ElementSortAndFilter.sortUnpublished),
  filterMasterElement: (
    elements: ElementOutput[],
    isMasterNoum: Boolean = false,
  ): ElementOutput[] =>
    elements.filter((element) =>
      isMasterNoum
        ? publishableMasterElementTypes[element.elementType || ''] ||
          defaultMasterElementTypes[element.elementType || '']
        : publishableElementTypes[element.elementType || ''],
    ),
  filterAndsortedPublished: (sections: NoumLayoutSection[]) =>
    sections
      .filter((section) => section.visible)
      .sort(ElementSortAndFilter.sortSectionUnPublished)
      .map((section) => ({
        ...section,
        columns: section.columns.map((col) => ({
          ...col,
          tools: col.tools
            .filter(ElementSortAndFilter.filterEditing)
            .sort(ElementSortAndFilter.sortPublished),
        })),
      })),
};

const ElementNetworks = {
  getNetworks: (
    element: ElementOutput,
    isEditing: boolean,
    isForm?: boolean,
  ) => {
    const body = ElementGetters.getBodyContent(element, !isEditing);
    const defaultValues: Networks = {
      behance: '',
      dribbble: '',
      github: '',
      instagram: '',
      linkedin: '',
      medium: '',
      twitter: '',
      www: '',
    };
    try {
      let json: Networks = JSON.parse(body || '{}');
      if (isEditing) {
        json = merge(defaultValues, json);
      }
      if (isForm) {
        return json;
      }
      let isEmptyValue = true;
      map(json, (value) => {
        if (value) {
          isEmptyValue = false;
        }
      });
      return !isEmptyValue && json;
    } catch (e: unknown) {
      Sentry.captureException(e, {
        tags: {
          section: 'getNetworks',
        },
      });
      if (isForm) {
        return defaultValues;
      }
      return null;
    }
  },

  /** USE CAREFULLY IT REMOVES THE NETWORKS ELEMENT FROM A LIST IF IT CONTAINS NO URLS */
  hideNetworksFromPublishedList: (element: ElementOutput) => {
    if (element.elementType !== ElementTypeEnum.Usernetwork) {
      return true;
    }
    const networks = ElementNetworks.getNetworks(element, false);
    return !!networks;
  },

  convertNetworksToArray: (networks: Networks | boolean | null) => {
    if (!networks || typeof networks === 'boolean') {
      return [];
    }
    return map(networks, (value, key) => {
      if (value) {
        return { key, value };
      }
      return {};
    }).filter((item) => item.value);
  },
};

const ElementChecks = {
  isElementPositionChanged1: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element, index) => ElementGetters.getPosition(element) !== index + 1,
    ),

  isElementPositionChanged2: (
    elements1: Array<ElementOutput>,
    elements2: Array<ElementOutput>,
  ): boolean =>
    !!elements1.find(({ _id }, index) => elements2[index]._id !== _id),

  hasMessageElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.Message,
    ),
  hasWalletElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.Wallet,
    ),
  hasCalendarElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.Calendar,
    ),
  hasQuickQuestionsElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.QuickQuestions,
    ),
  hasPostElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.Userposts,
    ),
  hasFilesManagerElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.FilesManager,
    ),
  hasContractManagerElement: (elements: Array<ElementOutput>): boolean =>
    !!elements.find(
      (element) => element.elementType === ElementTypeEnum.ContractManager,
    ),
  hasCustomPreviewAdditionalInfoElement: (elements: ElementOutput[]): boolean =>
    elements.some((element) =>
      ElementStatus.isCPAdditionalInfoElement(element),
    ),

  isHomeNoumType: (type: string): boolean =>
    type === ElementTypeEnum.PublicationDesignPatterns ||
    type === ElementTypeEnum.EducationTraining ||
    type === ElementTypeEnum.AchievementAward ||
    type === ElementTypeEnum.PersonalInterest ||
    type === ElementTypeEnum.SocialInterest ||
    type === ElementTypeEnum.BusinessBrief ||
    type === ElementTypeEnum.Calendar ||
    type === ElementTypeEnum.ProjectWorkExperience ||
    type === ElementTypeEnum.Skills ||
    type === ElementTypeEnum.Usernetwork,
  isHomeNoumProgressBarType: (type: Maybe<String> | undefined): boolean =>
    type === ElementTypeEnum.EducationTraining ||
    type === ElementTypeEnum.BusinessBrief ||
    type === ElementTypeEnum.ProjectWorkExperience,
  isElementExist: (
    type: string,
    elements: Maybe<ElementOutput>[] = [],
    sections?: NoumLayoutSection[],
  ): boolean =>
    sections
      ? sections.some(
          (section) =>
            section.columns &&
            section.columns.some(
              (column) =>
                column.tools &&
                column.tools.some((tool) => tool.elementType === type) === true,
            ) === true,
        )
      : elements.some((element) => element?.elementType === type),
  isInvalidElement: (element: Maybe<ElementOutput>) => {
    if (
      !element?.elementType ||
      [ElementTypeEnum.Calendar, ElementTypeEnum.Skills].includes(
        element.elementType as ElementTypeEnum,
      )
    ) {
      return false;
    }
    if (element.elementType && !element.unSaved?.isDeleted) {
      // for the business brief
      if (element.elementType === ElementTypeEnum.BusinessBrief) {
        return (
          (element.tempStatus === 'UNSAVED' &&
            !(
              element.unSaved?.bodyContent &&
              element.unSaved?.bodyContent.length &&
              element.unSaved?.bodyContent !== '<p><br></p>'
            )) ||
          (element.tempStatus === 'DRAFT' &&
            !(
              element.draft?.bodyContent &&
              element.draft?.bodyContent.length &&
              element.draft?.bodyContent !== '<p><br></p>'
            ))
        );
      }

      // For all other elements
      return (
        (element.tempStatus === 'UNSAVED' &&
          !(
            element.unSaved?.bodyContentJson &&
            element.unSaved?.bodyContentJson.length
          )) ||
        (element.tempStatus === 'DRAFT' &&
          !(
            element.draft?.bodyContentJson &&
            element.draft?.bodyContentJson.length
          ))
      );
    }

    return false;
  },

  isInvalidTool: (sections: NoumLayoutSection[]) => {
    let invalidTool: ElementOutput[] = [];
    if (sections) {
      sections.forEach((section) =>
        section.columns.forEach((col) => {
          const tool = col.tools.filter(ElementChecks.isInvalidElement);
          if (tool.length) {
            invalidTool = tool;
          }
        }),
      );
    }
    return invalidTool;
  },

  isCustomPreviewVisible: (element: ElementOutput): boolean =>
    !!element &&
    (ElementStatus.isCPAdditionalInfoElement(element) ||
      element.elementType === ElementTypeEnum.Userposts)
      ? true
      : element?.draft
      ? element.draft?.isCustomPreviewVisible || false
      : element?.isCustomPreviewVisible || false,
  nonRemovableTools: (columns: NoumLayoutColumn[]) => {
    let nonRemovableTool: ElementOutput[] = [];
    if (columns) {
      columns.forEach((col) => {
        const tool = col.tools.filter(
          (toolItem) =>
            toolItem.elementType === ElementTypeEnum.Skills ||
            toolItem.elementType === ElementTypeEnum.Usernetwork,
        );
        if (!tool.length) return;
        nonRemovableTool = tool;
      });
    }
    return nonRemovableTool;
  },

  isAvailableToDuplicate: (element: ElementOutput): boolean =>
    ElementStatus.isMediaElement(element) ||
    element?.elementType === ElementTypeEnum.Text,
  isNotAvailableToDelete: (element: ElementOutput): boolean =>
    element?.elementType === ElementTypeEnum.Usernetwork ||
    element?.elementType === ElementTypeEnum.Skills,
};

const ElementMutations = {
  removeProfile: (elements: Array<ElementOutput>): Array<ElementOutput> =>
    elements.filter(({ elementType }) => elementType?.toLowerCase() !== 'home'),
  removeInvitation: (elements: Array<ElementOutput>): Array<ElementOutput> =>
    elements.filter(
      ({ elementType }) => elementType?.toLowerCase() !== 'invitation',
    ),
};

const ToolBoxToolsChecks = {
  isAlreadyAdded: ({
    tool,
    elements,
    sections,
  }: {
    tool: ListOfOptionsTypes;
    elements: Maybe<ElementOutput>[];
    sections?: NoumLayoutSection[];
  }) =>
    singleElementsForNoum[tool.type] &&
    ElementChecks.isElementExist(tool.type, elements, sections),
};

const ToolBoxToolsFilter = {
  filterToolsByNoumType: (
    allTools: ListOfOptionsTypes[],
    type: string,
  ): ListOfOptionsTypes[] =>
    allTools.filter((tool) =>
      tool.allowedNoumTypes.includes(type || 'PROJECT'),
    ),
};

const ToolBoxToolsModifier = {
  addComingSoon: (
    allTools: ListOfOptionsTypes[],
    type: ElementTypeEnum,
    isComingSoon?: boolean,
  ): ListOfOptionsTypes[] => {
    const tools: ListOfOptionsTypes[] = [];
    allTools.forEach((tool) => {
      if (tool.type === type) {
        tools.push({ ...tool, isComingSoon });
      } else {
        tools.push(tool);
      }
    });

    return tools;
  },
};

export const ElementUtils = {
  ...ElementGetters,
  ...ElementStatus,
  ...ElementSortAndFilter,
  ...ElementNetworks,
  ...ElementChecks,
  ...ElementMutations,
  ...ToolBoxToolsFilter,
  ...ToolBoxToolsChecks,
  ...ToolBoxToolsModifier,
};
