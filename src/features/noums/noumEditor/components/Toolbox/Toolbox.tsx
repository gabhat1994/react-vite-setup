import { useCallback, useEffect, useMemo, useState } from 'react';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type TabsHeaderTypes } from '@/features/noums/components/Toolbox';
import {
  type AddNoumLayoutToolInput,
  ElementTypeEnum,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { ElementUtils } from '@/utils/element';
import { Spinner } from '@/components/Spinner';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { TextAlignType } from '@/screens/Chamber/components/NoumSections/constants';
import { Tabs } from '@/features/noums/hooks/Toolbox/constants';
import { useAddNoumLayoutToolHelper } from '@/features/noums/hooks/spaceQuery';
import { SpaceUtils } from '@/utils/space';
import { type ToolboxProps } from './types';
import { ToolboxTabContent } from './ToolboxTabContent';
import { ToolboxLoader, ToolboxTabs, ToolboxWrapper } from './styles';
import { SectionToolType } from '../../shared/constants';

export const Toolbox = ({
  spaceId,
  columnId,
  handleSelectElementType,
  position = 1,
  baseElementId,
}: ToolboxProps) => {
  const { handleEditModal, space } = useEditChamberState();
  const [selectedId, setSelectedId] = useState(Tabs[0].id);
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const handleChange = useCallback(
    (id: string) => {
      if (id && id !== selectedId) {
        setSelectedId(id);
      }
    },
    [selectedId],
  );
  const listOfTabs: TabsHeaderTypes[] = useMemo(
    () =>
      Tabs.filter(
        (tab) =>
          !(space?.type === SpaceTypeEnum.Home && tab.group === 'finance'),
      ).map((tab) => ({ ...tab, labelSize: 'auto' })),
    [space?.type],
  );

  useEffect(() => {
    const selectedTab = Tabs.find((tab) => tab.id === selectedId);
    setActiveTab(selectedTab || Tabs[0]);
  }, [selectedId]);

  const { addNoumLayoutToolHelper, loading: addNoumLayoutToolLoading } =
    useAddNoumLayoutToolHelper();

  const maxPosition = space
    ? SpaceUtils.getMaxPosition(space)
    : SpaceUtils.getElements(space).length;

  const onSelectElementType = useCallback(
    async (elementType: ElementTypeEnum) => {
      if (spaceId) {
        const newElementInput: AddNoumLayoutToolInput = {
          elementType,
          bodyContentType:
            ElementUtils.getBodyContentTypeFromElementType(elementType),
          columnId,
          position:
            position > maxPosition
              ? maxPosition
              : Math.max(1, Math.round(position)),
        };
        if (
          elementType === ElementTypeEnum.Image ||
          elementType === ElementTypeEnum.Video
        ) {
          newElementInput.meta = {
            percentageSize: 30,
            align: TextAlignType.CENTER,
          };
        }
        const newElement = await addNoumLayoutToolHelper(
          spaceId,
          newElementInput,
          baseElementId,
          position,
        );
        if (newElement) {
          if (!addNoumLayoutToolLoading) {
            handleSelectElementType();
          }
          if (
            elementType === ElementTypeEnum.Image ||
            elementType === ElementTypeEnum.Video
          )
            return;
          handleEditModal?.(
            SectionToolType.TOOL_TYPE,
            newElement?._id || '',
            newElement,
          );
        }
      }
    },
    [
      spaceId,
      columnId,
      position,
      maxPosition,
      addNoumLayoutToolHelper,
      baseElementId,
      addNoumLayoutToolLoading,
      handleEditModal,
      handleSelectElementType,
    ],
  );

  return (
    <ToolboxWrapper>
      {addNoumLayoutToolLoading && (
        <ToolboxLoader>
          <Spinner />
        </ToolboxLoader>
      )}
      <ToolboxTabs>
        <BasicChipsTabsForm
          onChange={handleChange}
          inputList={listOfTabs}
          selectedId={selectedId}
          mode="isBackground"
          isWithoutImage
          fontSize="--font-input-small-size"
        />
      </ToolboxTabs>
      <ToolboxTabContent
        handleSelectElementType={onSelectElementType}
        activeTab={activeTab}
      />
    </ToolboxWrapper>
  );
};

export default Toolbox;
