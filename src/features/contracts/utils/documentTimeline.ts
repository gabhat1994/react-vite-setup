import { addSeconds } from 'date-fns';
import { type ContractSowTimelineFragment } from '@/apollo/graphql/fragments/contractSowTimeline.generated';
import { type ActivityLogItemProps } from '@/components/ActivityLog';
import { DocumentType } from '../types';

const ActivityLog = {
  isCreated(item: ContractSowTimelineFragment) {
    return item.fromStatus === null && item.toStatus === 'DRAFT';
  },
  isSentForSigning(item: ContractSowTimelineFragment) {
    return item.fromStatus === 'DRAFT' && item.toStatus === 'ISSUED';
  },
  isDeclined(item: ContractSowTimelineFragment) {
    return item.fromStatus === 'ISSUED' && item.toStatus === 'DRAFT';
  },
  isSigned(item: ContractSowTimelineFragment) {
    return item.fromStatus === 'ISSUED' && item.toStatus === 'SIGNED';
  },
};

interface GenerateTimelineItemsOptions {
  items: ContractSowTimelineFragment[];
  usersMap: Record<string, string>;
  currentUserId: string;
  documentType: DocumentType;
}

export function generateTimelineItems({
  items,
  usersMap,
  currentUserId,
  documentType,
}: GenerateTimelineItemsOptions): ActivityLogItemProps[] {
  const timelineItems: ActivityLogItemProps[] = [];

  items.forEach((item, index) => {
    const isDoneByCurrentUser = currentUserId === item.userId;
    const userDisplayName = isDoneByCurrentUser
      ? 'You'
      : (item.userId ? usersMap[item.userId] : undefined) ?? 'Unknown User';

    if (ActivityLog.isCreated(item)) {
      timelineItems.push({
        iconName: 'edit_m',
        description: 'Created',
        timestamp: item.timestamp,
      });
    }

    if (ActivityLog.isSentForSigning(item)) {
      const isSentAgain = items
        .slice(0, index)
        .some(ActivityLog.isSentForSigning);

      timelineItems.push(
        {
          iconName: 'check_xs',
          description: `Signed by ${userDisplayName}`,
          timestamp: item.timestamp,
        },
        {
          iconName: 'time_m',
          description: isSentAgain ? 'Re-sent for signing' : 'Sent for signing',
          timestamp: addSeconds(new Date(item.timestamp), 2),
        },
      );
    }

    if (ActivityLog.isDeclined(item)) {
      timelineItems.push({
        iconName: 'close_m',
        description: `${
          isDoneByCurrentUser ? `You have` : `${userDisplayName} has`
        } returned the ${
          documentType === DocumentType.Contract ? 'contract' : 'SOW'
        } to make amendments`,
        timestamp: item.timestamp,
      });
    }

    if (ActivityLog.isSigned(item)) {
      timelineItems.push(
        {
          iconName: 'check_xs',
          description: `Signed by ${userDisplayName}`,
          timestamp: item.timestamp,
        },
        {
          iconName: 'thumb_up_m',
          description: 'Fully executed',
          timestamp: addSeconds(new Date(item.timestamp), 2),
        },
      );
    }
  });

  return timelineItems;
}
