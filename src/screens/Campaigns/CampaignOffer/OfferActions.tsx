import { useState } from 'react';

import { Button } from '@/components/Button';
import * as EM from '@/components/ExtendedModal';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';

import { type Action } from './types';

type OfferActionsProps = {
  open: boolean;
  actionButtonLoading?: boolean;
  action: Action;
  onClose: () => void;
  onAction: (modalType: Action, rejectedReason: string) => void;
};

export function OfferActions({
  open,
  action,
  onClose,
  onAction,
  actionButtonLoading = false,
}: OfferActionsProps) {
  const [rejectedReason, setRejectedReason] = useState('');
  return (
    <EM.Modal open={open} enableCloseButton onClose={onClose}>
      <EM.ModalHeader>
        {action === 'accept' ? 'Terms & Conditions' : 'Reject'}
      </EM.ModalHeader>
      <EM.ModalBody>
        <Stack vertical maxWidth={400} align="center" justify="center">
          <TSpan
            font="body-l"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            {action === 'accept'
              ? `I acknowledge and accept that Noumena does not guarantee a 100%
            efficiency rate, as the outcome of the campaign will be influenced
            by various market factors beyond Noumena's control.`
              : `Please provide a reason for rejecting this offer to help us improve our offerings in the future.`}
          </TSpan>
          {action === 'reject' && (
            <>
              <Spacer height={16} />
              <TextField
                value={rejectedReason}
                fullWidth
                label="Reason (optional)"
                autoFocus
                onChange={(e) => setRejectedReason(e.target.value)}
              />
            </>
          )}
        </Stack>
      </EM.ModalBody>
      <EM.ModalFooter gap={16} justifyContent="center">
        <Button size="full" tertiary onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="full"
          primary
          loading={actionButtonLoading}
          intent={action === 'accept' ? 'positive' : 'negative'}
          onClick={() => onAction(action, rejectedReason)}
        >
          {action === 'accept' ? 'I Agree' : 'Reject'}
        </Button>
      </EM.ModalFooter>
    </EM.Modal>
  );
}
