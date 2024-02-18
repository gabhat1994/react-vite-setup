import { ActivityLog } from '@/components/ActivityLog';
import {
  type InvoiceOutputFragment,
  type InvoiceTimelineOutputFragment,
} from '@/apollo/graphql';
import { TranslatedBody } from './TranslatedBody';
import { useInvoiceTimeline } from './hooks/useInvoiceTimeline';

type TimelineListItemProps = {
  item: InvoiceTimelineOutputFragment;
  invoice: InvoiceOutputFragment;
};

export const TimelineListItem: React.FC<TimelineListItemProps> = ({
  item,
  invoice,
}) => {
  const activity = useInvoiceTimeline({ item, invoice });

  if (!activity) {
    return null;
  }

  return (
    <ActivityLog.Item
      iconName={activity.icon}
      description={
        activity.translation.key ? (
          <TranslatedBody
            i18nKey={activity.translation.key}
            values={activity.translation.values}
          />
        ) : null
      }
      timestamp={item.createdAt}
    />
  );
};
