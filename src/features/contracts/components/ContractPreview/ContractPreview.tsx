import { useTranslation } from 'react-i18next';
import { Infobox } from '@/components/Infobox';
import { TSpan } from '@/components/Typography';
import { Stack, StackItem } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { RouterLink } from '@/components/Link';
import { useContractPermissions } from '../../hooks/contractPermissions';
import { useContractPreviewFormContext } from '../../hooks/contractPreviewForm';
import {
  type Contract,
  DocumentType,
  type StatementOfWorkBasic,
} from '../../types';
import { ContractUtils } from '../../utils/contract';
import { AgreementCheckbox } from '../AgreementCheckbox/AgreementCheckbox';
import { AttachedFileListItem } from '../AttachedFile/AttachedFileListItem';
import { AttachedFileListSkeleton } from '../AttachedFile/AttachedFileListSkeleton';
import { ContactSummary } from '../ContactSummary/ContactSummary';
import { DocumentStatusTag } from '../DocumentStatusTag/DocumentStatusTag';
import { EntityDisplay } from '../EntityDisplay/EntityDisplay';
import { LegalRegionDisplay } from '../LegalRegionDisplay/LegalRegionDisplay';
import { LabelValue } from '../LabelValue/LabelValue';
import { Section } from '../Section/Section';
import S from './styles';
import { ContractToolRoutes } from '../../utils/routes';
import { DocumentTimeline } from '../DocumentTimeline/DocumentTimeline';

interface ContractPreviewProps {
  contract: Contract;
  linkedSows: StatementOfWorkBasic[];
  isLoadingLinkedSows: boolean;
  onLinkedSowClick?: Function;
}

export function ContractPreview({
  contract,
  linkedSows,
  isLoadingLinkedSows,
  onLinkedSowClick,
}: ContractPreviewProps) {
  const { t } = useTranslation();

  const ContractPermissions = useContractPermissions();

  const {
    formState: { isValid, isSubmitted },
  } = useContractPreviewFormContext();

  const hasAgreementsError = isSubmitted && !isValid;

  const canSign = ContractPermissions.canSign(contract);

  return (
    <Stack gap={24} vertical align="stretch">
      <S.Card>
        <Section
          title={
            <>
              <TSpan font="heading-xs-bold">{contract.title}</TSpan>
              <DocumentStatusTag status={contract.status} />
            </>
          }
          titleSideAddon={
            <TSpan font="body-m" colorToken="--text-card-neutral-disabled">
              ID:{' '}
              {ContractUtils.formatDocumentNumber(contract.contractNumber ?? 0)}
            </TSpan>
          }
        >
          <Stack gap={24}>
            <LabelValue
              label="Effective Date"
              value={
                contract.effectiveDate
                  ? formatDateString(
                      ApiPayloadParser.parseDateString(contract.effectiveDate),
                    )
                  : '--'
              }
            />
            <LabelValue
              label="Termination Notice"
              value={
                contract.terminationNoticeInDays
                  ? t('noumena.n_days', {
                      count: contract.terminationNoticeInDays,
                      postProcess: 'interval',
                    })
                  : '--'
              }
            />
            <LabelValue
              label="Governing Law"
              value={
                <LegalRegionDisplay
                  country={contract.legalJurisdiction?.country}
                  region={contract.legalJurisdiction?.state}
                />
              }
            />
            <LabelValue
              label="Arbitration"
              value={
                <LegalRegionDisplay
                  country={contract.arbitrationJurisdiction?.country}
                  region={contract.arbitrationJurisdiction?.state}
                />
              }
            />
            <StackItem grow>
              <LabelValue
                label="Noum"
                value={
                  <EntityDisplay
                    name={contract.linkedNoum?.name ?? ''}
                    avatarUrl={
                      contract.linkedNoum?.profileImageThumbnail ?? undefined
                    }
                  />
                }
              />
            </StackItem>
          </Stack>
        </Section>
      </S.Card>
      <S.Card>
        <Stack gap={16} vertical align="stretch">
          <Stack align="stretch">
            <Section variant="sub-section" title="Buyer">
              {contract.buyer ? (
                <ContactSummary contact={contract.buyer} />
              ) : (
                '--'
              )}
            </Section>
            <Section variant="sub-section" title="Service Provider">
              {contract.seller ? (
                <ContactSummary contact={contract.seller} />
              ) : (
                '--'
              )}
            </Section>
          </Stack>
          <S.Separator />
          <Section variant="sub-section" title="Statement of Work">
            <Stack vertical gap={8} align="stretch">
              {isLoadingLinkedSows ? (
                <AttachedFileListSkeleton rows={3} />
              ) : linkedSows.length > 0 ? (
                linkedSows.map((statementOfWork) =>
                  onLinkedSowClick ? (
                    <S.SowButtonLink
                      key={statementOfWork._id}
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => {}}
                      onClick={() => {
                        onLinkedSowClick({
                          contractId: undefined,
                          sowId: statementOfWork._id,
                        });
                      }}
                    >
                      <AttachedFileListItem
                        title={statementOfWork.title ?? '--'}
                      />
                    </S.SowButtonLink>
                  ) : (
                    <RouterLink
                      key={statementOfWork._id}
                      to={ContractToolRoutes.viewStatementOfWork({
                        id: statementOfWork._id,
                      })}
                    >
                      <AttachedFileListItem
                        title={statementOfWork.title ?? '--'}
                      />
                    </RouterLink>
                  ),
                )
              ) : (
                <>
                  <S.NoSOWsValue>None</S.NoSOWsValue>
                  {ContractPermissions.isOwner(contract) && (
                    <Infobox type="secondary">
                      {t('noumena.contract_preview.no_sows.infobox')}
                    </Infobox>
                  )}
                </>
              )}
            </Stack>
          </Section>
        </Stack>
      </S.Card>

      {contract.timeline && (
        <S.Card>
          <Section title="Timeline">
            <DocumentTimeline
              items={contract.timeline}
              buyer={contract.buyer}
              serviceProvider={contract.seller}
              documentType={DocumentType.Contract}
            />
          </Section>
        </S.Card>
      )}

      <S.Card hasError={hasAgreementsError} id="agreements">
        <Section title="Agreements" hasSeparator>
          <Stack gap={16} vertical align="stretch">
            <AgreementCheckbox
              name="isAuthorized"
              label={t('noumena.contract_preview.agreements.is_authorized')}
              disabled={!canSign}
            />

            <AgreementCheckbox
              name="termsAndConditions"
              label={t(
                'noumena.contract_preview.agreements.terms_and_conditions',
              )}
              disabled={!canSign}
            />

            <AgreementCheckbox
              name="eSign"
              label={t('noumena.contract_preview.agreements.e_sign')}
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
