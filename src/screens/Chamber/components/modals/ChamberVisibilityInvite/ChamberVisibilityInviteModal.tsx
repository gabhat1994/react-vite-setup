import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { VisibilitySettings } from './VisibilitySettings/VisibilitySettings';
import { type ChamberVisibilityInviteModalProps } from './types';
import * as S from './styles';
import { InviteMembers } from './InviteMembers/ViaConnections/InviteMembers';

export const ChamberVisibilityInviteModal = memo(
  ({
    visibility,
    isOpen,
    spaceId,
    handleClose,
    linkedNoums,
    isSEOEnabled = false,
    isOnlyInvite = false,
  }: ChamberVisibilityInviteModalProps) => {
    const { t } = useTranslation();
    const { isMobile, isDesktop } = useBreakpoints();

    return (
      <Modal
        testId="chamber-visibility-invite-modal"
        open={isOpen}
        onClose={handleClose}
        enableCloseButton
        size={ModalSize.XL}
        isFullScreen={!isDesktop}
        disableBackdropClick
      >
        <ModalHeader
          justifyContent={isMobile ? 'flex-start' : 'center'}
          isFullScreen={!isDesktop}
        >
          {isOnlyInvite
            ? t(`noumena.noum.invite_users`)
            : t(`noumena.chamber_edit.visibility.title`)}
        </ModalHeader>
        <ModalBody isFullScreen={!isDesktop} noFooter>
          {!isOnlyInvite && (
            <>
              <S.ModalDescription
                colorToken="--text-modal-neutral-default"
                font="body-m"
              >
                {t(`noumena.chamber_edit.visibility.description`)}
              </S.ModalDescription>
              <Spacer height="16px" />
              <VisibilitySettings
                noumId={spaceId}
                defaultVisibility={visibility}
                linkedNoums={linkedNoums ?? []}
                isSEOEnabled={isSEOEnabled}
                onClose={handleClose}
              />
              <S.Divider />
              <S.InviteTitle>
                <TSpan
                  colorToken="--text-modal-header-neutral-default"
                  font="body-l-bold"
                >
                  {t(`noumena.chamber_edit.visibility.invites`)}
                </TSpan>
              </S.InviteTitle>
            </>
          )}

          <InviteMembers noumId={spaceId} />
        </ModalBody>
      </Modal>
    );
  },
);
