import { addDays, format, isAfter, set } from 'date-fns';

import type { WeekDays } from '@/apollo/generated/types';
import { daysOfWeek } from '@/utils/recurringEventOccurance';

export const findClosestDayOfWeek = (
    days: WeekDays[],
    selectedDate: Date,
): Date => {
    const time = {
        hours: selectedDate.getHours(),
        minutes: selectedDate.getMinutes(),
    };

    for (let i = 0; i < 7; i += 1) {
        const day = format(
            addDays(selectedDate, i),
            'EEEE',
        ).toUpperCase() as WeekDays;

        if (days.includes(day)) {
            const date = set(addDays(selectedDate, i), time);

            // If today is a selected day and the time has not yet passed or if it's a future day
            if (i !== 0 || (i === 0 && !isAfter(selectedDate, date))) {
                return date;
            }
        }
    }

    // As a fallback, set the date to the next occurrence of the first selected day with the given time.
    return set(addDays(selectedDate, daysOfWeek.indexOf(days[0]) + 1), time);
};
