import { format } from 'date-fns';
import { type JSXElementConstructor, type ReactElement } from 'react';
import { cleanup, type Matcher, type MatcherOptions, render } from '@/test-utils';
import { DatePicker } from './DatePicker';
import { type DateFormat } from './types';

const dateFormat: DateFormat = 'MMM dd, yyyy';

describe('<DatePicker />', () => {
  let yesterday: Date;
  let tomorrow: Date;
  let getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement;
  let queryByTestId: (
    id: Matcher,
    options?: MatcherOptions,
  ) => HTMLElement | null;
  let rerender: (
    ui: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
  ) => void;
  beforeEach(() => {
    yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const renderResult = render(<DatePicker onChange={() => {}} />);
    getByTestId = renderResult.getByTestId;
    queryByTestId = renderResult.queryByTestId;
    rerender = renderResult.rerender;
  });
  afterEach(() => {
    cleanup();
  });

  test('render date picker component ', () => {
    expect(getByTestId('date-picker')).toBeInTheDocument();
  });

  test('props: label', () => {
    rerender(
      <DatePicker
        label="Select date"
        value={yesterday}
        dateFormat={dateFormat}
        onChange={() => {}}
      />,
    );
    const element = getByTestId('date-picker-date-field');
    const labelElement = getByTestId('labelTestId');
    const yesterdayDateFormat = format(yesterday, dateFormat);
    expect(element).toHaveTextContent(yesterdayDateFormat);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent('Select date');
  });

  test('clicking the date field should switch showing popup calendar element', () => {
    expect(queryByTestId('date-picker-calendar-testid')).toBeNull();
    const dateFieldElement = getByTestId('date-picker-date-field');
    dateFieldElement.click();
    const calendarElement = getByTestId('date-picker-calendar-testid');
    expect(calendarElement).toBeInTheDocument();
    dateFieldElement.click();
    expect(queryByTestId('date-picker-calendar-testid')).toBeNull();
  });
});
