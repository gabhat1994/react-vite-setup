import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { Stack } from '@/layout';
import { NoumLayoutStatusFilter } from '@/apollo/generated/types';
import NoumEditor from '../Chamber/EditChamber/NoumEditor';
import { ChamberProvider } from '../Chamber/ViewChamber/ChamberProvider';

const EditHomeNoum = (): JSX.Element => {
  const { masterId, loading } = useAuth();
  if (loading && !masterId) {
    return (
      <Stack>
        <Spinner />
      </Stack>
    );
  }
  return (
    <ChamberProvider
      noumId={masterId}
      noumLayoutStatus={NoumLayoutStatusFilter.Unpublished}
    >
      <NoumEditor id={masterId} />
    </ChamberProvider>
  );
};

export default EditHomeNoum;
