import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { Navigate, Route, Routes, generatePath } from 'react-router';
import ROUTES from '@/constants/routes';
import { useNavigateBack } from '@/hooks/navigation';
import { ManageMembersModal } from '../components/modals/ManageMembersModal';

interface EditNoumRoutesProps {
  noumId: string;
}

export function EditNoumRoutes({ noumId }: EditNoumRoutesProps) {
  const navigateBack = useNavigateBack();
  const { hasNoumPermission } = useNoumAuthorization();

  const hasManageMembersPermission =
    hasNoumPermission('invite-users') || hasNoumPermission('assign-user-roles');

  return (
    <Routes>
      <Route
        path="manage-members"
        element={
          hasManageMembersPermission ? (
            <ManageMembersModal
              isOpen={true}
              handleClose={() =>
                navigateBack(-1, {
                  fallback: generatePath(ROUTES.EDIT_NOUM, { id: noumId }),
                })
              }
            />
          ) : (
            <Navigate to={generatePath(ROUTES.EDIT_NOUM, { id: noumId })} />
          )
        }
      />
    </Routes>
  );
}
