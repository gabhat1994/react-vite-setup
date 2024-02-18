import { type Maybe } from '@/apollo/generated/types';
import { type NoumContactBasicFragment } from '@/apollo/graphql';
import { type ContractSowTimelineFragment } from '@/apollo/graphql/fragments/contractSowTimeline.generated';
import { ActivityLog } from '@/components/ActivityLog';
import { type DocumentType } from '../../types';
import { useDocumentTimeline } from './useDocumentTimeline';

function createUsersMapEntry(
  contact: Maybe<NoumContactBasicFragment> | undefined,
): Record<string, string> | undefined {
  if (!contact || !contact.userId._id || !contact.displayName) {
    return undefined;
  }

  return {
    [contact.userId._id]: contact.displayName,
  };
}

interface DocumentTimelineProps {
  items: ContractSowTimelineFragment[];
  buyer: Maybe<NoumContactBasicFragment> | undefined;
  serviceProvider: Maybe<NoumContactBasicFragment> | undefined;
  documentType: DocumentType;
}

export function DocumentTimeline({
  items,
  buyer,
  serviceProvider,
  documentType,
}: DocumentTimelineProps) {
  const activities = useDocumentTimeline(
    items,
    {
      ...createUsersMapEntry(buyer),
      ...createUsersMapEntry(serviceProvider),
    },
    documentType,
  );

  return (
    <ActivityLog.List>
      {activities.map((activity) => (
        <ActivityLog.Item
          key={activity.timestamp.toString()}
          iconName={activity.iconName}
          description={activity.description}
          timestamp={activity.timestamp}
        />
      ))}
    </ActivityLog.List>
  );
}
