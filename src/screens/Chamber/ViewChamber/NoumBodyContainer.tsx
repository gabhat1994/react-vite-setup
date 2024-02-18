import CustomPreviewBodyV2 from '@/screens/Chamber/CustomPreview/CustomPreviewBodyV2';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { NoumBody } from './NoumBody';

export const NoumBodyContainer = () => {
  const { isOwner, space } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();

  return (
    <>
      {isConnected || isOwner || SpaceUtils.isMasterNoum(space) ? (
        <NoumBody />
      ) : (
        <CustomPreviewBodyV2 />
      )}
    </>
  );
};
