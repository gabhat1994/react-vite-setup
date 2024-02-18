import { FormProvider } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';
import { ContractPreview } from '@/features/contracts/components/ContractPreview';
import OpsInvoiceSummaryLayout from '@/layout/OpsInvoiceSummaryLayout';
import { ResponsiveMain } from '@/layout/SinglePageLayout';
import S from '@/screens/InvoiceTool/styles';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import * as DocumentHeader from '@/features/contracts/components/DocumentHeader/DocumentHeader';
import { useContractPreviewScreen } from '@/screens/Contracts/ContractPreview/useContractPreviewScreen';
import { ContractUtils } from '@/features/contracts/utils/contract';
import { useDownloadContractPdfLazy } from '@/features/contracts/hooks/contractPdf';
import { data } from './mockContractInfo';
import { SupportedComponents } from '.';

type TContractDetailOps = {
  contractId: string;
  setState: Function;
  componentFromUrl: string;
};
export const ContractDetailOps = ({
  contractId,
  setState,
  componentFromUrl,
}: TContractDetailOps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? undefined;
  const { summary, contract, linkedSows } = useContractPreviewScreen({
    id: contractId,
  });

  const downloadPdf = useDownloadContractPdfLazy();

  const handleDownloadPdf = () => {
    if (!contractId) {
      return;
    }

    downloadPdf(contractId, ContractUtils.formatPdfFileName(contract));
  };

  const Buttons = (
    <>
      <DocumentHeader.DownloadPdfButton
        onClick={() => {
          handleDownloadPdf();
        }}
      />
    </>
  );

  return (
    <OpsInvoiceSummaryLayout>
      <FormProvider {...summary.form}>
        {!data ? (
          <Spinner />
        ) : data ? (
          <>
            <S.FormHeaderContainer>
              <StickyFormHeader
                title="Contract Summary"
                buttons={Buttons}
                showBackButton={
                  componentFromUrl !== SupportedComponents.Contract
                }
                onGoBack={() => {
                  setState?.({
                    sowId: id,
                    contractId: undefined,
                  });
                }}
              />
            </S.FormHeaderContainer>
            <ResponsiveMain>
              <S.Content gap={16} padding="16px 0" oneColumn>
                {summary.isLoading ? (
                  <Spinner />
                ) : contract ? (
                  <ContractPreview
                    contract={contract}
                    linkedSows={linkedSows.data}
                    isLoadingLinkedSows={linkedSows.loading}
                    onLinkedSowClick={setState}
                  />
                ) : null}
              </S.Content>
            </ResponsiveMain>
          </>
        ) : null}
      </FormProvider>
    </OpsInvoiceSummaryLayout>
  );
};
