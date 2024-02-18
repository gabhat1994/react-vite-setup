import { t } from 'i18next';
import { useState } from 'react';

import { Spacer, Stack } from '@/layout';
import { useToggle } from '@/hooks';
import { Icon, TSpan } from '@/components';

import { Wrapper, Button } from './styles';
import { EventURLCopyButton, InviteAttendeeModal } from '../components';

export const InviteAndShareModal = () => {
  const [openShareModal, toggle] = useToggle(true);
  const [showInviteAttendee, setShowInviteAttendee] = useState(false);

  const onInviteUsers = () => {
    toggle();
    setShowInviteAttendee(true);
  };

  if (showInviteAttendee) {
    return (
      <InviteAttendeeModal
        isOpen={true}
        handleClose={() => setShowInviteAttendee(false)}
      />
    );
  }

  if (openShareModal) {
    return (
      <Wrapper vertical data-testid="invite-and-share-modal-wrapper">
        <Stack fullWidth justify="space-between">
          <TSpan
            font="body-l-bold"
            colorToken="--text-card-neutral-highlighted"
          >
            {t('noumena.socialhall.invite_and_share_modal.heading')}
          </TSpan>
          <Icon
            onClick={toggle}
            name="close_m"
            color="--icon-card-neutral-default"
            size={24}
          />
        </Stack>
        <Spacer height={16} />
        <Button
          size="small"
          onClick={onInviteUsers}
          primary
          icon={<Icon name="person_add" size={24} />}
        >
          {t('noumena.socialhall.invite_and_share_modal.invite_user-btn')}
        </Button>
        <Spacer height={12} />
        <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
          {t('noumena.socialhall.invite_and_share_modal.link_copy')}
        </TSpan>
        <Spacer height={12} />
        <EventURLCopyButton font="input-s" />
        <Spacer height={4} />
        <TSpan
          font="footnote"
          colorToken="--text-tablecell-body-neutral-default"
        >
          {t('noumena.socialhall.invite_and_share_modal.link_copy_note')}
        </TSpan>
      </Wrapper>
    );
  }

  return null;
};
