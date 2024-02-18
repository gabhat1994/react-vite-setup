import { SummaryList as List } from './SummaryList';
import { SummaryListItem } from './SummaryListItem';
import { SummaryTotal } from './SummaryTotal';

export type { SummaryListItemProps } from './SummaryListItem';

export const SummaryList = {
  List,
  Item: SummaryListItem,
  Total: SummaryTotal,
};
