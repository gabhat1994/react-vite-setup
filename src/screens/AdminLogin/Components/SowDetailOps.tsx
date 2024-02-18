import { FormProvider } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';
import OpsInvoiceSummaryLayout from '@/layout/OpsInvoiceSummaryLayout';
import { ResponsiveMain } from '@/layout/SinglePageLayout';
import S from '@/screens/InvoiceTool/styles';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import * as DocumentHeader from '@/features/contracts/components/DocumentHeader/DocumentHeader';
import { StatementOfWorkPreview } from '@/features/contracts/components/StatementOfWorkPreview/StatementOfWorkPreview';
import { useStatementOfWorkPreviewScreen } from '@/screens/Contracts/StatementOfWorkPreview/useStatementOfWorkPreviewScreen';
import { useDownloadStatementOfWorkPdfLazy } from '@/features/contracts/hooks/statementOfWorkPdf';
import { StatementOfWorkUtils } from '@/features/contracts/utils/statementOfWork';
import { SowData } from './mockContractInfo';
import { SupportedComponents } from '.';

type TSowDetailOps = {
  sowId: string;
  setState: Function;
  componentFromUrl: string;
};

export const SowDetailOps = ({
  sowId,
  setState,
  componentFromUrl,
}: TSowDetailOps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? undefined;
  const { summary, statementOfWork } = useStatementOfWorkPreviewScreen({
    id: sowId,
  });

  const downloadPdf = useDownloadStatementOfWorkPdfLazy();

  const handleDownloadPdf = () => {
    if (!sowId) {
      return;
    }

    downloadPdf(sowId, StatementOfWorkUtils.formatPdfFileName(statementOfWork));
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
        {!SowData ? (
          <Spinner />
        ) : SowData ? (
          <>
            <S.FormHeaderContainer>
              <StickyFormHeader
                title="Sow Summary"
                buttons={Buttons}
                showBackButton={componentFromUrl !== SupportedComponents.Sow}
                onGoBack={() => {
                  setState?.({
                    sowId: undefined,
                    contractId: id,
                  });
                }}
              />
            </S.FormHeaderContainer>
            <ResponsiveMain>
              <S.Content gap={16} padding="16px 0" oneColumn>
                {summary.isLoading ? (
                  <Spinner />
                ) : statementOfWork ? (
                  <StatementOfWorkPreview
                    statementOfWork={statementOfWork}
                    openContractFromSow={setState}
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
