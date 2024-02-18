import { useResignFromNoumCoManagerRoleMutation } from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResignFlow } from '../../components/ResignFlow';

interface UseResignFlowOptions {
  noumId?: string;
  onResign?: () => void;
}

export function useResignFlow({ noumId, onResign }: UseResignFlowOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const { addSuccessIconToast, addErrorToast } = useToast();
  const { t } = useTranslation();

  const [resignFromNoumCoManagerRoleMutation, { loading }] =
    useResignFromNoumCoManagerRoleMutation();

  const handleResignFromCoManagerRole = async (disconnectFromNoum: boolean) => {
    if (!noumId) {
      return;
    }
    try {
      await resignFromNoumCoManagerRoleMutation({
        variables: {
          input: {
            disconnectFromNoum,
            noumIDs: [noumId],
          },
        },
      });

      if (disconnectFromNoum) {
        addSuccessIconToast(
          t(
            'You have resigned from the Manger role and disconnected from the Noum.',
          ),
        );
      } else {
        addSuccessIconToast(t('You have resigned from the Manager role.'));
      }

      setIsOpen(false);
      onResign?.();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  const resignFromManagerModal = (
    <ResignFlow
      isOpen={isOpen}
      loading={loading}
      onClose={() => setIsOpen(false)}
      onConfirm={handleResignFromCoManagerRole}
    />
  );

  return {
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    resignFromManagerModal,
  };
}
