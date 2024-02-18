import { Spacer, Stack } from '@/layout';
import { Tag } from '@/components/Tag';
import { type CampaignReportFragment } from '@/apollo/graphql';
import { TSpan } from '@/components/Typography';

import Tooltip from '@/components/Tooltip';

import { Card } from '../components/Card/Card';
import { Layout } from '../components/Layout/Layout';
import { Utils } from '../utils';

type ReportSummaryProps = {
  title: string;
  campaignCreatedAt: string;
  adId: string;
  isMobile: boolean;
  isTablet: boolean;
} & Required<Pick<CampaignReportFragment, 'metrics' | 'createdAt'>>;

export function ReportSummary({
  metrics,
  createdAt,
  title,
  campaignCreatedAt,
  adId,
  isMobile,
  isTablet,
}: ReportSummaryProps) {
  return (
    <Layout.Card>
      <Stack fullWidth justify="space-between">
        <Card.Title>Summary</Card.Title>
        <Stack gap={8} align="center">
          <Card.Label>{campaignCreatedAt}</Card.Label>
          <Card.Label>
            ID:{' '}
            <TSpan colorToken="--text-card-neutral-highlighted">
              {Utils.appendAdPrefix(adId ?? '')}
            </TSpan>
          </Card.Label>
        </Stack>
      </Stack>
      <Spacer height={12} />
      <Stack gap={10}>
        <Card.Label>Campaign:</Card.Label>
        <Card.ValueBold>{title}</Card.ValueBold>
      </Stack>
      <Card.Divider />

      <Stack align="center" wrap="wrap" gap={32}>
        <Card.CampaignMetrics label="Report Date:" isBold>
          {createdAt}
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Cost:">
          <Tag secondary>{metrics?.cost} USD</Tag>
        </Card.CampaignMetrics>
        <Card.CampaignMetrics
          label="CTR:"
          isBold
          right={
            <Tooltip
              top={-90}
              left={-20}
              width={240}
              iconColor="--icon-card-neutral-highlighted"
            >
              <TSpan
                font="footnote"
                colorToken="--text-tooltip-neutral-alt-default"
              >
                A metric that measures the ratio of clicks on an ad to the total
                number of impressions it receives.
              </TSpan>
            </Tooltip>
          }
        >
          {metrics?.ctr} %
        </Card.CampaignMetrics>
        <Card.CampaignMetrics
          label="Avg. CPC:"
          isBold
          right={
            <Tooltip
              top={-90}
              left={isMobile ? -180 : isTablet ? -200 : -20}
              width={240}
              iconColor="--icon-card-neutral-highlighted"
            >
              <TSpan
                font="footnote"
                colorToken="--text-tooltip-neutral-alt-default"
              >
                A metric that measures the average amount of money spent for
                each click on an ad.
              </TSpan>
            </Tooltip>
          }
        >
          {metrics?.avgCPC} USD
        </Card.CampaignMetrics>
        <Card.CampaignMetrics
          label="Clicks:"
          isBold
          right={
            <Tooltip
              top={-70}
              left={-20}
              width={220}
              iconColor="--icon-card-neutral-highlighted"
            >
              <TSpan
                font="footnote"
                colorToken="--text-tooltip-neutral-alt-default"
              >
                A total number of times users click on an ad.
              </TSpan>
            </Tooltip>
          }
        >
          {metrics?.clicks}
        </Card.CampaignMetrics>
        <Card.CampaignMetrics
          label="Impressions:"
          isBold
          right={
            <Tooltip
              top={-90}
              left={isMobile ? -180 : isTablet ? -200 : -20}
              width={240}
              iconColor="--icon-card-neutral-highlighted"
            >
              <TSpan
                font="footnote"
                colorToken="--text-tooltip-neutral-alt-default"
              >
                Represents the number of times a website appears in the search
                engine results
              </TSpan>
            </Tooltip>
          }
        >
          {metrics?.impressions}
        </Card.CampaignMetrics>
      </Stack>
    </Layout.Card>
  );
}
