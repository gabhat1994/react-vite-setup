import { reverse } from 'lodash';
import { type ContractSowTimelineFragment } from '@/apollo/graphql/fragments/contractSowTimeline.generated';
import { useAuth } from '@/features/auth/contexts';
import { type DocumentType } from '../../types';
import { generateTimelineItems } from '../../utils/documentTimeline';

export function useDocumentTimeline(
  items: ContractSowTimelineFragment[],
  usersMap: Record<string, string>,
  documentType: DocumentType,
) {
  const { user } = useAuth();

  return reverse(
    generateTimelineItems({
      items,
      usersMap,
      currentUserId: user?._id ?? '',
      documentType,
    }),
  );
}
