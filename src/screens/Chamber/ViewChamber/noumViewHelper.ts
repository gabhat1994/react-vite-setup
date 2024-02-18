import {
  ElementTypeEnum,
  type ElementOutput,
  type Maybe,
  type UserOutput,
  type NoumLayoutSection,
} from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import { ElementUtils } from '@/utils/element';
import { SpaceUtils } from '@/utils/space';

export const toolRenderHelper = (
  space: SpaceOutputFragment | undefined,
  isConnected: boolean,
  tools: ElementOutput[],
  user: Maybe<UserOutput | UserFragment>,
  isUnregistered: boolean,
  flags: {
    [key: string]: boolean;
  },
) => {
  const isMasterNoum = SpaceUtils.isMasterNoum(space);
  const isOwner = space?.uid?._id === user?._id;
  const isCustomPreview =
    !isMasterNoum &&
    !isOwner &&
    !(isConnected || isUnregistered) &&
    flags.customNoums;

  const elements = () => {
    const elementsToRender = isCustomPreview
      ? ElementUtils.filterAndSortCPPublished(
          tools,
          CustomPreviewTabEnum.Preview,
        )
      : ElementUtils.filterAndSortPublished(tools, isMasterNoum);

    return elementsToRender.filter((element) => {
      if (element.elementType === ElementTypeEnum.ContractManager)
        return !!flags.contractTool;

      return true;
    });
  };

  const renderableTools = () => {
    let filteredElements = elements();
    if (flags.posts === false) {
      filteredElements = filteredElements.filter(
        (elem) => elem.elementType !== ElementTypeEnum.Userposts,
      );
    }

    if (space?.type === 'HOME' && flags.homeNoumMessages === false) {
      filteredElements = filteredElements.filter(
        (elem) => elem.elementType !== ElementTypeEnum.Message,
      );
    }

    return filteredElements;
  };

  return {
    renderableTools,
  };
};

export const clearSectionWithNoTools = (
  list: NoumLayoutSection[] | undefined = [],
) =>
  list.filter((section) => section.columns.some((col) => col.tools.length > 0));

export const getFilteredEmptyTools = (
  section: NoumLayoutSection,
  eventsCount: number,
  totalQuestionCount: number,
) =>
  section.columns.map((column) => ({
    ...column,
    tools: column.tools.filter((tool) =>
      tool.elementType === ElementTypeEnum.Calendar
        ? eventsCount > 0
        : tool.elementType === ElementTypeEnum.QuickQuestions
        ? totalQuestionCount > 0
        : true,
    ),
  }));
