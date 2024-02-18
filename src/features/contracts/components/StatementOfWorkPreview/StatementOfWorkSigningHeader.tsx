import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { useStatementOfWorkPermissions } from '../../hooks/statementOfWorkPermissions';
import { type StatementOfWorkBasic } from '../../types';
import * as DocumentHeader from '../DocumentHeader/DocumentHeader';

type StatementOfWorkSigningHeaderProps = {
  statementOfWork: StatementOfWorkBasic | null;
  title: string;
  onGoBack(): void;
  onDownloadPdf(): void;
};

export const StatementOfWorkSigningHeader = ({
  statementOfWork,
  title,
  onGoBack,
  onDownloadPdf,
}: StatementOfWorkSigningHeaderProps) => {
  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  return (
    <>
      <StickyFormHeader
        onGoBack={onGoBack}
        title={title}
        buttons={
          statementOfWork &&
          StatementOfWorkPermissions.canDownloadPdf(statementOfWork) && (
            <DocumentHeader.DownloadPdfButton onClick={onDownloadPdf} />
          )
        }
      />
    </>
  );
};
