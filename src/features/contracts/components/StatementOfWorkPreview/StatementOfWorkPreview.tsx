import { sumBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Stack, StackItem } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { CurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { cleanList } from '@/utils/list';
import { DocumentType, type StatementOfWork } from '../../types';
import { AgreementCheckbox } from '../AgreementCheckbox/AgreementCheckbox';
import { DocumentStatusTag } from '../DocumentStatusTag/DocumentStatusTag';
import { EntityDisplay } from '../EntityDisplay/EntityDisplay';
import { LabelValue } from '../LabelValue/LabelValue';
import { Section } from '../Section/Section';
import { SummaryList } from '../SummaryList';
import { ContractAssignment } from './ContractAssignment';
import S from './styles';

import { useStatementOfWorkPermissions } from '../../hooks/statementOfWorkPermissions';
import { useStatementOfWorkPreviewFormContext } from '../../hooks/statementOfWorkPreviewForm';
import { StatementOfWorkUtils } from '../../utils/statementOfWork';
import { getFeesAndOthers } from './getFeesList';
import { DocumentTimeline } from '../DocumentTimeline/DocumentTimeline';

interface StatementOfWorkPreviewProps {
  statementOfWork: StatementOfWork;
  openContractFromSow?: Function;
}

export function StatementOfWorkPreview({
  statementOfWork,
  openContractFromSow,
}: StatementOfWorkPreviewProps) {
  const { t } = useTranslation();

  const {
    formState: { isValid, isSubmitted },
  } = useStatementOfWorkPreviewFormContext();

  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const hasAgreementsError = isSubmitted && !isValid;
  const canSign = StatementOfWorkPermissions.canSign(statementOfWork);

  const deliverables = cleanList(statementOfWork.deliverables);
  const milestones = cleanList(statementOfWork.milestones);
  const fees = cleanList(statementOfWork.fees?.feesData);
  const expenseReimbursement = cleanList(statementOfWork.expenseReimbursement);
  const bonusCommission = cleanList(statementOfWork.commission);

  const shouldDisplaySummary =
    deliverables.length > 0 ||
    milestones.length > 0 ||
    fees.length > 0 ||
    expenseReimbursement.length > 0 ||
    bonusCommission.length > 0;

  const feesAndOthers = getFeesAndOthers(statementOfWork);

  return (
    <Stack gap={24} vertical align="stretch">
      <S.Card>
        <Section
          title={
            <>
              <TSpan font="heading-xs-bold">{statementOfWork.title}</TSpan>
              <DocumentStatusTag status={statementOfWork.status} />
            </>
          }
          titleSideAddon={
            <TSpan font="body-m" colorToken="--text-card-neutral-disabled">
              ID:{' '}
              {StatementOfWorkUtils.formatDocumentNumber(
                statementOfWork.SOWNumber,
              )}
            </TSpan>
          }
        >
          <Stack gap={16} vertical>
            <LabelValue
              label="Scope of Work - Description"
              value={
                <TSpan font="input-m">
                  {statementOfWork.scopeOfWork || '--'}
                </TSpan>
              }
            />
            <Stack gap={24} fullWidth justify="stretch">
              <StackItem grow={1}>
                <LabelValue
                  label="Effective Date"
                  value={
                    statementOfWork.effectiveDate
                      ? formatDateString(
                          ApiPayloadParser.parseDateString(
                            statementOfWork.effectiveDate,
                          ),
                        )
                      : '--'
                  }
                />
              </StackItem>
              <StackItem grow={2} basis="min-content">
                <LabelValue
                  label="Contract Assignment"
                  value={
                    <ContractAssignment
                      contract={statementOfWork.linkedContract}
                      openContractFromSow={openContractFromSow}
                    />
                  }
                />
              </StackItem>
              <StackItem grow={3}>
                <LabelValue
                  label="Noum"
                  value={
                    <EntityDisplay
                      name={statementOfWork.linkedNoum?.name ?? ''}
                      avatarUrl={
                        statementOfWork.linkedNoum?.profileImageThumbnail ??
                        undefined
                      }
                    />
                  }
                />
              </StackItem>
            </Stack>
          </Stack>
        </Section>
      </S.Card>
      {shouldDisplaySummary && (
        <S.Card>
          <Section title="Summary">
            <Stack gap={16} vertical align="stretch">
              {deliverables.length > 0 && (
                <LabelValue
                  gap={16}
                  label="Deliverables"
                  value={
                    <SummaryList.List>
                      {deliverables.map((deliverable, index) => (
                        <SummaryList.Item
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          index={index}
                          title={deliverable?.title ?? ''}
                          description={deliverable?.description ?? undefined}
                          dueDate={
                            deliverable?.dueDate
                              ? ApiPayloadParser.parseDateString(
                                  deliverable?.dueDate,
                                )
                              : undefined
                          }
                        />
                      ))}
                    </SummaryList.List>
                  }
                />
              )}
              {milestones.length > 0 && (
                <LabelValue
                  gap={16}
                  label="Milestones"
                  value={
                    <SummaryList.List>
                      {milestones.map((milestone, index) => (
                        <SummaryList.Item
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          index={index}
                          title={milestone?.title ?? ''}
                          description={milestone?.description ?? undefined}
                          dueDate={
                            milestone?.dueDate
                              ? ApiPayloadParser.parseDateString(
                                  milestone?.dueDate,
                                )
                              : undefined
                          }
                        />
                      ))}
                    </SummaryList.List>
                  }
                />
              )}
              {(fees.length > 0 ||
                expenseReimbursement.length > 0 ||
                bonusCommission.length > 0) && (
                <>
                  <S.Separator />
                  <Section variant="sub-section" title="Fees and other items">
                    <Stack gap={16} vertical fullWidth align="stretch">
                      {' '}
                      <SummaryList.List>
                        {feesAndOthers.map((feeInfo, index) => (
                          <SummaryList.Item
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            {...feeInfo}
                            index={index}
                          />
                        ))}
                      </SummaryList.List>
                      <SummaryList.Total
                        label="Total:"
                        value={convertToCurrency(
                          sumBy(feesAndOthers, 'amount'),
                          CurrencyEnum.Usd,
                          2,
                        )}
                      />
                    </Stack>
                  </Section>
                </>
              )}
            </Stack>
          </Section>
        </S.Card>
      )}

      {statementOfWork.timeline && (
        <S.Card>
          <Section title="Timeline">
            <DocumentTimeline
              items={statementOfWork.timeline}
              buyer={statementOfWork.linkedContract?.buyer}
              serviceProvider={statementOfWork.linkedContract?.seller}
              documentType={DocumentType.Sow}
            />
          </Section>
        </S.Card>
      )}

      <S.Card hasError={hasAgreementsError} id="agreements">
        <Section title="Agreements">
          <Stack gap={16} vertical align="stretch">
            <S.Separator />
            <AgreementCheckbox
              name="isAuthorized"
              label={t(
                'noumena.statement_of_work_preview.agreements.is_authorized',
              )}
              disabled={!canSign}
            />

            <AgreementCheckbox
              name="termsAndConditions"
              label={t(
                'noumena.statement_of_work_preview.agreements.terms_and_conditions',
              )}
              disabled={!canSign}
            />

            <AgreementCheckbox
              name="eSign"
              label={t('noumena.statement_of_work_preview.agreements.e_sign')}
              disabled={!canSign}
            />

            {hasAgreementsError && (
              <TSpan
                font="body-m"
                colorToken="--bg-button-danger-primary-default"
              >
                {t('noumena.contracts_document_preview.agreements.required')}
              </TSpan>
            )}
          </Stack>
        </Section>
      </S.Card>
    </Stack>
  );
}
