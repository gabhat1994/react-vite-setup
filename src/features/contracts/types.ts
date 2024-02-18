import { type Maybe } from '@/apollo/generated/types';
import {
  type ContractFragment,
  type SowFragment,
  type SowLinkedContractFragment,
  type NoumContactSummaryFragment,
  type ContractBasicFragment,
  type SowBasicFragment,
} from '@/apollo/graphql';

export {
  ContractStatus,
  SowStatus as StatementOfWorkStatus,
  ContractSow as DocumentType,
} from '@/apollo/generated/types';

export type Contract = Omit<
  ContractFragment,
  'buyer' | 'seller' | 'effectiveDate'
> & {
  isAuthor?: boolean;
  effectiveDate?: Maybe<string> | undefined;
  buyer?: Maybe<NoumContactSummaryFragment> | undefined;
  seller?: Maybe<NoumContactSummaryFragment> | undefined;
};

export type ContractBasic = ContractBasicFragment;

export type StatementOfWork = Omit<SowFragment, 'linkedContract'> & {
  isAuthor?: boolean;
  linkedContract?: Maybe<SowLinkedContractFragment> | undefined;
};

export type StatementOfWorkBasic = Omit<SowBasicFragment, 'linkedContract'> & {
  linkedContract?: Maybe<SowLinkedContractFragment> | undefined;
};

export type ContactSummaryFragment = NoumContactSummaryFragment;
