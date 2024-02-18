import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import routes from '@/constants/routes';
import {
  ContractForm,
  ContractFormHeader,
} from '@/features/contracts/components/ContractForm';
import DocumentPdfThumbnail from '@/features/contracts/components/DocumentPdfThumbnail/DocumentPdfThumbnail';
import { Section } from '@/features/contracts/components/Section/Section';
import { ContractStatus } from '@/features/contracts/types';
import { ContractUtils } from '@/features/contracts/utils/contract';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack, StackItem } from '@/layout';
import SinglePageLayout, { ResponsiveMain } from '@/layout/SinglePageLayout';
import { downloadFileFromUrl } from '@/utils/file';
import { useContractPdf } from '@/features/contracts/hooks/contractPdf';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { LinkedStatementsOfWorkForm } from '@/features/contracts/components/LinkedStatementsOfWork';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { useContractFormScreen } from './useContractFormScreen';
import S from './styles';

type Params = { id?: string };

export default function ContractCreateEdit() {
  const { id } = useParams<Params>();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { isDesktop } = useBreakpoints();
  const { navigateAndPassOrigin, goBackToOrigin } = useNavigateWithOrigin();

  const predefinedNoumId = searchParams.get('noumId') ?? undefined;

  const onCreate = useCallback(
    (newId: string) => {
      navigateAndPassOrigin(
        ContractToolRoutes.editContract({
          id: newId,
          noumId: predefinedNoumId,
        }),
        { replace: true },
      );
    },
    [navigateAndPassOrigin, predefinedNoumId],
  );

  const {
    form,
    isLoading,
    isEditMode,
    isCreating,
    contract,
    sowLinking,
    deleteDraft,
    saveDraft,
  } = useContractFormScreen({ id, noumId: predefinedNoumId, onCreate });

  const pdfQuery = useContractPdf({ id: contract?._id });

  const goBackToList = () => {
    goBackToOrigin({ fallbackUrl: ContractToolRoutes.contractManager() });
  };

  if (id && !contract && !isLoading) {
    return <Navigate to={routes.NOT_FOUND} replace />;
  }

  const pdfDownloadFileName = ContractUtils.formatPdfFileName({
    title: form.watch('title'),
    contractNumber: contract?.contractNumber,
  });

  return (
    <SinglePageLayout>
      <FormProvider {...form}>
        <ContractFormHeader
          contract={contract}
          isEditMode={isEditMode}
          onSaveDraft={saveDraft}
          onSaveDraftSuccess={() => pdfQuery.refetch()}
          onDeleteDraft={deleteDraft}
          onGoBackToList={goBackToList}
        />

        <ResponsiveMain>
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack gap={24}>
              <StackItem grow>
                <Stack gap={isDesktop ? 24 : 8} vertical align="stretch">
                  <ContractForm
                    documentStatus={contract?.status ?? ContractStatus.Draft}
                    disableNoum={!!predefinedNoumId}
                    isPreDraft={isCreating || !isEditMode}
                    contract={contract}
                    onContactDetailsUpdated={() => pdfQuery.refetch()}
                  />
                  {!!contract && (
                    <S.Card>
                      <Section
                        title={t(
                          'noumena.contract_form.fields.sow_attachment.title',
                        )}
                        optional
                        hasSeparator
                      >
                        <Stack gap={16} vertical align="stretch">
                          {sowLinking.linkedSows.loading ? (
                            <>
                              <Skeleton height={32} />
                              <Skeleton height={32} />
                              <Skeleton height={32} />
                            </>
                          ) : sowLinking.linkedSows.data.length > 0 ||
                            sowLinking.unlinkedSows.data.length > 0 ? (
                            <>
                              <S.StatementOfWorkDescription>
                                {t(
                                  'noumena.contract_form.statement_of_work_attachment.description',
                                )}
                              </S.StatementOfWorkDescription>

                              <LinkedStatementsOfWorkForm
                                linkedSows={sowLinking.linkedSows.data}
                                unlinkedSows={sowLinking.unlinkedSows.data}
                              />
                            </>
                          ) : (
                            <S.StatementOfWorkDescription>
                              {t(
                                'noumena.contract_form.statement_of_work_attachment.none_available.description',
                              )}
                            </S.StatementOfWorkDescription>
                          )}
                        </Stack>
                      </Section>
                    </S.Card>
                  )}
                </Stack>
              </StackItem>
              <StackItem basis="390px">
                <Stack vertical gap={24} grow={false} align="stretch">
                  {isDesktop && (
                    <S.Card>
                      <Section
                        title={t(
                          'noumena.contract_form.contract_preview.title',
                        )}
                        variant="sub-section"
                      >
                        <Stack gap={16} vertical align="stretch">
                          <DocumentPdfThumbnail
                            data={pdfQuery.pdfData}
                            downloadFileName={pdfDownloadFileName}
                            isLoading={pdfQuery.loading}
                          />
                          <Button
                            tertiary
                            icon={<Icon name="download_m" size={24} />}
                            disabled={!pdfQuery.pdfData}
                            onClick={() => {
                              if (pdfQuery.pdfData) {
                                downloadFileFromUrl(
                                  pdfQuery.pdfData,
                                  'application/pdf',
                                  pdfDownloadFileName,
                                );
                              }
                            }}
                          >
                            {t(
                              'noumena.contract_form.contract_preview.download',
                            )}
                          </Button>
                        </Stack>
                      </Section>
                    </S.Card>
                  )}

                  <StackItem grow={false} shrink>
                    <S.Card>
                      <Section
                        title={t('noumena.contract_form.disclaimer.title')}
                        variant="sub-section"
                      >
                        <TSpan
                          font="body-m"
                          colorToken="--text-card-neutral-default"
                        >
                          {t('noumena.contract_form.disclaimer.description')}
                        </TSpan>
                      </Section>
                    </S.Card>
                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>
          )}
        </ResponsiveMain>
      </FormProvider>
    </SinglePageLayout>
  );
}
