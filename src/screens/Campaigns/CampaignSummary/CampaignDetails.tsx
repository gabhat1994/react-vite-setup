import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import DefaultImage from '@/assets/images/chamber_default.png';
import { useBreakpoints } from '@/hooks/useBreakpoints';

import { type CampaignSummaryFragment } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { Divider } from '../components/Divider';
import { NOUMCard } from '../components/NoumCard';
import S from './styles';
import { Badge, type Props } from '../components/Badge';
import { GOALS, BudgetType } from './types';
import { Utils } from '../utils';
import { CountryCard } from '../components/CountryCard';

type HeadingProps = { applyTouchStyles: boolean } & Pick<
  CampaignSummaryFragment,
  'title' | 'status' | 'startDate' | 'adId'
>;

function Heading({ applyTouchStyles, title, status, adId }: HeadingProps) {
  const badgeStatus = status as Props['status'];
  return (
    <>
      {applyTouchStyles && (
        <>
          <Stack vertical gap={8}>
            {status && <Badge status={badgeStatus} />}
            <S.ContainerTitle>{title}</S.ContainerTitle>{' '}
            {adId && (
              <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
                <TSpan colorToken="--text-card-neutral-default">ID:</TSpan>
                {Utils.appendAdPrefix(adId ?? '')}
              </TSpan>
            )}
          </Stack>
          <Divider />
        </>
      )}
      {!applyTouchStyles && (
        <>
          <Stack align="start" justify="space-between">
            <Stack maxWidth="80%" gap={8}>
              <S.ContainerTitle>{title}</S.ContainerTitle>
              {status && (
                <S.StackForCampaignHeading>
                  <Spacer height={4} />
                  <Badge status={badgeStatus} />
                </S.StackForCampaignHeading>
              )}
            </Stack>
            {adId && (
              <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
                <TSpan colorToken="--text-card-neutral-default">ID:</TSpan>{' '}
                {Utils.appendAdPrefix(adId ?? '')}
              </TSpan>
            )}
          </Stack>
          <Divider />
        </>
      )}
    </>
  );
}

type InformationProps = { isMobile: boolean } & Pick<
  CampaignSummaryFragment,
  'startDate' | 'noumId' | 'budgetType' | 'budgetAmount'
>;

function Information({
  startDate,
  noumId,
  budgetAmount,
  budgetType = BudgetType.TOTAL_BUDGET,
  isMobile,
}: InformationProps) {
  return (
    <>
      <S.InfoContainer>
        <S.Info>
          <S.Label>Start Date</S.Label>
          <S.Value>{Utils.formatDateForSummary(startDate)}</S.Value>
        </S.Info>
        <S.Info>
          {/* @ts-ignore */}
          <S.Label>{BudgetType[budgetType as BudgetType]}</S.Label>
          <S.Value>{budgetAmount ?? 0} USD</S.Value>
        </S.Info>
        {!isMobile && (
          <S.Info>
            <S.Label>Noum:</S.Label>
            <NOUMCard
              name={noumId?.name ?? ''}
              image={noumId?.profileImage ?? DefaultImage}
            />
          </S.Info>
        )}
      </S.InfoContainer>
      {isMobile && (
        <>
          <Spacer height={16} />
          <S.Info>
            <S.Label>Noum:</S.Label>
            <NOUMCard
              name={noumId?.name ?? ''}
              image={noumId?.profileImage ?? DefaultImage}
            />
          </S.Info>
        </>
      )}
      <Divider />
    </>
  );
}

type GoalsProps = { applyTouchStyles: boolean } & Pick<
  CampaignSummaryFragment,
  'goals' | 'otherGoals'
>;

function Goals({ applyTouchStyles, goals, otherGoals = '' }: GoalsProps) {
  const firstRow = cleanList(goals?.slice(0, 2));
  const secondRow = cleanList(goals?.slice(2));

  return (
    <>
      <S.Label>Goals</S.Label>
      <Spacer height={8} />
      <Stack vertical={applyTouchStyles} gap={applyTouchStyles ? 0 : 8}>
        {!!firstRow?.length && (
          <S.Ul>
            {firstRow?.map((goal) => {
              const goalText =
                // @ts-ignore
                goal !== GOALS.OTHER ? GOALS[goal as GOALS] : otherGoals;
              return (
                <li>
                  <S.Value>{goalText}</S.Value>
                </li>
              );
            })}
          </S.Ul>
        )}
        {!!secondRow?.length && (
          <S.Ul>
            {secondRow?.map((goal) => {
              const goalText =
                // @ts-ignore
                goal !== GOALS.OTHER ? GOALS[goal as GOALS] : otherGoals;
              return (
                <li>
                  <S.Value>{goalText}</S.Value>
                </li>
              );
            })}
          </S.Ul>
        )}
      </Stack>
      <Divider />
    </>
  );
}

type DemoGraphicsProps = { applyTouchStyles: boolean } & Pick<
  CampaignSummaryFragment,
  'audience'
>;

function DemoGraphics({ applyTouchStyles, audience }: DemoGraphicsProps) {
  const flag = audience?.targetLocation?.[0]?.split('-')[0];

  let country = audience?.targetLocation?.[0]?.split('-')[1];

  country = country || flag;

  return (
    <>
      <S.InfoContainer
        vertical={applyTouchStyles}
        applyTouchStyles={applyTouchStyles}
        wrap="wrap"
      >
        <S.Info>
          <S.Label>Audience</S.Label>
          <S.Value>{audience ? audience?.category?.join(',') : ''}</S.Value>
        </S.Info>
        <S.Info>
          <S.Label>Target Audience Location</S.Label>
          <S.Value>
            {country && <CountryCard country={country} flag={flag} />}
          </S.Value>
        </S.Info>
        <S.Info>
          <S.Label>Language</S.Label>
          <S.Value>
            {audience ? audience?.targetLanguage?.join(',') : ''}
          </S.Value>
        </S.Info>
      </S.InfoContainer>
    </>
  );
}

export function CampaignDetails({
  audience,
  startDate,
  noumId,
  goals,
  budgetAmount,
  budgetType,
  adId,
  otherGoals,
  title = '',
  status = 'Pending',
}: CampaignSummaryFragment) {
  const devices = useBreakpoints();

  return (
    <S.Container>
      <Heading
        applyTouchStyles={devices.isMobile}
        title={title}
        status={status}
        adId={adId}
      />

      <Information
        startDate={startDate}
        noumId={noumId}
        budgetAmount={budgetAmount}
        budgetType={budgetType}
        isMobile={devices.isMobile}
      />

      <Goals
        applyTouchStyles={devices.isMobile}
        goals={goals}
        otherGoals={otherGoals}
      />

      <DemoGraphics
        applyTouchStyles={devices.isMobile || devices.isTablet}
        audience={audience}
      />
    </S.Container>
  );
}
