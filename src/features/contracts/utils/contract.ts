import { type Maybe } from '@/apollo/generated/types';
import { type ContractBasic, ContractStatus } from '../types';

type MaybeContract = Maybe<ContractBasic> | undefined;

function isDraft(contract: MaybeContract) {
  return !contract || contract?.status === ContractStatus.Draft;
}

function isIssued(contract: MaybeContract) {
  return contract?.status === ContractStatus.Issued;
}

function isSigned(contract: MaybeContract) {
  return contract?.status === ContractStatus.Signed;
}

function isAmended(contract: MaybeContract) {
  return contract?.status === ContractStatus.Amended;
}

function isComplete(contract: MaybeContract) {
  return !!contract?.isCompleted;
}

function formatDocumentNumber(contractNumber: number) {
  return `C-${contractNumber}`;
}

function formatPdfFileName(
  contract:
    | Maybe<
        Pick<ContractBasic, 'title'> &
          Partial<Pick<ContractBasic, 'contractNumber'>>
      >
    | undefined,
) {
  if (!contract) {
    return 'Service Agreement.pdf';
  }

  const numberSuffix = contract.contractNumber
    ? ` (${formatDocumentNumber(contract.contractNumber)})`
    : '';

  return `${contract.title}${numberSuffix}.pdf`;
}

function formatDocumentNameWithNumber(
  contract: Maybe<Pick<ContractBasic, 'title' | 'contractNumber'>> | undefined,
) {
  return [
    contract?.title,
    contract?.contractNumber
      ? `(${formatDocumentNumber(contract?.contractNumber)})`
      : undefined,
  ]
    .filter(Boolean)
    .join(' ');
}

export const ContractUtils = {
  isDraft,
  isIssued,
  isSigned,
  isAmended,
  isComplete,
  formatDocumentNumber,
  formatDocumentNameWithNumber,
  formatPdfFileName,
};
