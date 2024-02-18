import { Stack, Spacer } from '@/layout';
import DefaultImage from '@/assets/images/chamber_default.png';
import { Tag } from '@/components/Tag';

import {
  type CampaignOfferBasicFragment,
  type CampaignOfferFragment,
} from '@/apollo/graphql';
import { TSpan } from '@/components/Typography';
import { Layout } from '../components/Layout/Layout';
import { Card } from '../components/Card/Card';
import { NOUMCard } from '../components/NoumCard';
import { Utils } from '../utils';
import { CountryCard } from '../components/CountryCard';

type CampaignOfferSummaryProps = {
  targetLocation: string;
  category: string;
  targetLanguage: string;
  isMobile?: boolean;
  estimatedDuration: number;
} & Required<Pick<CampaignOfferBasicFragment, 'adId' | 'title' | 'noumId'>> &
  Required<
    Pick<
      CampaignOfferFragment,
      | 'clicksWeekly'
      | 'costTotal'
      | 'costWeekly'
      | 'cpc'
      | 'reachTotal'
      | 'endAt'
      | 'startAt'
      | 'createdAt'
    >
  >;

export function CampaignOfferSummary({
  adId,
  title,
  createdAt,
  startAt,
  endAt,
  targetLanguage,
  category,
  targetLocation,
  costTotal,
  clicksWeekly,
  costWeekly,
  reachTotal,
  cpc,
  noumId,
  isMobile,
  estimatedDuration,
}: CampaignOfferSummaryProps) {
  const flag = targetLocation.split('-')[0];

  let country = targetLocation.split('-')[1];

  country = country || flag;

  return (
    <Layout.Card>
      <Stack align="center" justify="space-between">
        <Card.Title>Summary</Card.Title>
        <Stack gap={8} align="center">
          <Card.Label>{createdAt && Utils.formatDate(createdAt)}</Card.Label>{' '}
          <Card.Label>
            ID:{' '}
            <TSpan colorToken="--text-card-neutral-highlighted">
              {Utils.appendAdPrefix(adId ?? '')}
            </TSpan>
          </Card.Label>
        </Stack>
      </Stack>

      <Card.Label>
        Campaign: <Card.ValueBold>{title}</Card.ValueBold>
      </Card.Label>
      <Card.Divider />

      {!isMobile && (
        <Stack align="center" gap={32} wrap="wrap">
          <Card.CampaignMetrics label="Start Date:">
            {startAt}
          </Card.CampaignMetrics>
          <Card.CampaignMetrics label="Estimated End Date:">
            {endAt}
          </Card.CampaignMetrics>
          <Card.CampaignMetrics label="Estimated Duration:">
            {estimatedDuration} days
          </Card.CampaignMetrics>
          <Card.CampaignMetrics label="Noum:">
            <NOUMCard
              name={noumId?.name ?? ''}
              image={noumId?.profileImage ?? DefaultImage}
            />
          </Card.CampaignMetrics>
        </Stack>
      )}

      {isMobile && (
        <>
          <Stack align="start" justify="space-between">
            <Card.CampaignMetrics minWidth={false} label="Start Date:">
              {startAt}
            </Card.CampaignMetrics>
            <Card.CampaignMetrics
              minWidth={false}
              label={
                <>
                  Estimated <br /> End Date:
                </>
              }
            >
              {endAt}
            </Card.CampaignMetrics>
            <Card.CampaignMetrics
              minWidth={false}
              label={
                <>
                  Estimated <br /> Duration:
                </>
              }
            >
              {estimatedDuration} days
            </Card.CampaignMetrics>
          </Stack>
          <Spacer height={16} />
          <Card.CampaignMetrics label="Noum:">
            <NOUMCard
              name={noumId?.name ?? ''}
              image={noumId?.profileImage ?? DefaultImage}
            />
          </Card.CampaignMetrics>
        </>
      )}

      <Card.Divider />

      <Stack
        vertical={isMobile}
        align="stretch"
        gap={isMobile ? 13 : 32}
        wrap="wrap"
      >
        <Card.CampaignMetrics
          label="Estimated Total Cost:"
          vertical={!isMobile}
        >
          <Tag secondary>{Utils.numberWithCommas(costTotal ?? 0)} USD</Tag>
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Weekly Cost:" vertical={!isMobile}>
          {Utils.numberWithCommas(costWeekly ?? 0)} USD
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Est. Weekly Clicks:" vertical={!isMobile}>
          {Utils.numberWithCommas(clicksWeekly ?? 0)}
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Avg. cost per click:" vertical={!isMobile}>
          {Utils.numberWithCommas(cpc ?? 0)} USD
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Reach" vertical={!isMobile}>
          {Utils.numberWithCommas(reachTotal ?? 0)}
        </Card.CampaignMetrics>
      </Stack>

      <Card.Divider />

      <Stack
        vertical={isMobile}
        align="stretch"
        gap={isMobile ? 13 : 21}
        wrap="wrap"
      >
        <Card.CampaignMetrics label="Audience" isBold={false}>
          {category}
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Location:" isBold={false}>
          <CountryCard flag={flag} country={country} />
        </Card.CampaignMetrics>
        <Card.CampaignMetrics label="Language:" isBold={false}>
          {targetLanguage}
        </Card.CampaignMetrics>
      </Stack>
    </Layout.Card>
  );
}
