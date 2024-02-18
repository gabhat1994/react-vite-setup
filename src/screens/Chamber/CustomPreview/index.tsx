import { useParams } from 'react-router-dom';
import { NoumLayoutStatusFilter } from '@/apollo/generated/types';
import EditCustomPreviewV2 from './EditCustomPreviewV2';
import { ChamberProvider } from '../ViewChamber/ChamberProvider';

const Index = () => {
  const { id = '' } = useParams();
  return (
    <ChamberProvider
      noumId={id}
      noumLayoutStatus={NoumLayoutStatusFilter.Unpublished}
    >
      <EditCustomPreviewV2 />
    </ChamberProvider>
  );
};

export default Index;
