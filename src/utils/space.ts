import ChamberDefaultImag from '@/assets/images/chamber_default.png';
import { cloneDeep, compact, get, max } from 'lodash';

import { type SpaceOutputFragment } from '@/apollo/graphql';
import {
  ElementStatusEnum,
  ElementTypeEnum,
  type Maybe,
  type NetworkOutput,
  type NoumLayoutSection,
  type SpaceConnection,
  type SpaceProfileValue,
  SpaceStatusEnum,
  type ElementOutput,
  type NoumLayoutColumn,
  NoumLayoutStatus,
  SpaceTypeEnum,
  type NoumLayout,
  type NoumCustomPreviewElementInput,
  NoumLayoutSectionType,
  NoumLayoutSectionVerticalAlignType,
  ProjectChamberType,
} from '@/apollo/generated/types';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import { type IncompletedItemProps } from '@/screens/HomeNoum/types';
import { ElementUtils } from './element';
import { getFullName } from './fullName';
import { UserUtil } from './user';
import { cleanList } from './list';

const NOUM_CATEGORY_NAME = {
  RISE_APPLICATION: 'Rise_Application',
  RISE: 'Rise',
};

export const SpaceUtils = {
  filterPublished: (space: SpaceOutputFragment) =>
    space.status === SpaceStatusEnum.Published,
  getSpace: (
    spaces: Maybe<SpaceOutputFragment[]>,
    id: string,
    published?: boolean,
  ): SpaceOutputFragment | undefined => {
    const clean = spaces || [];
    const space = clean.find(
      (item) =>
        item._id === id &&
        (!published || item.status === SpaceStatusEnum.Published),
    );
    return space;
  },
  isMasterNoum: (spaceData?: Maybe<SpaceOutputFragment>) =>
    spaceData?.type === SpaceTypeEnum.Home,
  getSpaceTitle: (spaceData?: Maybe<SpaceOutputFragment>) =>
    SpaceUtils.isMasterNoum(spaceData)
      ? getFullName(spaceData?.uid?.firstName, '', spaceData?.uid?.lastName)
      : spaceData?.name || '',
  isRiseApplicatonCategory: (spaceData?: Maybe<SpaceOutputFragment>) =>
    !!spaceData &&
    spaceData?.category?.name === NOUM_CATEGORY_NAME.RISE_APPLICATION,
  isRiseNoum: (spaceData?: SpaceOutputFragment) =>
    spaceData?.category?.name === NOUM_CATEGORY_NAME.RISE,
  getSpaceProfileImage: (spaceData?: Maybe<SpaceOutputFragment>) =>
    SpaceUtils.isMasterNoum(spaceData)
      ? UserUtil.getProfilePicture(spaceData?.uid)
      : spaceData?.profileImage || '',
  getSpaceElements: (
    spaces: Maybe<SpaceOutputFragment[]>,
    id: string,
    published?: boolean,
  ) => {
    const space = SpaceUtils.getSpace(spaces, id, published);
    return cloneDeep(space?.elements || []);
  },
  getHomeSpace: (
    spaces: Maybe<SpaceOutputFragment[]>,
  ): SpaceOutputFragment | undefined => get(spaces, '0') || undefined,
  getHomeSpaceElements: (spaces: Maybe<SpaceOutputFragment[]>) => {
    const space = SpaceUtils.getHomeSpace(spaces);
    return cloneDeep(space?.elements || []) as ElementOutput[];
  },
  getHomeSpaceNetworks: (spaces: Maybe<SpaceOutputFragment[]>) => {
    const space = SpaceUtils.getHomeSpace(spaces);
    return cloneDeep(space?.networks || []) as NetworkOutput[];
  },
  getElementInSpaceByType: (
    space: SpaceOutputFragment | undefined,
    elementType: ElementTypeEnum,
  ) => {
    const elements = SpaceUtils.getElements(space);
    const filteredElements = elements.filter((e) => {
      if (e.elementType === elementType) {
        if (e.draft && e.draft.isDeleted) {
          return false;
        }
        if (e.unSaved && e.unSaved.isDeleted) {
          return false;
        }
        return true;
      }
      return false;
    });
    return filteredElements.length > 0 ? filteredElements[0] : {};
  },
  getHomeSpaceUserNetworks: (spaces: Maybe<SpaceOutputFragment[]>) => {
    const elements = SpaceUtils.getHomeSpaceElements(spaces);
    const filteredElements = elements.filter((e) => {
      if (e.elementType === ElementTypeEnum.Usernetwork) {
        if (e.draft && e.draft.isDeleted) {
          return false;
        }
        if (e.unSaved && e.unSaved.isDeleted) {
          return false;
        }
        return true;
      }
      return false;
    });
    return filteredElements.length > 0;
  },
  getHomeSpaceUserPosts: (spaces: Maybe<SpaceOutputFragment[]>) => {
    const elements = SpaceUtils.getHomeSpaceElements(spaces);
    const filteredElements = elements.filter((e) => {
      if (e.elementType === ElementTypeEnum.Userposts) {
        if (e.draft && e.draft.isDeleted) {
          return false;
        }
        if (e.unSaved && e.unSaved.isDeleted) {
          return false;
        }
        return true;
      }
      return false;
    });
    return filteredElements.length > 0;
  },
  getHomeSpaceInstagram: (spaces: Maybe<SpaceOutputFragment[]>) => {
    const elements = SpaceUtils.getHomeSpaceElements(spaces);
    const filteredElements = elements.filter((e) => {
      if (e.elementType === ElementTypeEnum.Instagram) {
        if (e.draft && e.draft.isDeleted) {
          return false;
        }
        if (e.unSaved && e.unSaved.isDeleted) {
          return false;
        }
        return true;
      }
      return false;
    });
    return filteredElements.length > 0;
  },
  getMaxPosition: (space: SpaceOutputFragment, published?: boolean): number => {
    const positions = SpaceUtils.getElements(space)?.map((element) =>
      published
        ? element?.position || 0
        : element?.unSaved?.position ||
          element?.draft?.position ||
          element?.position ||
          0,
    );
    return max(positions) || 0;
  },

  getProfileDetails: (space: SpaceOutputFragment | undefined) => ({
    name: space?.name || '',
    bio: (() => {
      if (space?.unSaved) {
        return space?.unSaved?.description || '';
      }
      if (space?.draft) {
        return space?.draft?.description || '';
      }
      return space?.description || '';
    })(),
    imageURL: (() => {
      if (space?.unSaved) {
        return space?.unSaved?.profileImage || ChamberDefaultImag;
      }
      if (space?.draft) {
        return space?.draft?.profileImage || ChamberDefaultImag;
      }
      return space?.profileImage || ChamberDefaultImag;
    })(),
  }),
  getProgressBarItems: (
    space: SpaceOutputFragment | undefined,
    spaceConfig: (SpaceProfileValue | null)[] | undefined,
  ): IncompletedItemProps[] => {
    /* This will filter the items from space config, which need to be shown on the progress bar
       1. space elements, space config elements need to be compare
       2. if the space element id and config element id equals and
       the space element's percentcompleted is lessthan 100% then show the space config element in progress bar
       Or
       if the space config element is not even present in the space elements then also show space config element in progress bar
    */
    const configItems = spaceConfig?.map((configItem) => {
      /* AboutMe is calculated by individual values for user profile */
      if (configItem?.id === ElementTypeEnum.Profile) {
        if (UserUtil.isCompletedAboutMe(space?.uid)) return undefined;
      } else {
        const configItemElementType = configItem?.id as ElementTypeEnum;
        const existingElement = SpaceUtils.getElementInSpaceByType(
          space,
          configItemElementType,
        );
        if (existingElement._id) {
          if (existingElement.percentCompleted === 100) return undefined;
          const elementStatus = ElementUtils.getElementAttributeByKey(
            existingElement,
            'status',
          ) as ElementStatusEnum;
          if (elementStatus && elementStatus !== ElementStatusEnum.Published)
            return {
              ...configItem,
              status: elementStatus,
            };
        } else {
          const usedElementTypes = SpaceUtils.getExistingElementTypes(space);
          if (usedElementTypes.includes(configItemElementType)) {
            return undefined;
          }
        }
      }
      return configItem;
    });

    return cleanList(configItems);
  },
  getElements: (space: SpaceOutputFragment | undefined): ElementOutput[] =>
    space?.elements && space.elements.length > 0
      ? compact(cloneDeep(space?.elements) || [])
      : space?.layout
      ? SpaceUtils.getTools(space)
      : [],
  getTools: (space: SpaceOutputFragment | undefined): ElementOutput[] => {
    const individualTools: ElementOutput[] = [];
    if (space?.layout?.sections) {
      space.layout.sections.forEach((section) => {
        section.columns.forEach((column) => {
          column.tools.forEach((tool) => {
            individualTools.push(tool);
          });
        });
      });
    }
    return individualTools;
  },
  getCustomPreviewLayoutV2: (
    space: SpaceOutputFragment | undefined,
    customPreviewElements: NoumCustomPreviewElementInput[],
    cpType: CustomPreviewTabEnum,
  ): NoumLayout => ({
    _id: 'cp_layout_id',
    hasRedoAction: false,
    hasUndoAction: false,
    status: NoumLayoutStatus.Published,
    uniqueToolStatuses: [],
    sections: [
      {
        _id: 'cp_section_id',
        type: NoumLayoutSectionType.SingleColumn_700Px,
        background: true,
        position: 1,
        columns: [
          {
            _id: 'cp_column_id',
            position: 1,
            background: true,
            tools:
              cpType === CustomPreviewTabEnum.Edit
                ? ElementUtils.unSavedfilterAndSortCPPublished(
                    SpaceUtils.getElements(space),
                    customPreviewElements,
                    cpType,
                  )
                : ElementUtils.filterAndSortCPPublished(
                    SpaceUtils.getElements(space),
                    cpType,
                  ),
          },
        ],
        columnsVerticalAlignType: NoumLayoutSectionVerticalAlignType.Bottom,
        visible: false,
      },
    ],
  }),
  getSections: (space: SpaceOutputFragment | undefined): NoumLayoutSection[] =>
    compact(cloneDeep(space?.layout?.sections) || []),
  getNoumLayoutColumns: (
    section: NoumLayoutSection | undefined,
  ): NoumLayoutColumn[] => compact(cloneDeep(section?.columns) || []),
  getNoumLayoutTools: (column: NoumLayoutColumn | undefined): ElementOutput[] =>
    compact(cloneDeep(column?.tools) || []),
  hasDraftElement: (space: SpaceOutputFragment | undefined): boolean =>
    SpaceUtils.getElements(space).some((element) =>
      ElementUtils.isDraft(element),
    ),
  hasDraftSetting: (space: SpaceOutputFragment | undefined): boolean => {
    const tempStatus = get(space, 'tempStatus');
    const draft = get(space, 'draft');
    return tempStatus === ElementStatusEnum.Draft || !!draft;
  },
  hasUnsavedNoumLayoutColumn: (section: NoumLayoutSection) =>
    SpaceUtils.getNoumLayoutColumns(section).some((column) =>
      SpaceUtils.hasUnsavedElementTool(column),
    ),
  hasUnsavedElementTool: (column: NoumLayoutColumn) =>
    SpaceUtils.getNoumLayoutTools(column).some(
      (elementTool) =>
        ElementUtils.isUnsaved(elementTool) &&
        !ElementUtils.isCPAdditionalInfoElement(elementTool),
    ),
  hasUnsavedElement: (space: SpaceOutputFragment | undefined): boolean =>
    space?.layout?.status === NoumLayoutStatus.Unsaved ||
    SpaceUtils.getSections(space).some((section) =>
      SpaceUtils.hasUnsavedNoumLayoutColumn(section),
    ),
  hasUnsavedPermission: (connections: SpaceConnection[]): boolean =>
    connections.some((connection) => Boolean(connection.draft?.permission)),
  hasUnsavedSetting: (space: SpaceOutputFragment | undefined): boolean => {
    const tempStatus = get(space, 'tempStatus');
    const unSaved = get(space, 'unSaved');
    let isUnSaved = !!unSaved;
    if (unSaved) {
      const unSavedProperties = Object.values(unSaved!);
      unSavedProperties?.shift();
      isUnSaved = unSavedProperties?.some((property) => property !== null);
    }
    return tempStatus === ElementStatusEnum.Unsaved || isUnSaved;
  },
  getAppliedTheme: (
    space: SpaceOutputFragment | undefined,
    published?: boolean,
  ) => {
    const publishedTheme = get(space, 'theme');
    if (published) {
      return publishedTheme?._id || '';
    }
    const draftedThemeId = get(space, 'draft.theme._id');
    const unSavedThemeId = get(space, 'unSaved.theme._id');
    return unSavedThemeId || draftedThemeId || publishedTheme?._id;
  },
  getAppliedFont: (
    space: SpaceOutputFragment | undefined,
    published?: boolean,
  ) => {
    const publishedFonts = get(space, 'fonts');
    if (published) {
      return publishedFonts || null;
    }
    const draftedFonts = get(space, 'draft.fonts');
    const unSavedFonts = get(space, 'unSaved.fonts');
    return unSavedFonts || draftedFonts || publishedFonts || null;
  },
  hasPublishedElement: (space: SpaceOutputFragment | undefined): boolean =>
    SpaceUtils.getElements(space).some(
      (element) =>
        element.status === ElementStatusEnum.Published &&
        !ElementUtils.isEmpty(element),
    ),
  getSectionMaxPosition: (Sections: NoumLayoutSection[]): number => {
    const positions = Sections?.map((section) => section?.position || 0);
    return max(positions) || 0;
  },
  getLastUpdatedAt: (space: SpaceOutputFragment | undefined): string =>
    SpaceUtils.isArchived(space)
      ? space?.archivedAt
      : space?.publishedAt > space?.updatedAt
      ? space?.publishedAt
      : space?.updatedAt,
  isProjectNoum: (spaceData?: Maybe<SpaceOutputFragment>) =>
    !!spaceData && spaceData.type === SpaceTypeEnum.Project,
  isRiseApplicationNoum: (spaceData?: Maybe<SpaceOutputFragment>) =>
    !!spaceData && spaceData.type === SpaceTypeEnum.RiseApplication,
  isArchived: (spaceData?: Maybe<SpaceOutputFragment>) =>
    spaceData?.status === SpaceStatusEnum.Archived,
  isPublicNoum: (spaceData?: Maybe<SpaceOutputFragment>) =>
    spaceData?.projectType === ProjectChamberType.Public,
  isPrivateNoum: (spaceData?: Maybe<SpaceOutputFragment>) =>
    spaceData?.projectType === ProjectChamberType.Private,
  isSecretNoum: (spaceData?: Maybe<SpaceOutputFragment>) =>
    spaceData?.projectType === ProjectChamberType.Secret,
  getExistingElementTypes: (spaceData?: Maybe<SpaceOutputFragment>) =>
    spaceData?.layout?.uniqueToolStatuses
      .filter((item) => item.isAlreadyUsed)
      .map((item) => item.toolType) || [],
};
