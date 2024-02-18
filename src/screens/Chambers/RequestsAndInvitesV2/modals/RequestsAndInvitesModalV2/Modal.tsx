import { type FC, memo, useState } from 'react';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import { Modal, ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { ModalSize } from '@/components/ExtendedModal/types';
import { t } from 'i18next';
import { BasicChipsTabsForm, Icon, TSpan } from '@/components';
import { Radiobox } from '@/components/Radiobox';
import { Stack } from '@/layout';
import RequestsAndInvitesList from '@/screens/Chambers/RequestsAndInvitesV2/components/RequestsAndInvitesList';
import {
  RequestsAndInvitesStatusRadioButtons,
  RequestsAndInvitesTypeTabs,
} from './types';
import RequestsAndInvitesListV2 from '../../components/RequestsAndInvitesListV2';
import { ReceivedAndSent, RequestsAndInvites } from './constants';

type RequestsAndInvitesModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  refetchReceivedRequests: () => void;
};

const RequestsAndInvitesModal: FC<RequestsAndInvitesModalProps> = memo(
  ({ isOpen, handleClose, refetchReceivedRequests }) => {
    const { isMobile } = useBreakpoints();
    const {
      flags: { elementPermission },
    } = useLaunchDarkly();
    const [selectedTypeId, setSelectedTypeId] = useState<RequestsAndInvites>(
      RequestsAndInvites.Request,
    );
    const [selectedStatusId, setSelectedStatusId] = useState<ReceivedAndSent>(
      ReceivedAndSent.Received,
    );
    const onChange = (id: RequestsAndInvites) => {
      setSelectedTypeId(id);
    };

    const onChangeStatusTab = (statusTabId: ReceivedAndSent) => {
      setSelectedStatusId(statusTabId);
    };

    return (
      <Modal
        testId="testRequestsAndInvites"
        open={isOpen}
        onClose={handleClose}
        isFullScreen={isMobile}
        enableCloseButton
        size={ModalSize.XL}
        disableBackdropClick
      >
        <ModalHeader topPadding={0} bottomPadding={24}>
          {t('noumena.chamber.modal.requests_invites')}
        </ModalHeader>

        <ModalBody
          gap={16}
          minHeight={488}
          maxHeight={isMobile ? 'unset' : '488px'}
        >
          <Stack fullWidth>
            <BasicChipsTabsForm
              onChange={onChange}
              inputList={RequestsAndInvitesTypeTabs}
              selectedId={selectedTypeId}
              mode="isBackground"
              fullWidth
              isWithoutImage
              tabCSS={{ margin: 0 }}
              gap={12}
              fontSize="--font-body-medium-size"
              textFont="--font-body-medium-regular-font"
            />
          </Stack>
          <Stack fullWidth gap={16}>
            {RequestsAndInvitesStatusRadioButtons.map((item) => {
              const isChecked = item.id === selectedStatusId;
              return (
                <Stack
                  key={item.id}
                  onClick={() => onChangeStatusTab(item.id)}
                  gap={8}
                  align="center"
                >
                  <Radiobox
                    isChecked={isChecked}
                    icon={
                      <Icon
                        name="radio_btn_m"
                        size={isChecked ? 12 : 0}
                        color={
                          isChecked
                            ? '--icon-radiobutton-brand-primary-default'
                            : '--icon-radiobutton-inactive-default'
                        }
                      />
                    }
                  />
                  <TSpan
                    colorToken={
                      isChecked
                        ? '--text-tab-chips-brand-primary-selected'
                        : '--text-tab-chips-neutral-default'
                    }
                  >
                    {item.label}
                  </TSpan>
                </Stack>
              );
            })}
          </Stack>
          {elementPermission ? (
            <RequestsAndInvitesListV2
              statusId={selectedStatusId}
              typeId={selectedTypeId}
              refetchReceivedRequests={refetchReceivedRequests}
            />
          ) : (
            <RequestsAndInvitesList
              statusId={selectedStatusId}
              typeId={selectedTypeId}
              refetchReceivedRequests={refetchReceivedRequests}
            />
          )}
        </ModalBody>
      </Modal>
    );
  },
);

export default RequestsAndInvitesModal;
