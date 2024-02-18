import { type AppActivityTypes } from '@/apollo/generated/types';
import { type AppActivityFragment } from '@/apollo/graphql';
import { Spinner } from '@/components';
import { ActivityLog } from '@/components/ActivityLog';
import { MultiselectField } from '@/components/MultiselectField';
import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumManagerDetailsProvider } from '@/screens/NoumManager/NoumManagerDetailsScreen/providers/NoumManagerDetailsProvider';
import { useTranslation } from 'react-i18next';
import { ActivityLogsItem } from './ActivityLogsItem';
import S from './styles';
import { ActivityLogsUtils } from './utils';

type ActivityLogsProps = {
  activityLogs: AppActivityFragment[];
  loading: boolean;
};

export const ActivityLogs: React.FC<ActivityLogsProps> = ({
  activityLogs,
  loading,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const { activityLogsFilterTypes, setActivityLogsFilterTypes } =
    useNoumManagerDetailsProvider();

  return (
    <Stack vertical gap={16} fullWidth>
      <Stack fullWidth justify="space-between" align="center">
        <Stack fullWidth>
          <TSpan font="heading-xs-bold">
            {t('noumena.noum_member_details.activity_logs.heading')}
          </TSpan>
        </Stack>

        <Stack>
          <MultiselectField<AppActivityTypes>
            hideIcons
            containerWidth="280px"
            inputSize="small"
            value={activityLogsFilterTypes}
            onChange={(value) => setActivityLogsFilterTypes(value)}
            options={ActivityLogsUtils.filterDropdownOptions}
            multiselect
            hideAllOption
            searchPlaceholder="All Types"
            allOptionLabel="All Types"
            renderContainerFromBottom={isMobile}
          />
        </Stack>
      </Stack>
      {!activityLogs.length && loading ? (
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
      ) : activityLogs.length ? (
        <Stack gap={16} vertical fullWidth>
          <ActivityLog.List>
            {activityLogs.map((item) => (
              <ActivityLogsItem key={item._id} item={item} />
            ))}
          </ActivityLog.List>
        </Stack>
      ) : (
        <Stack fullWidth justify="center">
          <TSpan font="body-m" colorToken="--text-placeholder-neutral-default">
            {t('noumena.noum_member_details.activity_logs.not_found')}
          </TSpan>
        </Stack>
      )}
    </Stack>
  );
};
