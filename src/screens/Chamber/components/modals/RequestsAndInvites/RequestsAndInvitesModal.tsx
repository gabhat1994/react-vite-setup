import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import InvitedByMeTab from '@/screens/Chamber/components/modals/RequestsAndInvites/Tabs/InvitedByMeTab';
import { memo, useMemo, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import MyRequestsTab from './Tabs/MyRequestsTab';
import ReceivedRequestsTab from './Tabs/ReceivedRequestsTab';
import { TabSection, TabsContainer } from './styles';
import { type IRequestsAndInvites } from './types';

export const RequestsAndInvitesModal: FC<IRequestsAndInvites> = memo(
  ({
    isOpen,
    handleClose,
    isChambersScreen,
    noumId,
    isInviteOnly,
    refetchReceivedRequests,
  }) => {
    const { t } = useTranslation();
    const [selectedId, setSelectedId] = useState(isInviteOnly ? '1' : '0');
    const { width } = useWindowDimensions();
    const isTablet = width < breakpoints.TABLET + 1;
    const isMobile = width < breakpoints.TABLET;

    const modalHeadList = useMemo(() => {
      const list: InputListTypes[] = [
        {
          name: 'received',
          image: 'terms_m',
          text: t('noumena.chamber.modal.received'),
          labelSize: 'medium',
        },
        {
          name: 'invited by me',
          image: 'terms_m',
          text: t('noumena.chamber.modal.invited_by_me'),
          labelSize: 'medium',
        },
      ];
      if (isChambersScreen) {
        list.push({
          name: 'my requests',
          image: 'terms_m',
          text: t('noumena.chamber.modal.my_requests'),
          labelSize: 'medium',
        });
      }
      return list;
    }, [isChambersScreen, t]);

    const onChange = (id: string) => {
      setSelectedId(id);
    };

    const tabComponent = () => {
      switch (selectedId) {
        case '1':
          return (
            <InvitedByMeTab
              noumId={noumId || ''}
              isChambersScreen={isChambersScreen}
              isNotPrivateNoum={isInviteOnly}
            />
          );
        case '2':
          return <MyRequestsTab noumId={noumId} />;
        case '0':
        default:
          return (
            <ReceivedRequestsTab
              noumId={noumId}
              isChambersScreen={isChambersScreen}
              refetchReceivedRequests={refetchReceivedRequests}
            />
          );
      }
    };

    return (
      <Modal
        testId="testRequestsAndInvites"
        open={isOpen}
        onClose={handleClose}
        isFullScreen={isMobile}
        enableCloseButton
        size={ModalSize.M}
        disableBackdropClick
        spacingMode="gap-content"
      >
        <ModalHeader>
          {isInviteOnly
            ? t('noumena.chamber.modal.invited_by_me')
            : t('noumena.chamber.modal.requests_invites')}
        </ModalHeader>

        <ModalBody minHeight={!isInviteOnly ? 500 : 400}>
          {!isInviteOnly && (
            <TabsContainer>
              <TabSection>
                <BasicChipsTabsForm
                  onChange={onChange}
                  inputList={modalHeadList}
                  selectedId={selectedId}
                  mode="isBackground"
                  isWithoutImage
                  fontSize="--font-body-medium-size"
                  tabWidth={isTablet ? '106.33px' : '109.33px'}
                  textFont="--font-body-medium-regular-font"
                />
              </TabSection>
            </TabsContainer>
          )}
          {tabComponent()}
        </ModalBody>
      </Modal>
    );
  },
);

export default RequestsAndInvitesModal;
