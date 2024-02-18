import { useCallback, useEffect, useMemo, useState } from 'react';

import { type Maybe, type Timezone } from '@/apollo/generated/types';
import {
  type TimezonesQuery,
  useInitTimezoneLazyQuery,
  useTimezonesQuery,
} from '@/apollo/graphql';
import { getLocalTimezone } from '@/utils/date';
import { getBottomStatusFromQuery } from '@/components/Infinite';
import { type BottomStatus } from '@/components/Infinite/types';
import useDebounce from '@/hooks/useDebounce';
import { format } from 'date-fns';
import { type IEventTimezoneDropdown } from '../types/context';
import { useCreateEditEventContext } from '../contexts';

interface IUseEventTimezoneRes {
  timezone: Timezone | undefined;
  availableTimezones: IEventTimezoneDropdown[];
  searchText: string;
  loading: boolean;
  fetchMoreStatus: BottomStatus;
  onChangeTimezone: (tz: Timezone) => void;
  onChangeSearch: (value: string) => void;
  onFetchMore: () => void;
}

const fetchLimit = 1000;

export const useEventTimezone = (): IUseEventTimezoneRes => {
  const [count, setCount] = useState<number>(0);
  const { event, setTimezone: updateTimezoneField } =
    useCreateEditEventContext();
  const [timezone, setTimezone] = useState<Timezone | undefined>();
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const debouncedKeyword = useDebounce<string>(
    searchText.trim(),
    searchText ? 500 : 0,
  );

  const initialTimezone = event?.timezone || null;

  const initializeTimezones = useCallback(
    (res: TimezonesQuery, shouldReset: boolean = true) => {
      if (res.timezones?.data) {
        setCount(res.timezones.count || 0);
        setTimezones((tz) => [
          ...(shouldReset ? [] : tz),
          ...(res.timezones?.data || []).map((t) => ({
            _id: t?._id || '',
            offset: t?._id,
            text: t?.text,
            value: t?.value,
            abbr: t?.abbr,
            utcOffset: t?.utcOffset,
            timezone: t?.timezone,
          })),
        ]);
      }
    },
    [],
  );

  const { loading, fetchMore, networkStatus } = useTimezonesQuery({
    variables: {
      search: debouncedKeyword,
      limit: debouncedKeyword ? 1000 : fetchLimit,
      offset: 0,
    },
    onCompleted: initializeTimezones,
  });

  const [initTimezoneQuery] = useInitTimezoneLazyQuery();

  const setLocalTimeZone = useCallback(async () => {
    if (timezone) return;
    if (initialTimezone) {
      setTimezone(initialTimezone);
    } else if (timezones.length) {
      const localTimezone = getLocalTimezone();
      const tzMatched = await initTimezoneQuery({
        variables: {
          timezone: localTimezone,
        },
      });
      const utcOffset = format(new Date(), 'XXX');
      const hasMatchingUtcOffset = (timezoneItem?: Maybe<Timezone>) =>
        timezoneItem?.utcOffset?.includes(utcOffset);
      const initTimeZone = tzMatched.data?.initTimezone;
      const timeZoneValue = hasMatchingUtcOffset(initTimeZone)
        ? initTimeZone
        : timezones.find(hasMatchingUtcOffset);

      setTimezone(timeZoneValue || timezones[0]);
    }
  }, [initTimezoneQuery, initialTimezone, timezone, timezones]);

  useEffect(() => {
    setLocalTimeZone();
  }, [setLocalTimeZone]);

  useEffect(() => {
    if (timezone) {
      updateTimezoneField(timezone._id);
    }
  }, [updateTimezoneField, timezone]);

  const hasMore = useMemo(
    () => count > timezones.length,
    [count, timezones.length],
  );

  const fetchMoreStatus: BottomStatus = useMemo(() => {
    if (hasMore) {
      return getBottomStatusFromQuery({
        networkStatus,
        totalCount: count,
        currentCount: timezones.length,
        withForce: true,
      });
    }

    return 'end';
  }, [count, hasMore, networkStatus, timezones.length]);

  const onChangeSearch = useCallback((value: string) => {
    setSearchText(value.trim());
  }, []);

  const onChangeTimezone = useCallback((tz: Timezone) => {
    setTimezone(tz);
    setSearchText('');
  }, []);

  const onFetchMore = useCallback(async () => {
    if (hasMore) {
      const res = await fetchMore({
        variables: {
          search: debouncedKeyword,
          limit: fetchLimit,
          offset: timezones.length,
        },
      });
      initializeTimezones(res.data, false);
    }
  }, [
    hasMore,
    fetchMore,
    debouncedKeyword,
    timezones.length,
    initializeTimezones,
  ]);

  const availableTimezones: IEventTimezoneDropdown[] = useMemo(() => {
    const res: IEventTimezoneDropdown[] = [];

    timezones.forEach((tz) => {
      res.push({
        key: tz._id,
        label: tz.utcOffset,
        type: 'value',
        description: tz.text || '',
        value: tz,
        selected: tz._id === timezone?._id,
      });
    });

    return res;
  }, [timezone?._id, timezones]);

  return {
    timezone,
    availableTimezones,
    loading: loading && (!timezones.length || !!searchText),
    searchText,
    fetchMoreStatus,
    onChangeTimezone,
    onChangeSearch,
    onFetchMore,
  };
};

export default useEventTimezone;
