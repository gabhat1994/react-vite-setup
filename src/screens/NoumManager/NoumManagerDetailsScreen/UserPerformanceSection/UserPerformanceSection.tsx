import { TSpan } from '@/components';
import { MembersStatsDate } from '@/features/noums/components/MembersStatsDate';
import { StatsCard } from '@/features/noums/components/StatsCard/StatsCard';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import React from 'react';
import {
  DEFAULT_DATE_TYPE,
  useMemberPerformance,
} from '../hooks/useMemberPerformance';
import { useNoumManagerDetailsProvider } from '../providers/NoumManagerDetailsProvider';
import S from './styles';

export const UserPerformanceSection: React.FC = () => {
  const { isMobile } = useBreakpoints();
  const { member, noum } = useNoumManagerDetailsProvider();
  const { selectedDate, loading, setSelectedDate, stats } =
    useMemberPerformance({
      userId: member?.user?._id ?? '',
      noumId: noum?._id ?? '',
    });

  return (
    <Stack fullWidth vertical gap={16}>
      <Stack justify="space-between" fullWidth gap={16} vertical={isMobile}>
        <TSpan font="heading-xs-bold">Manager Performance</TSpan>

        <MembersStatsDate
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          defaultType={DEFAULT_DATE_TYPE}
        />
      </Stack>

      <S.StatsGrid>
        <StatsCard
          label="Posts Posted"
          value={stats?.postsPosted ?? 0}
          loading={loading}
        />
        <StatsCard
          label="Messages Sent"
          value={stats?.messagesSent ?? 0}
          loading={loading}
        />
        <StatsCard
          label="Members Invited"
          value={stats?.membersInvited ?? 0}
          loading={loading}
        />
        <StatsCard
          label="Transactions"
          value={stats?.transactions ?? 0}
          loading={loading}
        />
        <StatsCard
          label="Events Hosted"
          value={stats?.eventsHosted ?? 0}
          loading={loading}
        />
      </S.StatsGrid>
    </Stack>
  );
};
