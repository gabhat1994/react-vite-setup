import { useMemo } from 'react';
import { type Maybe } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { type ContractBasic } from '../types';
import { ContractUtils } from '../utils/contract';

type MaybeContract = Maybe<ContractBasic> | undefined;

export function useContractPermissions() {
  const { user } = useAuth();

  const currentUserId = user?._id;

  const permissionUtils = useMemo(() => {
    function isOwner(
      contract: MaybeContract,
      userId: string | undefined = currentUserId,
    ) {
      return userId && contract?.createdBy?._id === userId;
    }
    function isSignedByOwner(contract: MaybeContract) {
      // TODO: Change logic when BE adds required fields.
      return ContractUtils.isIssued(contract);
    }
    function isSignedByCounterparty(contract: MaybeContract) {
      // TODO: Change logic when BE adds required fields.
      return (
        ContractUtils.isSigned(contract) || ContractUtils.isAmended(contract)
      );
    }
    function canEdit(contract: MaybeContract) {
      return ContractUtils.isDraft(contract) && isOwner(contract);
    }
    function canDelete(contract: MaybeContract) {
      return (
        (ContractUtils.isDraft(contract) || ContractUtils.isIssued(contract)) &&
        isOwner(contract)
      );
    }
    function canAmend(contract: MaybeContract) {
      // TODO: Enable it back when we add support for it in BE.
      const isAmendingEnabled = false;
      return (
        isAmendingEnabled &&
        ContractUtils.isSigned(contract) &&
        isOwner(contract)
      );
    }

    function canSendForSigning(contract: MaybeContract) {
      return ContractUtils.isDraft(contract) && isOwner(contract);
    }
    function canSignAsCounterparty(contract: MaybeContract) {
      return ContractUtils.isIssued(contract) && !isOwner(contract);
    }
    function canSign(contract: MaybeContract) {
      return canSendForSigning(contract) || canSignAsCounterparty(contract);
    }
    function canDecline(contract: MaybeContract) {
      return canSignAsCounterparty(contract);
    }

    function canSaveDraft(contract: MaybeContract) {
      return ContractUtils.isDraft(contract) && isOwner(contract);
    }

    function canDuplicate(contract: MaybeContract) {
      // TODO: Enable it back when we add support for it in BE.
      const isDuplicationEnabled = false;
      return isOwner(contract) && isDuplicationEnabled;
    }

    function canDownloadPdf(contract: MaybeContract) {
      return !!contract;
    }

    function canResend(contract: MaybeContract) {
      return (
        isOwner(contract) &&
        (ContractUtils.isIssued(contract) || ContractUtils.isSigned(contract))
      );
    }

    function canSeeSummary(contract: MaybeContract) {
      return (
        !ContractUtils.isDraft(contract) || ContractUtils.isComplete(contract)
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
