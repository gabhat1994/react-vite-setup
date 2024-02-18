import {
  Conversationtypeenumforadmin,
  GetConversationsFilterType,
} from '@/apollo/generated/types';
import { useParams } from 'react-router';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { type ConversationsListOptions, ConversationType } from '../../types';

export const useConversationListQueryOptions = (
  conversationType: ConversationType,
): ConversationsListOptions | null => {
  const { id } = useParams();
  const { space } = useEditChamberState();
  const spaceId = space?._id || id;

  switch (conversationType) {
    case ConversationType.GLOBAL_ALL:
      return {
        conversationType,
        variables: {
          type: GetConversationsFilterType.All,
        },
      };
    case ConversationType.GLOBAL_DIRECT:
      return {
        conversationType,
        variables: {
          type: GetConversationsFilterType.HomeNoum,
        },
      };
    case ConversationType.GLOBAL_NOUM:
      return {
        conversationType,
        variables: {
          type: GetConversationsFilterType.ProjectNoum,
        },
      };
    case ConversationType.HOME_OWNER:
      return {
        conversationType,
        variables: {
          uid: null,
        },
      };
    case ConversationType.HOME_USER: {
      if (!space?.uid?._id) {
        return null;
      }
      return {
        conversationType,
        variables: {
          uid: space.uid._id,
        },
      };
    }
    case ConversationType.PROJECT_OWNER:
      return {
        conversationType,
        variables: {
          spaceId: spaceId!,
          filter: {
            type: Conversationtypeenumforadmin.Self,
            uid: null,
          },
        },
      };
    case ConversationType.PROJECT_OWNER_OTHERS: {
      if (!spaceId) {
        return null;
      }

      return {
        conversationType,
        variables: {
          spaceId,
          filter: {
            type: Conversationtypeenumforadmin.Others,
            uid: null,
          },
        },
      };
    }
    case ConversationType.PROJECT_USER: {
      if (!spaceId) {
        return null;
      }
      return {
        conversationType,
        variables: {
          spaceId,
        },
      };
    }
    default:
      return { conversationType, variables: {} };
  }
};
