import { Modal, ModalHeader, ModalSize } from '@/components/ExtendedModal';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useBreakpoints } from '@/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import * as S from './styles';
import { InviteMemberTabId } from './types';
import { type InviteMembersValues } from './InviteMembers/ViaNoumMembers/InviteMember/schema';
import { type InviteNonMemberValues } from './InviteMembers/ViaNoumMembers/InviteNonMember/schema';
import { InviteMemberForm } from './InviteMembers/ViaNoumMembers/InviteMember';
import { InviteNonMemberForm } from './InviteMembers/ViaNoumMembers/InviteNonMember';
import { inviteMembersTabInputList } from './InviteMembers/constants';

interface ChamberInviteModalProps {
  isOpen: boolean;
  noumId: string;
  onClose(): void;
  onInviteMembers: (values: InviteMembersValues) => Promise<void>;
  onInviteNonMembers: (values: InviteNonMemberValues) => Promise<void>;
}

export function ChamberInviteModal({
  isOpen,
  onClose,
  noumId,
  onInviteMembers,
  onInviteNonMembers,
}: ChamberInviteModalProps) {
  const { t } = useTranslation();
  const { isMobile, windowDimensions } = useBreakpoints();

  const [activeTabId, setActiveTabId] = useState<InviteMemberTabId>(
    InviteMemberTabId.NoumenaMembers,
  );

  return (
    <Modal
      testId="chamber-invite-modal"
      open={isOpen}
      onClose={onClose}
      enableCloseButton
      size={ModalSize.XL}
      disableBackdropClick
    >
      <ModalHeader justifyContent={isMobile ? 'flex-start' : 'center'}>
        {t(`noumena.noums.member_management.invite_members.modal.title`)}
      </ModalHeader>
      <Stack vertical gap={16} fullWidth>
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          {t(
            'noumena.noums.member_management.invite_members.modal.description',
          )}
        </TSpan>
        <S.TabSection>
          <BasicChipsTabsForm<InviteMemberTabId>
            inputList={inviteMembersTabInputList}
            onChange={setActiveTabId}
            selectedId={activeTabId}
            mode="isUnderline"
            isWithoutImage
            fontSize={
              isMobile ? '--font-input-small-size' : '--font-button-medium-size'
            }
            tabWidth={
              isMobile ? `${windowDimensions.width / 2 - 32}px` : '100%'
            }
            isMobile={isMobile}
            windowSize={windowDimensions.width - 20}
          />
        </S.TabSection>
      </Stack>
      <Spacer height={16} />
      {activeTabId === InviteMemberTabId.NoumenaMembers && (
        <InviteMemberForm
          noumId={noumId}
          onSubmit={onInviteMembers}
          onCancel={onClose}
        />
      )}
      {activeTabId === InviteMemberTabId.NonNoumenaMembers && (
        <InviteNonMemberForm onSubmit={onInviteNonMembers} onCancel={onClose} />
      )}
    </Modal>
  );
}
