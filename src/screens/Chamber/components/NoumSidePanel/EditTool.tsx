import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { Accordion } from '@/components/Accordion';
import Slider from '@/components/Slider';
import {
  type ElementInput,
  ElementStatusEnum,
  ElementTypeEnum,
} from '@/apollo/generated/types';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useSetNoumLayoutToolMetaValueHelper } from '@/features/noums/hooks/spaceQuery';
import { ElementUtils } from '@/utils/element';
import { imageTypes, videoTypes } from '@/constants/fileTypes';
import { useSubWalletDeleteHelper } from '@/features/money/hooks';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { AlignPicker, ToolPermissionContainer } from './styles';
import { useEditChamberState } from '../../EditChamber/provider';
import { TextAlignType } from '../NoumSections/constants';
import { type NoumEditToolProps, elementDescription } from './types';
import EditBlockWrapper from './EditBlockWrapper';
import { textAlignItems } from './constants';
import { UploadFile } from './UploadFile';
import { type ChangeMeta } from '../Element/types';
import { NonZeroWalletModal } from '../modals/NonZeroWalletModal';

export const EditTool: React.FC<NoumEditToolProps> = ({ noumSidePanelId }) => {
  const {
    handleDeleteModal,
    activeEditingTool,
    handleChangeToolMetaValue,
    toolMetaValue,
    updateToolMetaValue,
    updateToolMutation,
    duplicateHandler,
    space,
    setMediaUploadTempFile,
  } = useEditChamberState();

  const [showNonZeroWalletModal, setShowNonZeroWalletModal] = useState(false);

  const isDuplicatable = useMemo(
    () => ElementUtils.isAvailableToDuplicate(activeEditingTool!),
    [activeEditingTool],
  );
  const isDelete = useMemo(
    () => ElementUtils.isNotAvailableToDelete(activeEditingTool!),
    [activeEditingTool],
  );
  const isMediaElement = useMemo(
    () => ElementUtils.isMediaElement(activeEditingTool!),
    [activeEditingTool],
  );
  const isImage = useMemo(
    () => ElementUtils.isImageElement(activeEditingTool!),
    [activeEditingTool],
  );

  const { setNoumLayoutToolMetaValueHelper } =
    useSetNoumLayoutToolMetaValueHelper();

  const showPermission = false;

  const mockedPermissions = [
    {
      role: 'Guests',
      permissions: ['View'],
    },
    {
      role: 'Favorites',
      permissions: ['View', 'Add'],
    },
    {
      role: 'Clients',
      permissions: ['View', 'Add'],
    },
    {
      role: 'Sub-Contractors',
      permissions: ['View', 'Add'],
    },
    {
      role: 'Editors',
      permissions: ['View', 'Add'],
    },
  ];

  const { subWalletDeleteHelper } = useSubWalletDeleteHelper();

  const getDescription = () => {
    if (!activeEditingTool?.elementType) return '';
    const desc = elementDescription[activeEditingTool.elementType];
    if (desc === '')
      return 'This is a short tool description. It contains max 150 characters.';
    const trimedDesc = desc.trim();
    if (trimedDesc.length > 150) {
      return `${trimedDesc.substring(0, 147)}...`;
    }
    return trimedDesc;
  };

  const onTextAlignItemChange = async (value: string) => {
    handleChangeToolMetaValue?.({ align: value as TextAlignType });
    await setNoumLayoutToolMetaValueHelper(
      {
        toolId: activeEditingTool?._id!,
        metaValues: {
          align: value,
        },
      },
      space?._id,
    );
  };

  const onHandleChangeScaleSize = useCallback(
    (newValue: number) => {
      handleChangeToolMetaValue?.({ percentageSize: Number(newValue) });
    },
    [handleChangeToolMetaValue],
  );

  const handleUploadFile = (mFile: File) => {
    setMediaUploadTempFile?.(mFile);
  };

  const handleChangeFileResource = useCallback(
    (value?: string, meta?: ChangeMeta) => {
      setMediaUploadTempFile?.(undefined);
      if (!activeEditingTool) return;
      const json = {
        ...ElementUtils.getBodyContentJson(activeEditingTool),
        fileSize: meta?.fileSize,
        fileName: meta?.fileName,
        ...(meta?.type === 'video' && {
          thumbnail: meta.thumbnail,
          videoURL: meta.videoURL,
        }),
      };

      const input: ElementInput = {
        elementId: noumSidePanelId,
        bodyContent: value,
        bodyContentJson: Object.keys(json).length > 0 ? json : null,
        status: ElementStatusEnum.Unsaved,
      };
      updateToolMutation?.(input);
    },
    [
      activeEditingTool,
      noumSidePanelId,
      setMediaUploadTempFile,
      updateToolMutation,
    ],
  );

  const mediaData = useMemo(
    () => ElementUtils.getBodyContentJson(activeEditingTool!),
    [activeEditingTool],
  );

  const regularDeleteFlow = useCallback(() => {
    handleDeleteModal?.(SectionToolType.TOOL_TYPE, noumSidePanelId);
  }, [handleDeleteModal, noumSidePanelId]);

  const handleCloseNonZeroWalletModal = () => {
    setShowNonZeroWalletModal(!showNonZeroWalletModal);
  };

  return (
    <>
      <Stack
        vertical
        fullWidth
        align="stretch"
        justify="space-between"
        aria-label="edit_tool_side_panel"
      >
        <div>
          <Stack padding="0 12px 4px 12px" aria-label="tool_description">
            <TSpan font="body-m" colorToken="--text-card-neutral-default">
              {getDescription()}
            </TSpan>
          </Stack>
          {isMediaElement && (
            <>
              <EditBlockWrapper separatorSize="thick">
                <>
                  <TSpan font="footnote-bold" aria-label="file_uploaded_text">
                    {t(`noumena.noum_editor.tool.image.file_uploaded`)}
                  </TSpan>
                  <Stack gap={12} aria-label="uploaded_file_block">
                    <UploadFile
                      type="noum"
                      acceptedFileTypes={isImage ? imageTypes : videoTypes}
                      url={
                        isImage
                          ? ElementUtils.getBodyContent(activeEditingTool!)
                          : ElementUtils.getBodyContentJson(activeEditingTool!)
                              ?.thumbnail
                      }
                      onContentChange={handleChangeFileResource}
                      maximumFileSize={isImage ? 20 : 200}
                      fileSize={mediaData?.fileSize}
                      fileName={mediaData?.fileName}
                      onUploadFile={handleUploadFile}
                    />
                  </Stack>
                </>
              </EditBlockWrapper>
              <EditBlockWrapper separatorSize="thick">
                <>
                  <TSpan font="footnote-bold" aria-label="image_size_text">
                    {t(`noumena.noum_editor.tool.image.size`)}
                  </TSpan>
                  <Slider
                    onChange={onHandleChangeScaleSize}
                    initialValue={toolMetaValue?.percentageSize}
                    changedValue={toolMetaValue?.percentageSize}
                    onChangeEnd={updateToolMetaValue}
                  />
                </>
              </EditBlockWrapper>
              <EditBlockWrapper separatorSize="thick">
                <Stack
                  fullWidth
                  align="center"
                  justify="space-between"
                  aria-label="image_align_block"
                >
                  <TSpan font="footnote-bold" aria-label="image_align_text">
                    {t(`noumena.noum_editor.tool.image.align`)}
                  </TSpan>
                  <AlignPicker aria-label="image_align_picker">
                    <BasicChipsTabsForm
                      onChange={onTextAlignItemChange}
                      inputList={textAlignItems}
                      selectedId={toolMetaValue?.align || TextAlignType.CENTER}
                      mode="isActiveBackgroundOnly"
                      fontSize="--font-link-medium-size"
                      iconSize={20}
                    />
                  </AlignPicker>
                </Stack>
              </EditBlockWrapper>
            </>
          )}
          {showPermission && (
            <EditBlockWrapper separatorSize="thick">
              <Accordion
                title="Permissions"
                titleFont="footnote-bold"
                preExpanded
                headerPadding="0"
                aria-label="permissions_accordian"
              >
                <Stack
                  vertical
                  padding="10px 0px"
                  aria-label="permissions_block"
                >
                  {mockedPermissions.map((data) => (
                    <ToolPermissionContainer key={data.role}>
                      <TSpan
                        font="footnote"
                        colorToken="--text-card-header-neutral-highlighted"
                        overflow="ellipsis"
                        aria-label="permission_role"
                      >
                        {data.role}
                      </TSpan>
                      <TSpan
                        font="footnote"
                        colorToken="--text-input-neutral-default"
                        overflow="ellipsis"
                        aria-label="permission_title"
                      >
                        {data.permissions.join(' & ')}
                      </TSpan>
                    </ToolPermissionContainer>
                  ))}
                </Stack>
              </Accordion>
            </EditBlockWrapper>
          )}
        </div>
        <Stack gap={8} padding="12px" aria-label="bottom_actions_container">
          {isDuplicatable && (
            <Button
              size="full_small"
              tertiary
              secondary
              onClick={() => duplicateHandler?.(activeEditingTool?._id!, true)}
              aria-label="duplicate_button"
            >
              {t('noumena.noum_editor.edit_tool.duplicate')}
            </Button>
          )}
          {!isDelete && (
            <Button
              size="full_small"
              intent="negative"
              secondary
              aria-label="delete_button"
              onClick={async () => {
                if (
                  ElementTypeEnum.Wallet === activeEditingTool?.elementType &&
                  activeEditingTool.status === ElementStatusEnum.Published
                ) {
                  subWalletDeleteHelper(
                    space?._id,
                    regularDeleteFlow,
                    handleCloseNonZeroWalletModal,
                  );
                } else {
                  regularDeleteFlow();
                }
              }}
            >
              {t('noumena.noum_editor.edit_tool.delete')}
            </Button>
          )}
        </Stack>
      </Stack>
      <NonZeroWalletModal
        isOpen={showNonZeroWalletModal}
        handleClose={handleCloseNonZeroWalletModal}
      />
    </>
  );
};
