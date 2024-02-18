import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

import { useBreakpoints } from '@/hooks/useBreakpoints';
import S from './styles';
import type * as Type from './types';

function Delete({ onDelete, isMobile, isTablet }: Type.Delete) {
  return (
    <Button
      onClick={onDelete}
      secondary
      size="small"
      intent="negative"
      leftIcon={<Icon name="delete_m" size={22} />}
    >
      {isMobile || isTablet ? '' : 'Delete'}
    </Button>
  );
}

function Download({ onDownload }: Type.Download) {
  const devices = useBreakpoints();
  return (
    <Button
      size="small"
      leftIcon={<Icon name="download_m" size={16} />}
      tertiary
      onClick={onDownload}
    >
      {devices.isMobile ? '' : 'Download PDF'}
    </Button>
  );
}

function AcceptAndPay({ onAcceptAndPay, disableButtons }: Type.AcceptAndPay) {
  return (
    <Button
      disabled={disableButtons}
      size="small"
      primary
      intent="positive"
      leftIcon={<Icon name="tick_m" size={20} />}
      onClick={onAcceptAndPay}
    >
      Accept and Pay
    </Button>
  );
}

function Reject({ onReject, disableButtons }: Type.Reject) {
  return (
    <Button
      disabled={disableButtons}
      size="small"
      secondary
      intent="negative"
      onClick={onReject}
    >
      Reject
    </Button>
  );
}

function Duplicate({ onDuplicate }: Type.Duplicate) {
  return (
    <Button
      onClick={onDuplicate}
      size="small"
      tertiary
      leftIcon={<Icon name="copy_m" size={22} />}
    >
      Duplicate
    </Button>
  );
}

function SubmitRequest({
  onSubmitRequest,
  submitDisabled,
  isMobile,
  isTablet,
  loading,
}: Type.SubmitRequest) {
  return (
    <Button
      onClick={onSubmitRequest}
      disabled={submitDisabled}
      primary
      intent="positive"
      size="small"
      loading={loading}
    >
      {isMobile || isTablet ? 'Submit' : 'Submit Your Request'}
    </Button>
  );
}

// Actions

function OfferActions({
  onDownload,
  onAcceptAndPay,
  onReject,
  hideRejectButton,
  disableButtons,
  hideAcceptAndPay,
}: Type.OfferAction) {
  return (
    <S.Action>
      <Download onDownload={onDownload} />
      {hideRejectButton || (
        <Reject disableButtons={disableButtons} onReject={onReject} />
      )}
      {hideAcceptAndPay || (
        <AcceptAndPay
          disableButtons={disableButtons}
          onAcceptAndPay={onAcceptAndPay}
        />
      )}
    </S.Action>
  );
}

function SummaryActions({
  isMobile,
  isTablet,
  hideDelete,
  onDuplicate,
  onDelete,
}: Type.SummaryAction) {
  return (
    <S.Action>
      <Duplicate onDuplicate={onDuplicate} />
      {hideDelete || (
        <Delete
          isTablet={isTablet}
          isMobile={isMobile}
          deleteDisabled={false}
          onDelete={onDelete}
        />
      )}
    </S.Action>
  );
}

function FormAction({
  isMobile,
  isTablet,
  onDelete,
  onSubmitRequest,
  deleteDisabled = false,
  submitDisabled = false,
  loading = false,
}: Type.FormAction) {
  return (
    <S.Action>
      <Delete
        isMobile={isMobile}
        isTablet={isTablet}
        deleteDisabled={deleteDisabled}
        onDelete={onDelete}
      />
      <SubmitRequest
        isMobile={isMobile}
        isTablet={isTablet}
        loading={loading}
        submitDisabled={submitDisabled}
        onSubmitRequest={onSubmitRequest}
      />
    </S.Action>
  );
}

export const Actions = { OfferActions, SummaryActions, FormAction };
