import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ElementTypeEnum, SpaceTypeEnum } from '@/apollo/generated/types';
import { useWindowDimensions } from '@/hooks/dimensions';
import { sizes } from '@/constants/devices';
import { ElementUtils } from '@/utils/element';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { type ListOfOptionsTypes } from '@/features/noums/components/Toolbox';
import { useCheckWalletStatus } from '@/features/money/hooks';
import { Tabs, allToolsInToolBox, allToolsInToolBoxV2 } from './constants';
import { useToolboxPermission } from './useToolboxPermission';
import { ToolboxUtils } from './utils';

type ToolboxItem = {
  group: string;
  groupName?: string;
  items: ListOfOptionsTypes[];
};

const mobileViewWidth = parseInt(sizes.MOBILE_MAX, 10);
const showMoreLength = 5;

export const useToolbox = (currentGroup = '') => {
  const { flags } = useLaunchDarkly();
  const { walletStatus } = useCheckWalletStatus();

  const { space, elements, isOwner } = useEditChamberState();
  const [isFirst, setIsFirst] = useState(true);
  const [tabWithOpenedToolboxes, setTabWithOpenedToolboxes] = useState<
    Number[] | []
  >([]);
  const hideShowMore = useRef(false);
  const { width } = useWindowDimensions();
  const mobileView = width <= mobileViewWidth;
  const [isMobile, setIsMobile] = useState(mobileView);
  const [showMore, toggleShowMore] = useState(mobileView);

  const isMasterNoum = space?.type === SpaceTypeEnum.Home;

  const toolsFilteredByNoumType = useMemo(
    () =>
      ElementUtils.filterToolsByNoumType(
        allToolsInToolBoxV2,
        space?.type || 'PROJECT',
      ),
    [space?.type],
  );

  const { hasToolboxPermissionToAddElement } = useToolboxPermission();

  const toolsToDisplayInToolBox = useCallback(
    () =>
      toolsFilteredByNoumType.map((tool) => {
        const isAlreadyAdded = ElementUtils.isAlreadyAdded({
          tool,
          elements,
          sections: space?.layout?.sections,
        });

        const hasPermission = hasToolboxPermissionToAddElement(
          tool.type,
          isOwner,
        );

        const disabled =
          !hasPermission ||
          isAlreadyAdded ||
          (ToolboxUtils.isWalletType(tool.type) && !walletStatus);

        const toolTipText = ToolboxUtils.getTooltipText(tool, {
          hasPermission,
          disabled,
          walletStatus,
        });

        return {
          ...tool,
          toolTipText,
          disabled,
          hasPermission,
        };
      }),
    [
      toolsFilteredByNoumType,
      elements,
      space?.layout?.sections,
      hasToolboxPermissionToAddElement,
      isOwner,
      walletStatus,
    ],
  );

  const toolsWitComingSoon = useMemo(
    () =>
      ElementUtils.addComingSoon(
        toolsToDisplayInToolBox(),
        ElementTypeEnum.Calendar,
        !flags.noumsSocialHall,
      ),
    [flags.noumsSocialHall, toolsToDisplayInToolBox],
  );

  const filterListbyGroup = useCallback(
    () => toolsWitComingSoon.filter((el) => el.group.includes(currentGroup)),
    [currentGroup, toolsWitComingSoon],
  );

  useEffect(() => {
    setIsMobile(mobileView);
    if (!hideShowMore.current) {
      toggleShowMore(
        mobileView && filterListbyGroup().length >= showMoreLength,
      );
    }
  }, [width, currentGroup, filterListbyGroup, mobileView]);

  const [listOfOptions, setListOfOptions] = useState(() =>
    isMobile ? toolsWitComingSoon.slice(0, 5) : toolsWitComingSoon,
  );

  useEffect(() => {
    setListOfOptions(toolsWitComingSoon);
  }, [currentGroup, filterListbyGroup, toolsWitComingSoon]);

  const handleOpenToolbox = (position = 'end') => {
    if (position === 'begin') {
      setTabWithOpenedToolboxes((val) => (val.length ? [1, ...val] : [1]));
    } else setTabWithOpenedToolboxes((val) => (val.length ? [...val, 1] : [1]));
    if (tabWithOpenedToolboxes.length + 1 > 0) setIsFirst(false);
  };

  const handleCloseToolbox = () => {
    setTabWithOpenedToolboxes((val) => val.slice(0, val.length - 1));
    if (tabWithOpenedToolboxes.length - 1 <= 0) setIsFirst(true);
  };

  const handleShowMore = () => {
    setListOfOptions(toolsToDisplayInToolBox);
    toggleShowMore((prevBool) => !prevBool);
    hideShowMore.current = true;
  };

  const renderableOptions = useMemo(
    () =>
      listOfOptions.filter((op) => {
        switch (op.type) {
          case ElementTypeEnum.Message:
            return isMasterNoum || space?.type === 'PROJECT';
          case ElementTypeEnum.FilesManager:
            return flags.filesManager;
          case ElementTypeEnum.ContractManager:
            return !!flags.contractTool;
          default:
            return true;
        }
      }),
    [
      flags.contractTool,
      flags.filesManager,
      isMasterNoum,
      listOfOptions,
      space?.type,
    ],
  );

  const [listOfOptionsV2, setListOfOptionsV2] = useState<ToolboxItem[]>([]);
  useEffect(() => {
    const lists: ToolboxItem[] = Tabs.filter((tab) => tab.group !== 'all').map(
      (tab) => ({
        group: tab.group,
        groupName: tab.text,
        items: [],
      }),
    );
    renderableOptions.forEach((option) => {
      if (isMasterNoum && option.type === ElementTypeEnum.Usernetwork) return;
      if (option.group.includes(currentGroup)) {
        const groupKey = option.group[1];
        const listsIdx = lists.findIndex((list) => list.group === groupKey);
        if (listsIdx > -1) {
          lists[listsIdx] = {
            ...lists[listsIdx],
            items: [...lists[listsIdx].items, option],
          };
        } else {
          lists.push({
            group: groupKey,
            items: [option],
          });
        }
      }
    });
    setListOfOptionsV2(lists);
  }, [currentGroup, isMasterNoum, renderableOptions]);

  return {
    allToolsInToolBox,
    listOfOptions: renderableOptions,
    listOfOptionsV2,
    isFirst,
    showMore,
    isMobile,
    handleOpenToolbox,
    handleCloseToolbox,
    handleShowMore,
    tabWithOpenedToolboxes,
  };
};

export default useToolbox;
