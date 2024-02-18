import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { differenceInDays, format } from 'date-fns';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import {
  type NoumSingleConnectionKpi,
  NoumKpiGranularity,
} from '@/apollo/generated/types';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { CustomTooltip } from '@/components/Chart/Tooltip/CustomTooltip';
import { type NoumDashboradTypeEnum } from '../types';
import { useGetNoumDashboardStatistics } from '../useGetNoumDashboardStatistics';
import { PeriodicityOptions } from '../constants';
import {
  ChartTopContainer,
  DropdownWrapper,
  KPIContainer,
  KPIWrapper,
  PeriodicityContainer,
} from './styles';

interface StatisticsDataProps {
  noumId: string;
  dashboardType: NoumDashboradTypeEnum;
  range: DateRange | undefined;
}

interface ChartDataKey {
  keyName: keyof NoumSingleConnectionKpi;
  displayName?: string;
  colorToken: string;
}

const StatisticsTab: React.FC<StatisticsDataProps> = ({
  noumId,
  dashboardType,
  range,
}) => {
  const renderPeriodicityOptions = useMemo(() => {
    const diffDays = differenceInDays(
      range?.to || new Date(),
      range?.from || new Date(),
    );
    return PeriodicityOptions.filter(
      (option) =>
        (option.value === NoumKpiGranularity.Daily && diffDays > 0) ||
        (option.value === NoumKpiGranularity.Monthly && diffDays >= 7) ||
        (option.value === NoumKpiGranularity.Yearly && diffDays >= 365),
    );
  }, [range]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [periodicity, setPeriodicity] = useState<
    DropdownValueType<string> | undefined
  >(
    renderPeriodicityOptions.length > 1
      ? renderPeriodicityOptions[1]
      : renderPeriodicityOptions.length > 0
      ? renderPeriodicityOptions[0]
      : undefined,
  );

  const chartDataProperties: ChartDataKey[] = [
    {
      keyName: 'connected',
      colorToken: '--border-line-chart1-default',
      displayName: t(`noumena.noum.dashboard.metrics.connected`),
    },
    {
      keyName: 'disconnected',
      colorToken: '--border-line-chart2-default',
      displayName: t(`noumena.noum.dashboard.metrics.disconnected`),
    },
    {
      keyName: 'currentConnections',
      colorToken: '--border-line-chart3-default',
      displayName: t(`noumena.noum.dashboard.metrics.currentConnections`),
    },
  ];

  const handleSelectPeriodicity = useCallback(
    (option: DropdownValueType<string>) => {
      setPeriodicity(option);
    },
    [],
  );

  const { statistics } = useGetNoumDashboardStatistics(
    noumId,
    dashboardType,
    periodicity?.value as NoumKpiGranularity,
    range?.from?.toISOString(),
    range?.to?.toISOString(),
  );

  const dateTickFormatter = (value: string, periodicityValue?: string) => {
    const formatString =
      periodicityValue === NoumKpiGranularity.Yearly
        ? 'yyyy'
        : periodicityValue === NoumKpiGranularity.Monthly
        ? `MMM`
        : `MMM dd`;
    return format(new Date(value), formatString);
  };

  const renderColorfulLegendText = (value: string) => (
    <span style={{ color: 'var(--text-card-neutral-default)' }}>{value}</span>
  );

  const chartData = useMemo(
    () =>
      statistics?.series?.map((x) => ({
        date: dateTickFormatter(x?.date, periodicity?.value),
        ...x?.values,
      })),
    [periodicity?.value, statistics?.series],
  );

  useEffect(() => {
    setPeriodicity(renderPeriodicityOptions[0]);
  }, [renderPeriodicityOptions]);

  return (
    <>
      <Spacer height={8} />
      <ChartTopContainer>
        <KPIContainer>
          {chartDataProperties.map(({ keyName }) => (
            <KPIWrapper key={keyName}>
              <TSpan font="footnote" colorToken="--text-card-neutral-default">
                {t(`noumena.noum.dashboard.metrics.${keyName}`)}
              </TSpan>
              <TSpan
                font="body-l-bold"
                colorToken="--text-card-neutral-highlighted"
                singleLine
              >
                {statistics?.kpi?.[keyName]}
              </TSpan>
            </KPIWrapper>
          ))}
        </KPIContainer>
        {renderPeriodicityOptions.length > 0 && (
          <PeriodicityContainer>
            <TSpan font="footnote" colorToken="--text-card-neutral-default">
              {t(`noumena.noum.dashboard.label.filter_by_periodicity`)}
            </TSpan>
            <DropdownWrapper>
              <Dropdown
                containerWidth="128px"
                isOpen={isOpen}
                options={renderPeriodicityOptions}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                closeOnSelect={true}
                onSelectOption={handleSelectPeriodicity}
                hideIcons
                hideLeftIconPlace
              >
                {({ inputProps, inputRef, toggle }) => (
                  <TextField
                    readOnly
                    ref={inputRef}
                    {...inputProps}
                    value={periodicity ? String(periodicity?.label) : ''}
                    rightIcon={
                      <Icon
                        name="chevron_down_m"
                        color="--icon-input-neutral-default"
                        size={16}
                        onClick={toggle}
                      />
                    }
                  />
                )}
              </Dropdown>
            </DropdownWrapper>
          </PeriodicityContainer>
        )}
      </ChartTopContainer>
      <Stack style={{ height: '303px' }} fullWidth>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={281}
            data={chartData}
            margin={{
              top: 30,
              right: 4,
            }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="date"
              fontSize="var(--font-systeminfo-small-size)"
              padding={{ left: 30, right: 30 }}
            />
            <YAxis fontSize="var(--font-footnote-regular-size)" />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{
                borderRadius: '8px',
                background: 'var(--bg-tooltip-neutral-default)',
                opacity: 0.95,
              }}
            />
            <Legend
              formatter={renderColorfulLegendText}
              align="left"
              iconType="plainline"
              wrapperStyle={{
                fontSize: 'var(--font-body-medium-size)',
              }}
            />
            {chartDataProperties.map((x) => (
              <Line
                key={x.keyName}
                dataKey={x.keyName}
                name={x.displayName ? x.displayName : x.keyName}
                stroke={`var(${x.colorToken})`}
                strokeWidth={2}
                color={`var(${x.colorToken})`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Stack>
    </>
  );
};
export default StatisticsTab;
