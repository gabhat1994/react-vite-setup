import { t } from 'i18next';
import { Trans } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';

import { TSpan } from '@/components/Typography';
import { type ElementOutput } from '@/apollo/generated/types';
import { nonRemovableTool } from './constants';
import { SectionToolsList } from './Styles';
import {
  DeleteDescription,
  DeleteDescriptionContainer,
} from '../../shared/styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nonRemovableToolList: ElementOutput[];
}

export const NonRemovableDeleteModal = ({
  isOpen,
  onClose,
  nonRemovableToolList,
}: Props) => (
  <Modal
    open={isOpen}
    size={ModalSize.S}
    onClose={onClose}
    testId="nonremovable-tools-modal"
    disableBackdropClick
  >
    <ModalHeader>
      {t('noumena.noum_editor.no_delete_Section_title')}
    </ModalHeader>
    <ModalBody style={{ alignItems: 'center' }}>
      <Stack vertical gap={15}>
        <DeleteDescriptionContainer>
          <DeleteDescription>
            <Trans>
              <TSpan font="body-l" colorToken="--text-modal-neutral-default">
                {t('noumena.noum_editor.no_delete_section_description')}
                <SectionToolsList>
                  {nonRemovableToolList.map((item) => (
                    <li key={item._id}>
                      {
                        nonRemovableTool[
                          item.elementType as keyof typeof nonRemovableTool
                        ]
                      }
                    </li>
                  ))}
                </SectionToolsList>
              </TSpan>
            </Trans>
          </DeleteDescription>
        </DeleteDescriptionContainer>
      </Stack>
    </ModalBody>
    <Spacer height={16} />
    <ModalFooter isFullScreen={false} marginTop={12}>
      <Button
        tertiary
        intent="negative"
        size="full"
        onClick={onClose}
        data-testid="cancel-button"
      >
        {t('noumena.cancel')}
      </Button>
    </ModalFooter>
  </Modal>
);

export default NonRemovableDeleteModal;
