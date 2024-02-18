import { type StatementOfWorkBasic } from '../../types';

export type LinkedStatementOfWorkItem = StatementOfWorkBasic & {
  canEdit: boolean;
};
