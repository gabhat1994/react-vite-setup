import { t } from 'i18next';
import { Trans } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { type ElementTypeEnum } from '@/apollo/generated/types';
import { type DeleteModalProps } from './types';

import {
  SectionToolType,
  elementDeleteModalDescription,
} from '../../shared/constants';
import {
  DeleteDescription,
  DeleteDescriptionContainer,
} from '../../shared/styles';

export const NoumLayoutDeleteModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
  type = SectionToolType.SECTION_TYPE,
}: DeleteModalProps) => {
  const { activeEditingTool } = useEditChamberState();
  const isTool = type === SectionToolType.TOOL_TYPE;

  return (
    <Modal
      open={isOpen}
      size={ModalSize.S}
      onClose={onClose}
      testId="Section-tool-modal"
      disableBackdropClick
    >
      <ModalHeader>
        {isTool
          ? t('noumena.noum_editor.tool.delete_modal_title')
          : t('noumena.noum_editor.delete_Section_title')}
      </ModalHeader>
      <ModalBody style={{ alignItems: 'center' }}>
        <Stack vertical gap={15}>
          <DeleteDescriptionContainer>
            <DeleteDescription>
              <Trans
                i18nKey={
                  isTool
                    ? activeEditingTool?.elementType &&
                      elementDeleteModalDescription[
                        activeEditingTool.elementType as ElementTypeEnum
                      ]
                      ? elementDeleteModalDescription[
                          activeEditingTool.elementType as ElementTypeEnum
                        ]
                      : t('noumena.noum_editor.delete_tool_description')
                    : t('noumena.noum_editor.delete_section_description')
                }
                components={{
                  span: (
                    <TSpan
                      font="body-l"
                      colorToken="--text-modal-neutral-highlighted"
                    />
                  ),
                }}
              />
            </DeleteDescription>
          </DeleteDescriptionContainer>
          <TSpan
            font="body-l"
            textAlign="center"
            colorToken="--text-modal-neutral-default"
            data-testid="event-confirmation-modal-description"
          >
            {t('noumena.noum_editor.delete_tool_next_description')}
          </TSpan>
        </Stack>
      </ModalBody>
      <Spacer height={16} />
      <ModalFooter
        isFullScreen={false}
        gap={16}
        flexDirection="column"
        marginTop={12}
      >
        <Button
          primary
          intent="negative"
          size="full"
          onClick={onConfirm}
          data-testid="confirm-button"
          loading={loading}
        >
          {isTool
            ? t('noumena.noum_editor.delete_tool_confirm_button')
            : t('noumena.noum_editor.delete_section_confirm_button')}
        </Button>

        <Button
          tertiary
          intent="negative"
          size="full"
          onClick={onClose}
          data-testid="cancel-button"
        >
          {isTool
            ? t('noumena.cancel')
            : t('noumena.noum_editor.delete_section_cancel_button')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NoumLayoutDeleteModal;
