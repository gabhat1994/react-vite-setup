import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import { useState } from 'react';
import * as S from '../../styles';
import { InviteMemberTabId } from '../../types';
import { inviteMembersTabInputList } from '../constants';
import InviteMemberTab from './Tabs/InviteMemberTab';
import InviteNonMemberTab from './Tabs/InviteNonMemberTab';

interface InviteMembersProps {
  noumId: string;
}

export function InviteMembers({ noumId }: InviteMembersProps) {
  const { flags } = useLaunchDarkly();
  const [activeTabId, setActiveTabId] = useState<InviteMemberTabId>(
    InviteMemberTabId.NoumenaMembers,
  );

  const { isMobile, windowDimensions } = useBreakpoints();

  return flags.nonNmUsers ? (
    <>
      <S.TabSection>
        <BasicChipsTabsForm<InviteMemberTabId>
          inputList={inviteMembersTabInputList}
          onChange={setActiveTabId}
          selectedId={activeTabId}
          mode="isUnderline"
          isWithoutImage
          fontSize={
            isMobile ? '--font-input-small-size' : '--font-button-small-size'
          }
          tabWidth={isMobile ? `${windowDimensions.width / 2 - 32}px` : '100%'}
          isMobile={isMobile}
          windowSize={windowDimensions.width}
          textFont="--font-body-medium-regular-font"
        />
      </S.TabSection>
      <S.TabContent>
        {activeTabId === InviteMemberTabId.NoumenaMembers && (
          <InviteMemberTab spaceId={noumId} />
        )}
        {activeTabId === InviteMemberTabId.NonNoumenaMembers && (
          <InviteNonMemberTab spaceId={noumId} />
        )}
      </S.TabContent>
    </>
  ) : (
    <InviteMemberTab spaceId={noumId} />
  );
}
