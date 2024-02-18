import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { useContractPermissions } from '../../hooks/contractPermissions';
import { type Contract } from '../../types';
import * as DocumentHeader from '../DocumentHeader/DocumentHeader';

type ContractSigningHeaderProps = {
  contract: Contract | null;
  title: string;
  onGoBack(): void;
  onDownloadPdf(): void;
};

export const ContractSigningHeader = ({
  contract,
  title,
  onGoBack,
  onDownloadPdf,
}: ContractSigningHeaderProps) => {
  const ContractPermissions = useContractPermissions();

  return (
    <>
      <StickyFormHeader
        onGoBack={onGoBack}
        title={title}
        buttons={
          contract &&
          ContractPermissions.canDownloadPdf(contract) && (
            <DocumentHeader.DownloadPdfButton onClick={onDownloadPdf} />
          )
        }
      />
    </>
  );
};
