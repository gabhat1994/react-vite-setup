import { format, subDays } from 'date-fns';
import { formartMessageSentDate, formatLastMessageSentDate } from './date';

describe('formatLastMessageSentDate', () => {
  it('format message sent date', () => {
    const moment0 = new Date();
    expect(formartMessageSentDate(new Date())).toBe(
      format(moment0, "'Today,' hh:mm aa"),
    );

    const moment1 = subDays(new Date(), 1);
    expect(formartMessageSentDate(moment1)).toBe(
      format(moment1, "'Yesterday,' hh:mm aa"),
    );

    const moment2 = subDays(new Date(), -1);
    expect(formartMessageSentDate(moment2)).toBe(
      format(moment2, "'Tomorrow,' hh:mm aa"),
    );

    const moment3 = subDays(new Date(), 6);
    expect(formartMessageSentDate(moment3)).toBe(
      format(moment3, "eee',' hh:mm aa"),
    );

    const moment4 = subDays(new Date(), -6);
    expect(formartMessageSentDate(moment4)).toBe(
      format(moment4, "eee',' hh:mm aa"),
    );

    const moment5 = subDays(new Date(), 10);
    expect(formartMessageSentDate(moment5)).toBe(
      format(moment5, 'dd MMM yyyy, hh:mm aa'),
    );
  });

  it('format last message sent date', () => {
    expect(formatLastMessageSentDate(new Date())).toBe('now');

    const moment1 = subDays(new Date(), 1);
    expect(formatLastMessageSentDate(moment1)).toBe(
      format(moment1, "'Yesterday', hh:mm aa"),
    );

    const moment2 = subDays(new Date(), -1);
    expect(formatLastMessageSentDate(moment2)).toBe(
      format(moment2, "'Tomorrow', hh:mm aa"),
    );

    const moment3 = subDays(new Date(), 6);
    expect(formatLastMessageSentDate(moment3)).toBe(
      format(moment3, 'eee, hh:mm aa'),
    );

    const moment4 = subDays(new Date(), -6);
    expect(formatLastMessageSentDate(moment4)).toBe(
      format(moment4, 'eee, hh:mm aa'),
    );

    const moment5 = subDays(new Date(), 10);
    expect(formatLastMessageSentDate(moment5)).toBe(
      format(moment5, 'dd MMM yyyy, hh:mm aa'),
    );
  });
});
