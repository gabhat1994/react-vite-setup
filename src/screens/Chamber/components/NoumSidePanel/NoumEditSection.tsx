import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { Button } from '@/components/Button';
import { Switch } from '@/components/Switch';
import {
  NoumLayoutSectionType,
  type NoumLayoutSectionVerticalAlignType,
  NoumLayoutStatus,
} from '@/apollo/generated/types';
import {
  useRemoveSectionHelper,
  useUpdateNoumSectionHelper,
} from '@/features/noums/hooks/spaceQuery';
import { type InputListTypes } from '@/components/Tabs/types';
import { ElementUtils } from '@/utils/element';

import { NonRemovableDeleteModal } from '@/features/noums/noumEditor/components';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { type NoumEditSectionProps } from './types';
import { useEditChamberState } from '../../EditChamber/provider';
import { alignItems } from './constants';
import ColumnPicker from './ColumnPicker';
import {
  AlignPicker,
  AppearanceSection,
  ColumnChipsContainer,
  ColumnPickerContainer,
} from './styles';

export const NoumEditSection: React.FC<NoumEditSectionProps> = ({
  noumSidePanelId,
}) => {
  const {
    handleDeleteModal,
    space,
    setNoumSidePanelId,
    section,
    setSectionStatus: setsectionStatus,
    setSectionSideBarOptions,
    sectionSideBarOptions,
    duplicateHandler,
  } = useEditChamberState();
  const { removeSectionHelper } = useRemoveSectionHelper();
  const { updateNoumSectionHelper } = useUpdateNoumSectionHelper();
  const [selectedColumn, setSelectedColumn] = useState<string>();
  const [showNonRemovableModal, setShowNonRemovableModal] = useState(false);
  const column = useMemo(
    () =>
      section?.columns.find(
        (sectionItem) => sectionItem._id === selectedColumn,
      ),
    [section?.columns, selectedColumn],
  );

  const nonRemovableTools = useMemo(
    () => ElementUtils.nonRemovableTools(section?.columns || []),
    [section?.columns],
  );

  const columnsPerLayout = useMemo(() => {
    let columsCount = 1;
    const initialSelectedColumn = section?.columns.find(
      (item) => item._id === selectedColumn,
    );
    setSelectedColumn(
      selectedColumn ? initialSelectedColumn?._id : section?.columns[0]._id,
    );
    switch (
      sectionSideBarOptions?.selectedLayout?.layoutType ??
      section?.type
    ) {
      case NoumLayoutSectionType.ThreeEqualColumns:
        columsCount = 3;
        break;
      case NoumLayoutSectionType.TwoColumnsLeftWider:
      case NoumLayoutSectionType.TwoColumnsRightWider:
      case NoumLayoutSectionType.TwoEqualColumns:
        columsCount = 2;
        break;
      default:
        setSelectedColumn(section?.columns[0]._id);
        columsCount = 0;
        break;
    }

    const updatedColumns = section?.columns?.map((element, index) => ({
      id: element._id,
      text: `${index + 1}`,
      name: `${element._id}`,
      labelSize: 'auto',
    }));
    return updatedColumns?.slice(0, columsCount) as InputListTypes[];
  }, [
    section?.columns,
    section?.type,
    sectionSideBarOptions?.selectedLayout?.layoutType,
    selectedColumn,
  ]);

  const onAlignItemChange = async (value: string) => {
    setSectionSideBarOptions({
      selectedAlignItem: {
        id: section?._id!,
        alignItem: value as NoumLayoutSectionVerticalAlignType,
      },
    });
    const isSuccess = await updateNoumSectionHelper(space?._id!, {
      sectionId: section?._id,
      columnsVerticalAlignType: value as NoumLayoutSectionVerticalAlignType,
    });
    setsectionStatus?.(NoumLayoutStatus.Unsaved);
    if (!isSuccess) {
      setSectionSideBarOptions({
        selectedAlignItem: {
          id: section?._id!,
          alignItem: section?.columnsVerticalAlignType!,
        },
      });

      setsectionStatus?.(undefined);
    }
  };

  const onColumnChange = (value: string) => {
    setSectionSideBarOptions({
      columnBackground: undefined,
    });
    setSelectedColumn(value);
  };
  const onSectionBackgroundChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSectionSideBarOptions({
      sectionBackgroud: { id: section?._id!, background: e.target.checked },
    });
    const isSuccess = await updateNoumSectionHelper(space?._id!, {
      sectionId: section?._id,
      background: e.target.checked,
    });
    setsectionStatus?.(NoumLayoutStatus.Unsaved);
    if (!isSuccess) {
      setSectionSideBarOptions({
        sectionBackgroud: {
          id: section?._id!,
          background: section?.background!,
        },
      });
      setsectionStatus?.(undefined);
    }
  };
  const onColumnBackgroundChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSectionSideBarOptions({
      columnBackground: { id: column?._id!, background: e.target.checked },
    });
    const updatedColumn = section?.columns.map((item) =>
      item._id === selectedColumn
        ? { columnId: item._id, background: e.target.checked }
        : { columnId: item._id, background: item.background },
    );

    const isSuccess = await updateNoumSectionHelper(space?._id!, {
      sectionId: section?._id,
      columns: updatedColumn,
    });
    setsectionStatus?.(NoumLayoutStatus.Unsaved);
    if (!isSuccess) {
      const preColumn = section?.columns.find(
        (col) => col._id === selectedColumn,
      );
      setSectionSideBarOptions({
        columnBackground: {
          id: preColumn?._id!,
          background: preColumn?.background!,
        },
      });
      setsectionStatus?.(undefined);
    }
  };
  const clickHandler = async () => {
    if (nonRemovableTools.length > 0) {
      setShowNonRemovableModal(true);
      return;
    }
    const isToolExist = section?.columns.find((item) => item.tools.length > 0);
    if (isToolExist) {
      handleDeleteModal?.(SectionToolType.SECTION_TYPE, noumSidePanelId)!;
    } else {
      if (!section || !space?._id) return;
      const isRemoved = await removeSectionHelper(section, space._id);
      if (isRemoved) {
        setNoumSidePanelId?.(undefined);
      }
    }
  };

  const onClickduplicate = async () => {
    duplicateHandler?.(noumSidePanelId);
  };

  return (
    <>
      <Stack
        vertical
        fullWidth
        align="stretch"
        justify="space-between"
        aria-label="edit_section_side_panel"
      >
        <Stack vertical fullWidth aria-label="edit_section_block">
          <AppearanceSection
            vertical
            fullWidth
            align="stretch"
            gap={8}
            padding="16px 16px 0 16px"
            aria-label="edit_apearance_block"
          >
            <TSpan
              font="footnote-bold"
              colorToken="--text-card-neutral-highlighted"
              overflow="ellipsis"
              aria-label="apearance_text"
            >
              {t('noumena.noum_editor.edit_Section.appearance')}
            </TSpan>
            <Stack
              fullWidth
              align="center"
              justify="space-between"
              aria-label="column_align_block"
            >
              <TSpan
                font="footnote"
                colorToken="--text-card-neutral-highlighted"
                overflow="ellipsis"
                aria-label="align_items_text"
              >
                {t('noumena.noum_editor.edit_Section.alignitems')}
              </TSpan>
              <AlignPicker aria-label="align_columns_picker">
                <BasicChipsTabsForm
                  onChange={onAlignItemChange}
                  inputList={alignItems}
                  selectedId={
                    sectionSideBarOptions?.selectedAlignItem?.alignItem! ??
                    section?.columnsVerticalAlignType
                  }
                  mode="isActiveBackgroundOnly"
                  fontSize="--font-link-medium-size"
                  iconSize={20}
                />
              </AlignPicker>
            </Stack>
            <Stack
              fixedHeight={56}
              fullWidth
              align="center"
              justify="space-between"
              aria-label="change_section_background_block"
            >
              <TSpan
                font="footnote"
                colorToken="--text-card-neutral-highlighted"
                overflow="ellipsis"
                aria-label="section_background_text"
              >
                {t('noumena.noum_editor.edit_Section.background')}
              </TSpan>
              <Switch
                id="background"
                aria-label="section_background_toggle"
                checked={
                  sectionSideBarOptions?.sectionBackgroud?.background! ??
                  section?.background
                }
                onChange={(e) => onSectionBackgroundChange(e)}
              />
            </Stack>
          </AppearanceSection>
          <ColumnPickerContainer aria-label="section_layout_container">
            <ColumnPicker aria-label="section_layout_picker" />
          </ColumnPickerContainer>
          <Stack
            vertical
            fullWidth
            align="stretch"
            gap={8}
            padding="16px"
            aria-label="column_picker_block"
          >
            <TSpan
              font="footnote-bold"
              colorToken="--text-card-neutral-highlighted"
              overflow="ellipsis"
              aria-label="column_settings_text"
            >
              {t('noumena.noum_editor.edit_Section.column_settings')}
            </TSpan>
            {columnsPerLayout && columnsPerLayout?.length > 1 && (
              <ColumnChipsContainer>
                <BasicChipsTabsForm
                  onChange={onColumnChange}
                  inputList={columnsPerLayout!}
                  selectedId={selectedColumn!}
                  mode="isBackground"
                  isWithoutImage
                  fontSize="--font-footnote-regular-size"
                  tabWidth="100%"
                  maxHeight="27px"
                  tabCSS={{ margin: 0 }}
                />
              </ColumnChipsContainer>
            )}
          </Stack>
          <Stack
            fullWidth
            align="center"
            justify="space-between"
            padding="8px 16px"
            aria-label="change_column_background_block"
          >
            <TSpan
              font="footnote"
              colorToken="--text-card-neutral-highlighted"
              overflow="ellipsis"
              aria-label="column_background_text"
            >
              {t('noumena.noum_editor.edit_Section.column_background')}
            </TSpan>
            <Switch
              id="column_background"
              aria-label="column_background_toggle"
              checked={
                sectionSideBarOptions?.columnBackground?.background ??
                column?.background
              }
              onChange={(e) => onColumnBackgroundChange(e)}
            />
          </Stack>
        </Stack>
        <Stack gap={8} padding="16px" aria-label="bottom_actions_container">
          <Button
            size="full_small"
            tertiary
            secondary
            onClick={onClickduplicate}
            aria-label="duplicate_button"
          >
            {t('noumena.noum_editor.edit_Section.button.duplicate')}
          </Button>
          <Button
            size="full_small"
            intent="negative"
            secondary
            onClick={clickHandler}
            aria-label="delete_button"
          >
            {t('noumena.noum_editor.edit_Section.button.delete')}
          </Button>
        </Stack>
      </Stack>
      <NonRemovableDeleteModal
        isOpen={showNonRemovableModal}
        onClose={() => setShowNonRemovableModal(false)}
        nonRemovableToolList={nonRemovableTools}
      />
    </>
  );
};
