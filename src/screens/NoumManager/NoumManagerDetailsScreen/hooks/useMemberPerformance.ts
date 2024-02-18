import { useCoManagerStatisticsQuery } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { MembersStatsDateUtils } from '@/features/noums/components/MembersStatsDate/utils';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';

export const DEFAULT_DATE_TYPE = 'weekly';

type UseMemberPerformanceProps = {
  noumId: string;
  userId: string;
};

export const useMemberPerformance = ({
  noumId,
  userId,
}: UseMemberPerformanceProps) => {
  const [selectedDate, setSelectedDate] = useState<Maybe<DateRange>>(() =>
    MembersStatsDateUtils.getPrevDate(
      {
        from: new Date(),
        to: new Date(),
      },
      DEFAULT_DATE_TYPE,
    ),
  );

  const debouncedSelectedDate = useDebounce(selectedDate, 500);

  const { data, loading } = useCoManagerStatisticsQuery({
    variables: {
      noumId,
      userId,
      filter: {
        startDate: debouncedSelectedDate?.from,
        endDate: debouncedSelectedDate?.to,
      },
    },
    skip:
      !noumId ||
      !userId ||
      !debouncedSelectedDate?.from ||
      !debouncedSelectedDate?.to,
  });

  const stats = data?.getNoumActivityStats;

  return {
    loading: loading && !stats,
    stats,
    setSelectedDate,
    selectedDate,
  };
};
