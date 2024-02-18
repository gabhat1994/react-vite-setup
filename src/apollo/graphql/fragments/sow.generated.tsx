/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ContractSowTimelineFragmentDoc } from './contractSowTimeline.generated';
import { NoumContactBasicFragmentDoc } from './noumContact.generated';
export type SowBasicFragment = { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null };

export type SowFragment = { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, scopeOfWork?: string | null, effectiveDate?: any | null, logo?: string | null, isCompleted: boolean, deliverables?: Array<{ __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null } | null> | null, milestones?: Array<{ __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null } | null> | null, commission?: Array<{ __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null } | null> | null, expenseReimbursement?: Array<{ __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null } | null> | null, fees?: { __typename?: 'FeesCategory', type?: Types.FeesCategoryTypes | null, feesData?: Array<{ __typename?: 'FeesInfo', description?: string | null, amount?: number | null, dueDate?: any | null } | null> | null } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null, timeline?: Array<{ __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string }> | null };

export type SowLinkedNoumBasicFragment = { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null };

export type SowDeliverableMilestoneFragment = { __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null };

export type SowCommissionAndReimbursementFragment = { __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null };

export type SowLinkedContractBasicFragment = { __typename?: 'Contract', _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null } | null };

export type SowLinkedContractFragment = { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null };

export type SowFeesInfoFragment = { __typename?: 'FeesInfo', description?: string | null, amount?: number | null, dueDate?: any | null };

export const SowLinkedNoumBasicFragmentDoc = gql`
    fragment SOWLinkedNoumBasic on SpaceOutput {
  _id
  name
  profileImageThumbnail
}
    `;
export const SowLinkedContractBasicFragmentDoc = gql`
    fragment SOWLinkedContractBasic on Contract {
  _id
  title
  effectiveDate
  buyer {
    _id
    displayName
    title
  }
  seller {
    _id
    displayName
    title
  }
}
    `;
export const SowLinkedContractFragmentDoc = gql`
    fragment SOWLinkedContract on Contract {
  ...SOWLinkedContractBasic
  status
  contractNumber
  buyer {
    ...NoumContactBasic
  }
  seller {
    ...NoumContactBasic
  }
  isCompleted
}
    ${SowLinkedContractBasicFragmentDoc}
${NoumContactBasicFragmentDoc}`;
export const SowBasicFragmentDoc = gql`
    fragment SOWBasic on SOW {
  _id
  SOWNumber
  status
  title
  effectiveDate
  createdBy {
    _id
  }
  linkedNoum {
    ...SOWLinkedNoumBasic
  }
  linkedContract {
    ...SOWLinkedContract
  }
  isCompleted
}
    ${SowLinkedNoumBasicFragmentDoc}
${SowLinkedContractFragmentDoc}`;
export const SowDeliverableMilestoneFragmentDoc = gql`
    fragment SOWDeliverableMilestone on DeliverablesAndMilestones {
  title
  description
  dueDate
}
    `;
export const SowCommissionAndReimbursementFragmentDoc = gql`
    fragment SOWCommissionAndReimbursement on CommissionAndReimbursement {
  description
  amount
}
    `;
export const SowFeesInfoFragmentDoc = gql`
    fragment SOWFeesInfo on FeesInfo {
  description
  amount
  dueDate
}
    `;
export const SowFragmentDoc = gql`
    fragment SOW on SOW {
  _id
  SOWNumber
  status
  title
  scopeOfWork
  effectiveDate
  deliverables {
    ...SOWDeliverableMilestone
  }
  milestones {
    ...SOWDeliverableMilestone
  }
  commission {
    ...SOWCommissionAndReimbursement
  }
  expenseReimbursement {
    ...SOWCommissionAndReimbursement
  }
  fees {
    type
    feesData {
      ...SOWFeesInfo
    }
  }
  linkedNoum {
    ...SOWLinkedNoumBasic
  }
  linkedContract {
    ...SOWLinkedContract
  }
  createdBy {
    _id
  }
  logo
  timeline {
    ...ContractSowTimeline
  }
  isCompleted
}
    ${SowDeliverableMilestoneFragmentDoc}
${SowCommissionAndReimbursementFragmentDoc}
${SowFeesInfoFragmentDoc}
${SowLinkedNoumBasicFragmentDoc}
${SowLinkedContractFragmentDoc}
${ContractSowTimelineFragmentDoc}`;