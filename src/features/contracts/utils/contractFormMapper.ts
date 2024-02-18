import { type DeepPartial } from 'react-hook-form';
import { orderBy } from 'lodash';
import {
  type ContractInput,
  type CreateNewContractInput,
} from '@/apollo/generated/types';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { cleanList } from '@/utils/list';
import { convertDateToUtcNoon } from '@/utils/date';
import {
  type ContractFormValues,
  type DraftContractFormValues,
} from '../hooks/contractForm';
import { type Contract, type StatementOfWorkBasic } from '../types';
import { StatementOfWorkUtils } from './statementOfWork';

function toCreateNewContractInput(
  values: DraftContractFormValues,
): CreateNewContractInput {
  return {
    title: values.title ?? '',
    linkedNoum: values.noumId,
  };
}

function toUpdateContractInput(values: DraftContractFormValues): ContractInput {
  const terminationNotice = parseInt(values.terminationNotice ?? '', 10);

  return {
    title: values.title,
    linkedNoum: values.noumId,
    buyer: values.buyerId || null,
    seller: values.serviceProviderId || null,
    effectiveDate: values.effectiveDate
      ? convertDateToUtcNoon(values.effectiveDate)
      : null,
    legalJurisdiction: {
      country: values.governingLaw?.country,
      // TODO: Adjust once BE migrates to two-level approach.
      state: values.governingLaw?.region,
    },
    arbitrationJurisdiction: {
      country: values.arbitration?.country,
      // TODO: Adjust once BE migrates to two-level approach.
      state: values.arbitration?.region,
    },
    terminationNoticeInDays: Number.isInteger(terminationNotice)
      ? terminationNotice
      : null,
    // TODO: Change after adding the logo uploader.
    logo: undefined,
    templateName: undefined,
  };
}

function fromContract(contract: Contract): DeepPartial<ContractFormValues> {
  if (!contract.linkedNoum._id) {
    throw new Error('Invalid linkedNoum for provided contract.');
  }

  const defaultValues = getDefaultValues({ noumId: contract.linkedNoum._id });

  return {
    noumId: contract.linkedNoum._id,
    title: contract.title ?? defaultValues.title,
    buyerId: contract.buyer?._id ?? defaultValues.buyerId,
    serviceProviderId: contract.seller?._id ?? defaultValues.serviceProviderId,
    effectiveDate:
      ApiPayloadParser.parseDateString(contract.effectiveDate) ??
      defaultValues.effectiveDate,
    terminationNotice: (
      contract.terminationNoticeInDays || defaultValues.terminationNotice
    )?.toString(),
    arbitration: {
      country:
        contract.arbitrationJurisdiction?.country ??
        defaultValues.arbitration?.country,
      // TODO: Adjust once BE migrates to two-level approach.
      region:
        contract.arbitrationJurisdiction?.state ||
        contract.arbitrationJurisdiction?.region ||
        defaultValues.arbitration?.region,
    },
    governingLaw: {
      country:
        contract.legalJurisdiction?.country ??
        defaultValues.governingLaw?.country,
      // TODO: Adjust once BE migrates to two-level approach.
      region:
        contract.legalJurisdiction?.state ||
        contract.legalJurisdiction?.region ||
        defaultValues.governingLaw?.region,
    },
  };
}

function fromLinkedSows(
  linkedSows: StatementOfWorkBasic[],
): DeepPartial<ContractFormValues> {
  return {
    linkedStatementsOfWork: orderBy(
      linkedSows,
      [(item) => StatementOfWorkUtils.isDraft(item), 'title'],
      ['asc', 'asc'],
    ).map((statementOfWork) => ({
      statementOfWorkId: statementOfWork._id,
    })),
  };
}

interface GetDefaultValuesOptions {
  noumId?: string;
  linkedStatementsOfWork?: StatementOfWorkBasic[];
}
function getDefaultValues({
  noumId,
  linkedStatementsOfWork,
}: GetDefaultValuesOptions): DeepPartial<ContractFormValues> {
  return {
    title: 'Service Agreement',
    noumId: noumId ?? '',
    effectiveDate: new Date(),
    buyerId: '',
    serviceProviderId: '',
    terminationNotice: '',
    governingLaw: {
      country: 'us',
      region: '',
    },
    arbitration: {
      country: 'us',
      region: '',
    },
    linkedStatementsOfWork: cleanList(linkedStatementsOfWork).map(
      (statementOfWork) => ({
        statementOfWorkId: statementOfWork._id,
      }),
    ),
  };
}

export const ContractFormMapper = {
  toCreateNewContractInput,
  toUpdateContractInput,
  fromContract,
  fromLinkedSows,
  getDefaultValues,
};
