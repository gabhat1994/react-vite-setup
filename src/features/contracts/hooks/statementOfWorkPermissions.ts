import { useMemo } from 'react';
import { type Maybe } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { type StatementOfWorkBasic } from '../types';
import { StatementOfWorkUtils } from '../utils/statementOfWork';

type MaybeStatementOfWork = Maybe<StatementOfWorkBasic> | undefined;

export function useStatementOfWorkPermissions() {
  const { user } = useAuth();

  const currentUserId = user?._id;

  const permissionUtils = useMemo(() => {
    function isOwner(statementOfWork: MaybeStatementOfWork) {
      return currentUserId && statementOfWork?.createdBy?._id === currentUserId;
    }
    function isSignedByOwner(statementOfWork: MaybeStatementOfWork) {
      // TODO: Change logic when BE adds required fields.
      return StatementOfWorkUtils.isIssued(statementOfWork);
    }
    function isSignedByCounterparty(statementOfWork: MaybeStatementOfWork) {
      // TODO: Change logic when BE adds required fields.
      return (
        StatementOfWorkUtils.isSigned(statementOfWork) ||
        StatementOfWorkUtils.isAmended(statementOfWork)
      );
    }
    function canEdit(statementOfWork: MaybeStatementOfWork) {
      return (
        StatementOfWorkUtils.isDraft(statementOfWork) &&
        isOwner(statementOfWork)
      );
    }
    function canDelete(statementOfWork: MaybeStatementOfWork) {
      return (
        (StatementOfWorkUtils.isDraft(statementOfWork) ||
          StatementOfWorkUtils.isIssued(statementOfWork)) &&
        isOwner(statementOfWork)
      );
    }
    function canAmend(statementOfWork: MaybeStatementOfWork) {
      // TODO: Enable it back when we add support for it in BE.
      const isAmendingEnabled = false;
      return (
        isAmendingEnabled &&
        StatementOfWorkUtils.isSigned(statementOfWork) &&
        isOwner(statementOfWork)
      );
    }

    function canSendForSigning(statementOfWork: MaybeStatementOfWork) {
      return (
        StatementOfWorkUtils.isDraft(statementOfWork) &&
        isOwner(statementOfWork)
      );
    }
    function canSignAsCounterparty(statementOfWork: MaybeStatementOfWork) {
      return (
        StatementOfWorkUtils.isIssued(statementOfWork) &&
        !isOwner(statementOfWork)
      );
    }
    function canSign(statementOfWork: MaybeStatementOfWork) {
      return (
        canSendForSigning(statementOfWork) ||
        canSignAsCounterparty(statementOfWork)
      );
    }
    function canDecline(statementOfWork: MaybeStatementOfWork) {
      return canSignAsCounterparty(statementOfWork);
    }

    function canSaveDraft(statementOfWork: MaybeStatementOfWork) {
      return (
        StatementOfWorkUtils.isDraft(statementOfWork) &&
        isOwner(statementOfWork)
      );
    }

    function canDuplicate(statementOfWork: MaybeStatementOfWork) {
      // TODO: Enable it back when we add support for it in BE.
      const isDuplicationEnabled = false;
      return isDuplicationEnabled && isOwner(statementOfWork);
    }

    function canDownloadPdf(statementOfWork: MaybeStatementOfWork) {
      return !!statementOfWork;
    }

    function canResend(statementOfWork: MaybeStatementOfWork) {
      return (
        isOwner(statementOfWork) &&
        (StatementOfWorkUtils.isIssued(statementOfWork) ||
          StatementOfWorkUtils.isSigned(statementOfWork))
      );
    }

    function canSeeSummary(statementOfWork: MaybeStatementOfWork) {
      return (
        !StatementOfWorkUtils.isDraft(statementOfWork) ||
        StatementOfWorkUtils.isComplete(statementOfWork)
      );
    }

    return {
      isOwner,
      isSignedByOwner,
      isSignedByCounterparty,
      canEdit,
      canDelete,
      canAmend,
      canSendForSigning,
      canSign,
      canDecline,
      canSaveDraft,
      canDuplicate,
      canDownloadPdf,
      canResend,
      canSeeSummary,
    };
  }, [currentUserId]);

  return permissionUtils;
}
