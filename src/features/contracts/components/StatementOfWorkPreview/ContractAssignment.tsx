import { Trans } from 'react-i18next';
import { type Maybe } from '@/apollo/generated/types';
import { type SowLinkedContractFragment } from '@/apollo/graphql';
import { Infobox } from '@/components/Infobox';
import { RouterLink } from '@/components/Link';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { Stack } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { useAuth } from '@/features/auth/contexts';
import { ContractUtils } from '../../utils/contract';
import { ContractToolRoutes } from '../../utils/routes';
import { AttachedFile } from '../AttachedFile/AttachedFile';
import { LabelValue } from '../LabelValue/LabelValue';
import S from './styles';

interface ContractAssignmentProps {
  contract: Maybe<SowLinkedContractFragment> | undefined;
  openContractFromSow?: Function;
}

export function ContractAssignment({
  contract,
  openContractFromSow,
}: ContractAssignmentProps) {
  const { isOpsUser } = useAuth();
  if (!contract?.title) {
    return <>-</>;
  }

  return (
    <Stack gap={8} align="stretch" vertical fullWidth>
      {isOpsUser ? (
        <S.ContractButtonLink
          role="button"
          tabIndex={0}
          onKeyPress={() => {}}
          onClick={() => {
            openContractFromSow?.({
              sowId: undefined,
              contractId: contract._id,
            });
          }}
        >
          <AttachedFile
            title={ContractUtils.formatDocumentNameWithNumber(contract)}
          />
        </S.ContractButtonLink>
      ) : (
        <RouterLink
          to={ContractToolRoutes.viewContract({ id: contract._id })}
          passState
        >
          <AttachedFile
            title={ContractUtils.formatDocumentNameWithNumber(contract)}
          />
        </RouterLink>
      )}
      <Stack gap={4} align="stretch" vertical fullWidth>
        <LabelValue
          size="small"
          layout="horizontal"
          label="Buyer"
          value={
            contract.buyer
              ? ContactDetailsUtils.formatCompanyAndName(contract.buyer)
              : '--'
          }
        />
        <LabelValue
          size="small"
          layout="horizontal"
          label="Provider"
          value={
            contract.seller
              ? ContactDetailsUtils.formatCompanyAndName(contract.seller)
              : '--'
          }
        />
        <LabelValue
          size="small"
          layout="horizontal"
          label="Effective Date"
          value={
            contract.effectiveDate
              ? formatDateString(
                  ApiPayloadParser.parseDateString(contract.effectiveDate),
                )
              : '--'
          }
        />
      </Stack>
      {ContractUtils.isDraft(contract) && (
        <Infobox type="secondary" size="small">
          <Trans
            i18nKey="noumena.statement_of_work_preview.hint.draft_contract"
            components={{ b: <b /> }}
          />
        </Infobox>
      )}
    </Stack>
  );
}
