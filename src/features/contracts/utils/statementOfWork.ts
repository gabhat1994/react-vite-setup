import { type Maybe } from '@/apollo/generated/types';
import { type StatementOfWork, StatementOfWorkStatus } from '../types';

type MaybeStatementOfWork = Maybe<StatementOfWork> | undefined;

function isDraft(statementOfWork: MaybeStatementOfWork) {
  return (
    !statementOfWork || statementOfWork?.status === StatementOfWorkStatus.Draft
  );
}

function isIssued(statementOfWork: MaybeStatementOfWork) {
  return statementOfWork?.status === StatementOfWorkStatus.Issued;
}

function isSigned(statementOfWork: MaybeStatementOfWork) {
  return statementOfWork?.status === StatementOfWorkStatus.Signed;
}

function isAmended(statementOfWork: MaybeStatementOfWork) {
  return statementOfWork?.status === StatementOfWorkStatus.Amended;
}

function isComplete(statementOfWork: MaybeStatementOfWork) {
  return statementOfWork?.isCompleted;
}

function formatDocumentNumber(documentNumber: number) {
  return `S-${documentNumber}`;
}

function formatPdfFileName(
  statementOfWork:
    | Maybe<
        Pick<StatementOfWork, 'title'> &
          Partial<Pick<StatementOfWork, 'SOWNumber'>>
      >
    | undefined,
) {
  if (!statementOfWork) {
    return 'Statement of Work.pdf';
  }

  const numberSuffix = statementOfWork.SOWNumber
    ? ` (${formatDocumentNumber(statementOfWork.SOWNumber)})`
    : '';

  return `${statementOfWork.title}${numberSuffix}.pdf`;
}

export const StatementOfWorkUtils = {
  isDraft,
  isIssued,
  isSigned,
  isAmended,
  isComplete,
  formatDocumentNumber,
  formatPdfFileName,
};
