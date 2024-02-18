import { snakeCase } from 'lodash';
import { type DefaultNamespace, type TFunction } from 'react-i18next';
import { ContractStatus, SowStatus } from '@/apollo/generated/types';
import {
  type NoumContactBasicFragment,
  type NoumContractLinkedNoumBasicFragment,
} from '@/apollo/graphql';
import { Avatar } from '@/components/Avatar/Avatar';
import { type DropdownValueType } from '@/components/Dropdown';
import { UserUtil } from '@/utils/user';
import { ListPOV } from '../types';

export function mapSowStatusToOption(
  status: SowStatus,
  t: TFunction<DefaultNamespace, undefined>,
): DropdownValueType<SowStatus, SowStatus> {
  return {
    type: 'value',
    key: status,
    value: status,
    label: t(
      `noumena.contract_manager.filters.status.contract.${snakeCase(status)}`,
    ),
  };
}

export function mapContractStatusToOption(
  status: ContractStatus,
  t: TFunction<DefaultNamespace, undefined>,
): DropdownValueType<ContractStatus, ContractStatus> {
  return {
    type: 'value',
    key: status,
    value: status,
    label: t(
      `noumena.contract_manager.filters.status.sow.${snakeCase(status)}`,
    ),
  };
}

export function mapConsignorToOption(
  contact: NoumContactBasicFragment,
): DropdownValueType<string, string> {
  return {
    type: 'value',
    key: contact._id,
    value: contact._id,
    label: contact.displayName,
    icon: <Avatar url={UserUtil.getProfilePicture(contact.userId)} size="M" />,
  };
}

export function mapNoumToOption(
  noum: NoumContractLinkedNoumBasicFragment,
): DropdownValueType<string, string> {
  return {
    type: 'value',
    key: noum._id ?? '',
    value: noum._id ?? '',
    label: noum.name,
    icon: <Avatar url={noum.profileImageThumbnail} size="M" />,
  };
}

export function getAvailableContractStatuses(listPerspective: ListPOV) {
  if (listPerspective === ListPOV.Owner) {
    return [ContractStatus.Draft, ContractStatus.Issued, ContractStatus.Signed];
  }
  return [ContractStatus.Issued, ContractStatus.Signed];
}

export function getAvailableStatementOfWorkStatuses(listPerspective: ListPOV) {
  if (listPerspective === ListPOV.Owner) {
    return [SowStatus.Draft, SowStatus.Issued, SowStatus.Signed];
  }
  return [SowStatus.Issued, SowStatus.Signed];
}
