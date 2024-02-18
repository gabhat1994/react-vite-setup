import { useProfileCompletenessHelper } from '@/features/noums/hooks/noums';
import { NoumViewLayout } from '@/layout/NoumLayout';
import { ChamberHeader } from '../Chamber/ViewChamber/ChamberHeader';
import { NoumBody } from '../Chamber/ViewChamber/NoumBody';
import { ProfileCompletion } from './ProfileCompletion';

const HomeNoumView = () => {
  const { showCompleteness } = useProfileCompletenessHelper();

  return (
    <NoumViewLayout
      header={<ChamberHeader />}
      leftSidebar={<ProfileCompletion />}
      isStickyContainer={showCompleteness}
    >
      <NoumBody />
    </NoumViewLayout>
  );
};

export default HomeNoumView;
