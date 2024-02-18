import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  generatePath,
  Navigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { SowStatus } from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import routes from '@/constants/routes';
import DocumentPdfThumbnail from '@/features/contracts/components/DocumentPdfThumbnail/DocumentPdfThumbnail';
import { Section } from '@/features/contracts/components/Section/Section';
import {
  StatementOfWorkForm,
  StatementOfWorkFormHeader,
} from '@/features/contracts/components/StatementOfWorkForm';
import { useStatementOfWorkPdf } from '@/features/contracts/hooks/statementOfWorkPdf';
import { StatementOfWorkUtils } from '@/features/contracts/utils/statementOfWork';
import { useToast } from '@/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack, StackItem } from '@/layout';
import SinglePageLayout, { ResponsiveMain } from '@/layout/SinglePageLayout';
import { downloadFileFromUrl } from '@/utils/file';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import S from './styles';
import { useStatementOfWorkFormScreen } from './useStatementOfWorkFormScreen';

type Params = { id?: string };

function StatementOfWorkFormScreen() {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { navigateAndPassOrigin, goBackToOrigin } = useNavigateWithOrigin();
  const [searchParams] = useSearchParams();
  const { isDesktop } = useBreakpoints();
  const { addToast } = useToast();

  const predefinedNoumId = searchParams.get('noumId') ?? undefined;

  const onCreate = useCallback(
    (newId: string) => {
      navigateAndPassOrigin(
        generatePath(routes.STATEMENT_OF_WORK_EDIT, { id: newId }),
        {
          replace: true,
        },
      );
    },
    [navigateAndPassOrigin],
  );

  const {
    form,
    isLoading,
    isEditMode,
    isCreating,
    statementOfWork,
    updateDraft,
    deleteDraft,
  } = useStatementOfWorkFormScreen({
    id,
    noumId: predefinedNoumId,
    onCreate,
  });

  const pdfQuery = useStatementOfWorkPdf({ id });

  const { getValues, setValue } = form;

  const onNoumChange = () => {
    if (getValues('contractId')) {
      setValue('contractId', '');
      addToast(
        'primary',
        'icon',
        t('noumena.statement_of_work_form.toast.noum_changed'),
      );
    }
  };

  const goBackToList = () => {
    goBackToOrigin({ fallbackUrl: ContractToolRoutes.contractManager() });
  };

  if (id && !statementOfWork && !isLoading) {
    return <Navigate to={routes.NOT_FOUND} replace />;
  }

  const pdfDownloadFileName = StatementOfWorkUtils.formatPdfFileName({
    title: form.watch('title'),
    SOWNumber: statementOfWork?.SOWNumber,
  });

  return (
    <FormProvider {...form}>
      <SinglePageLayout>
        <StatementOfWorkFormHeader
          statementOfWork={statementOfWork}
          isEditMode={isEditMode}
          onDeleteDraft={deleteDraft}
          onSaveDraft={updateDraft}
          onSaveDraftSuccess={() => pdfQuery.refetch()}
          onGoBackToList={goBackToList}
        />

        <ResponsiveMain>
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack gap={24}>
              <StackItem grow>
                <StatementOfWorkForm
                  documentStatus={statementOfWork?.status ?? SowStatus.Draft}
                  disableNoum={!!predefinedNoumId}
                  isCreating={isCreating}
                  onNoumChange={onNoumChange}
                  statementOfWork={statementOfWork}
                />
              </StackItem>
              <StackItem basis="390px" shrink={0}>
                <Stack vertical gap={24} grow={false} align="stretch">
                  {isDesktop && (
                    <S.Card>
                      <Section
                        variant="sub-section"
                        title={t(
                          'noumena.statement_of_work_form.document_preview.title',
                        )}
                      >
                        <Stack gap={16} vertical align="stretch">
                          <DocumentPdfThumbnail
                            data={pdfQuery.pdfData}
                            isLoading={pdfQuery.loading}
                            downloadFileName={pdfDownloadFileName}
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
                              'noumena.statement_of_work_form.document_preview.download',
                            )}
                          </Button>
                        </Stack>
                      </Section>
                    </S.Card>
                  )}

                  <StackItem grow={false} shrink>
                    <S.Card>
                      <Section
                        variant="sub-section"
                        title={t(
                          'noumena.statement_of_work_form.disclaimer.title',
                        )}
                      >
                        <TSpan
                          font="body-m"
                          colorToken="--text-card-neutral-default"
                        >
                          {t(
                            'noumena.statement_of_work_form.disclaimer.description',
                          )}
                        </TSpan>
                      </Section>
                    </S.Card>
                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>
          )}
        </ResponsiveMain>
      </SinglePageLayout>
    </FormProvider>
  );
}

export default StatementOfWorkFormScreen;
