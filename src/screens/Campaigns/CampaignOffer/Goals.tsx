import { Spacer, Stack } from '@/layout/Stack';

import { type CampaignOfferFragment } from '@/apollo/graphql';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card } from '../components/Card/Card';
import { Chart } from './Chart';
import S from './styles';
import { Utils } from '../utils';
import { ChartFilterFrequency } from './types';

type TGoals = {
  isMobile: boolean;
  isTablet: boolean;
  estimatedDuration: number;
} & Required<
  Pick<
    CampaignOfferFragment,
    'goalConnectedUsers' | 'goalNoumVisibility' | 'status'
  >
>;

const ChartFilterOptions = (): DropdownValueType<string>[] => [
  {
    label: ChartFilterFrequency.Daily,
    key: ChartFilterFrequency.Daily,
    type: 'value',
    value: ChartFilterFrequency.Daily,
  },
  {
    label: ChartFilterFrequency.Total,
    key: ChartFilterFrequency.Total,
    type: 'value',
    value: ChartFilterFrequency.Total,
  },
];
export function Goals({
  isMobile,
  isTablet,
  goalConnectedUsers,
  goalNoumVisibility,
  status,
  estimatedDuration,
}: TGoals) {
  const updateAppearance = Utils.updateOfferAppearance(status);
  const [sortInfo, setSortInfo] = useState<string>(ChartFilterFrequency.Daily);

  const onChange = (option: DropdownValueType<string>) => {
    setSortInfo(option?.value);
  };

  const filtredCurrentViews = useMemo(
    () =>
      sortInfo === ChartFilterFrequency.Daily &&
      goalNoumVisibility?.currentViews
        ? Math.ceil(
            Number(goalNoumVisibility?.currentViews) / estimatedDuration,
          )
        : goalNoumVisibility?.currentViews,
    [estimatedDuration, goalNoumVisibility?.currentViews, sortInfo],
  );

  const filtredPredictedViews = useMemo(
    () =>
      sortInfo === ChartFilterFrequency.Daily &&
      goalNoumVisibility?.predictedViews
        ? Math.ceil(
            Number(goalNoumVisibility?.predictedViews) / estimatedDuration,
          )
        : goalNoumVisibility?.predictedViews,
    [estimatedDuration, goalNoumVisibility?.predictedViews, sortInfo],
  );
  return (
    <Layout.Card>
      <Card.Title>Goals</Card.Title>
      <Card.Divider />

      {/* Noum Visibility */}
      <Card.TitleWithBG>1. Increase my Noum Visibility</Card.TitleWithBG>
      <Spacer height={16} />
      <Stack vertical align="center" justify="center" fullWidth>
        <Stack
          align="center"
          justify={isMobile ? 'center' : undefined}
          wrap="wrap"
          gap={isMobile ? 13 : 48}
          style={{
            marginLeft: isMobile || isTablet ? '3rem' : '18.75rem',
          }}
        >
          <Card.CampaignMetrics
            label="Current Views (Avg.)"
            minWidth={!isMobile}
          >
            {Utils.numberWithCommas(filtredCurrentViews ?? 0)}
          </Card.CampaignMetrics>
          <Card.CampaignMetrics label="Predicted" minWidth={!isMobile}>
            {Utils.numberWithCommas(filtredPredictedViews ?? 0)}
          </Card.CampaignMetrics>
          {!isMobile && (
            <Card.CampaignMetrics label="" minWidth={!isMobile}>
              <Dropdown
                hideIcons
                placement="right-start"
                options={ChartFilterOptions()}
                onSelectOption={onChange}
                isAnimation={false}
              >
                {({
                  targetRef,
                  toggle,
                  active,
                }: DropdownTargetProps<HTMLButtonElement>) => (
                  <S.Filter
                    ref={targetRef}
                    size="small"
                    rightIcon={
                      <>
                        <Spacer isFlex height={5} />
                        <Icon
                          name={active ? 'chevron_up_m' : 'chevron_down_m'}
                          color="--icon-input-neutral-default"
                          size={16}
                        />
                      </>
                    }
                    softDisabled
                    onClick={toggle}
                  >
                    {ChartFilterOptions().filter(
                      (sort) => sort.value === sortInfo,
                    )[0]?.label || ''}
                  </S.Filter>
                )}
              </Dropdown>
            </Card.CampaignMetrics>
          )}
        </Stack>
        {isMobile && (
          <Stack
            style={{ marginLeft: '55px', marginTop: '10px' }}
            align="center"
            justify={isMobile ? 'center' : undefined}
            wrap="wrap"
          >
            <Card.CampaignMetrics label="" minWidth={!isMobile}>
              <Dropdown
                hideIcons
                placement="right-start"
                options={ChartFilterOptions()}
                onSelectOption={onChange}
                isAnimation={false}
              >
                {({
                  targetRef,
                  toggle,
                  active,
                }: DropdownTargetProps<HTMLButtonElement>) => (
                  <S.Filter
                    ref={targetRef}
                    size="full"
                    rightIcon={
                      <>
                        <Spacer isFlex height={5} />
                        <Icon
                          name={active ? 'chevron_up_m' : 'chevron_down_m'}
                          color="--icon-input-neutral-default"
                          size={16}
                        />
                      </>
                    }
                    softDisabled
                    onClick={toggle}
                  >
                    {ChartFilterOptions().filter(
                      (sort) => sort.value === sortInfo,
                    )[0]?.label || ''}{' '}
                  </S.Filter>
                )}
              </Dropdown>
            </Card.CampaignMetrics>
          </Stack>
        )}
        <Chart
          currentMetricsLabel="Current Views (Avg.)"
          predictedMetricsLabel="Predicted"
          updateColor={updateAppearance}
          barGap={isMobile ? 20 : undefined}
          barSize={isMobile ? 110 : undefined}
          chartData={[
            {
              uv: filtredCurrentViews ?? 0,
              pv: filtredPredictedViews ?? 0,
            },
          ]}
        />
      </Stack>
      <Spacer height={16} />

      {/* Users and Followers */}
      <Card.TitleWithBG>2. Gain Connected Users and Followers</Card.TitleWithBG>
      <Spacer height={16} />
      <Stack
        align="center"
        justify="center"
        gap={32}
        vertical={isMobile}
        fullWidth
      >
        <Stack vertical align="center" justify="center" fullWidth>
          <Stack align="center" justify="center" gap={25} fullWidth>
            <div style={{ marginLeft: '115px' }}>
              <Card.CampaignMetrics minWidth={false} label="Current Users">
                {Utils.numberWithCommas(goalConnectedUsers?.currentUsers ?? 0)}
              </Card.CampaignMetrics>
            </div>
            <Card.CampaignMetrics label="Predicted">
              {Utils.numberWithCommas(goalConnectedUsers?.predictedUsers ?? 0)}
            </Card.CampaignMetrics>
          </Stack>
          <Chart
            barGap={25}
            barSize={96}
            currentMetricsLabel="Current Users"
            predictedMetricsLabel="Predicted"
            updateColor={updateAppearance}
            chartData={[
              {
                uv: goalConnectedUsers?.currentUsers ?? 0,
                pv: goalConnectedUsers?.predictedUsers ?? 0,
              },
            ]}
          />
        </Stack>
        <Stack vertical align="center" justify="center" fullWidth>
          <Stack align="center" justify="center" gap={25} fullWidth>
            <div style={{ marginLeft: '115px' }}>
              <Card.CampaignMetrics minWidth={false} label="Current Followers">
                {Utils.numberWithCommas(
                  goalConnectedUsers?.currentFollowers ?? 0,
                )}
              </Card.CampaignMetrics>
            </div>
            <Card.CampaignMetrics label="Predicted">
              {Utils.numberWithCommas(
                goalConnectedUsers?.predictedFollowers ?? 0,
              )}
            </Card.CampaignMetrics>
          </Stack>
          <Chart
            barGap={25}
            barSize={96}
            currentMetricsLabel="Current Followers"
            predictedMetricsLabel="Predicted"
            updateColor={updateAppearance}
            chartData={[
              {
                uv: goalConnectedUsers?.currentFollowers ?? 0,
                pv: goalConnectedUsers?.predictedFollowers ?? 0,
              },
            ]}
          />
        </Stack>
      </Stack>
      <Spacer height={16} />

      {/* Ops portal and BE support is not available to show below chart. Uncomment when support is there */}

      {/* <Card.TitleWithBG>3. Get answers to Quick Questions</Card.TitleWithBG>
      <Spacer height={16} />
      <Stack vertical align="center" justify="center">
        <Stack align="center" gap={48}>
          <Card.CampaignMetrics label="Current Answers (Avg.)">
            5
          </Card.CampaignMetrics>
          <Card.CampaignMetrics label="Predicted">16</Card.CampaignMetrics>
        </Stack>
        <Chart
          currentMetricsLabel="Current Answers (Avg.)"
          predictedMetricsLabel="Predicted"
          updateColor={updateAppearance}
          chartData={[
            {
              uv: 5,
              pv: 16,
            },
          ]}
        />
      </Stack>
      <Spacer height={16} />

      <Card.TitleWithBG>4. Custom Goal</Card.TitleWithBG>
      <Spacer height={16} />
      <Stack gap={8} vertical={isMobile}>
        <S.CustomGoal>
          <Card.CampaignMetrics label="Goal:" isBold={false}>
            “Our goal is to reach 500,000 potential customers and convert 10% of
            them into paying customers within the next 6 months, resulting in a
            50% increase in online sales revenue compared to the previous
            year.&quot;
          </Card.CampaignMetrics>
        </S.CustomGoal>
        <S.CustomGoal>
          <Card.CampaignMetrics label="Predicted:" isBold={false}>
            With our comprehensive SEO services, we will optimize your website
            to rank higher in search engine results, attract more relevant
            traffic, and convert that traffic into paying customers. Our
            services include keyword research, on-page optimization, technical
            SEO, content marketing, link building, and local SEO. We will work
            closely with you to understand your business goals and tailor our
            services to meet your specific needs. Our team will track and
            analyze your website&apos;s performance, and we will make
            adjustments as needed to ensure that we are on track to achieve your
            target of 10% conversion and 50% increase in online sales revenue.
          </Card.CampaignMetrics>
        </S.CustomGoal>
      </Stack> */}
    </Layout.Card>
  );
}
