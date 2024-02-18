import { Spinner } from '@/components';
import { ActivityLogs } from '@/features/noums/components/ActivityLogs';
import { Stack } from '@/layout';
import { FullScreenLayout } from '@/layout/FullScreenLayout';
import { DetailsHeader } from './DetailsHeader';
import { ManagerDetailsSection } from './ManagerDetailsSection';
import { NoumsAndRoles } from './NoumsAndRoles';
import { UserPerformanceSection } from './UserPerformanceSection';
import {
  NoumManagerDetailsProvider,
  useNoumManagerDetailsProvider,
} from './providers/NoumManagerDetailsProvider';
import { CardStyled } from './styles';

const NoumManagerDetailsScreen = () => {
  const { loading, noum, member, activityLogs, isLoadingActivityLogs } =
    useNoumManagerDetailsProvider();

  if (loading && (!noum || !member)) {
    return <Spinner />;
  }

  return (
    <FullScreenLayout responsiveMain navBarContent={<DetailsHeader />}>
      <Stack vertical gap={16} fullWidth>
        {/* TODO: will be implemented along with global members manager */}
        {false && <NoumsAndRoles noum={noum} />}

        <ManagerDetailsSection />

        <CardStyled>
          <Stack fullWidth vertical gap={32}>
            <UserPerformanceSection />
            <ActivityLogs
              activityLogs={activityLogs}
              loading={isLoadingActivityLogs}
            />
          </Stack>
        </CardStyled>
      </Stack>
    </FullScreenLayout>
  );
};

export default () => (
  <NoumManagerDetailsProvider>
    <NoumManagerDetailsScreen />
  </NoumManagerDetailsProvider>
);
