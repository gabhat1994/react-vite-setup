import { ElementTypeEnum } from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type IncompletedItemDropdownOptionProps } from '@/screens/HomeNoum/types';
import { cleanList } from '@/utils/list';
import { SpaceUtils } from '@/utils/space';
import { useMemo } from 'react';

export function useProfileCompletenessHelper() {
  const {
    space,
    spaceConfig,
    loading,
    refetchSpaceByConfig,
    refetchSpaceById,
  } = useNoumContext();

  const progressItems: IncompletedItemDropdownOptionProps[] = useMemo(() => {
    if (spaceConfig && spaceConfig?.length > 0) {
      const filteredSpaceConfig = spaceConfig.filter(
        (item) => item?.id !== ElementTypeEnum.Home,
      );
      const tempProgressItems = SpaceUtils.getProgressBarItems(
        space,
        filteredSpaceConfig,
      );
      return cleanList(
        tempProgressItems.map((profileValueItem) =>
          profileValueItem.id && profileValueItem.name
            ? {
                status: profileValueItem?.status,
                value: profileValueItem.id,
                key: profileValueItem.name,
                type: 'value',
                label: profileValueItem.name,
              }
            : undefined,
        ),
      );
    }
    return [];
  }, [space, spaceConfig]);

  const showCompleteness =
    !space?.percentCompleted || space?.percentCompleted < 100;

  return {
    loadingSpace: loading,
    refetchSpaceByConfig,
    progressItems,
    refetchSpaceById,
    showCompleteness,
    space,
    spaceConfigData: spaceConfig,
  };
}
