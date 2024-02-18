import { type FC, useMemo } from 'react';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { ProjectNoumCampaignStatus } from '@/apollo/generated/types';
import {
  Dropdown,
  DropdownPicker,
  type DropdownTargetProps,
} from '@/components/Dropdown';
import { useTimeIndicator } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Tag } from '@/components/Tag';
import Icon from '@/components/Icon/Icon';
import {
  CampaiginSummaryItem,
  CampaignBodyContainer,
  CampaignContainer,
  CampaignFiltersContainer,
  CampaignFilterTabsContainer,
  CampaignHeaderContainer,
  CampaignHeaderTitleContainer,
  CampaignSummaryContainer,
} from './styles';
import {
  type CampaignComponentProps,
  type CampaignHeaderProps,
  type CampaignProps,
  type CampaignSummaryItem,
} from './types';
import { campaignSummaryOptions, campaignActionOptions } from './data';

const CampaignActions: FC<{
  onDelete: () => void;
}> = ({ onDelete }) => (
  <>
    <div data-testid="campaign-actions-testid">
      <Dropdown
        hideIcons
        closeOnSelect
        placement="bottom-end"
        options={campaignActionOptions}
        containerWidth="auto"
        onSelectOption={onDelete}
        usePortal={false}
        calRefTop={false}
        isAnimation={false}
        usePopStyle={true}
        observerMinHeight="0"
      >
        {({
          targetProps,
          targetRef,
          toggle,
        }: DropdownTargetProps<HTMLDivElement>) => (
          <DropdownPicker ref={targetRef} {...targetProps} onClick={toggle}>
            <Icon
              name="more_m"
              size={24}
              color="--icon-button-brand-primary-default"
            />
          </DropdownPicker>
        )}
      </Dropdown>
    </div>
  </>
);

const CampaignHeader = ({
  status,
  id,
  selectBroadcast,
  onDelete,
  startedAt = '',
  unformattedStartTime,
}: CampaignHeaderProps) => {
  const stillOngoing = useMemo(
    () =>
      status === ProjectNoumCampaignStatus.Active ||
      status === ProjectNoumCampaignStatus.Refreshed,
    [status],
  );

  const [countDown] = useTimeIndicator(
    stillOngoing ? unformattedStartTime : '',
  );

  return (
    <CampaignHeaderContainer data-testid="campaign-header-testid">
      <CampaignHeaderTitleContainer>
        <CampaignBodyContainer spaceBetween>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {startedAt}
          </TSpan>
          {stillOngoing && (
            <CampaignActions
              onDelete={() => {
                selectBroadcast(id);
                onDelete();
              }}
            />
          )}
        </CampaignBodyContainer>
        <CampaignBodyContainer spaceBetween={stillOngoing}>
          <Tag
            tertiary={status === ProjectNoumCampaignStatus.Cancelled}
            success={stillOngoing}
          >
            <Trans
              i18nKey={`noumena.chamber_edit.broadcasting.campaign.status.${status?.toLowerCase()}`}
            />
          </Tag>
          {stillOngoing ? (
            <TSpan font="body-m" colorToken="--text-body-neutral-default">
              {t('noumena.broadcasting.countdown', {
                countDown,
              })}
            </TSpan>
          ) : undefined}
        </CampaignBodyContainer>
      </CampaignHeaderTitleContainer>
    </CampaignHeaderContainer>
  );
};

const CampaignFilters = () => (
  <CampaignFiltersContainer data-testid="campaign-filters-testid">
    <Trans
      i18nKey="noumena.chamber_edit.broadcasting.campaign.label.filters"
      components={{
        note: (
          <TSpan
            font="footnote-bold"
            colorToken="--text-card-neutral-default"
          />
        ),
      }}
    />
    <CampaignFilterTabsContainer>
      <Tag tertiary>
        <Trans i18nKey="noumena.chamber_edit.broadcasting.campaign.tabs.my_connections" />
      </Tag>
      <Tag tertiary>
        <Trans i18nKey="noumena.chamber_edit.broadcasting.campaign.tabs.followers_of_my_noums" />
      </Tag>
    </CampaignFilterTabsContainer>
  </CampaignFiltersContainer>
);

const SummaryItem = ({ property, value }: CampaignSummaryItem) => (
  <>
    <CampaiginSummaryItem data-testid="campaign-summary-item-testid">
      <Trans
        i18nKey={property}
        components={{
          note: (
            <TSpan
              font="footnote-bold"
              colorToken="--text-body-neutral-default"
            />
          ),
        }}
      />
      <TSpan font="footnote-bold" colorToken="--text-body-neutral-highlighted">
        {value}
      </TSpan>
    </CampaiginSummaryItem>
  </>
);

const CampaignSummary = (props: CampaignProps) => (
  <CampaignSummaryContainer data-testid="campaign-summary-container-testid">
    {campaignSummaryOptions.map(({ translationKey, mapKey }) => (
      <SummaryItem
        key={mapKey}
        property={translationKey}
        value={
          props.status !== ProjectNoumCampaignStatus.Cancelled
            ? props[mapKey] ?? '-'
            : '-'
        }
      />
    ))}
  </CampaignSummaryContainer>
);

export default function Campaign(props: CampaignComponentProps) {
  const {
    id,
    status,
    startedAt,
    onDelete,
    selectBroadcast,
    unformattedStartTime,
  } = props;
  return (
    <CampaignContainer data-testid="campaign-testid" key={id}>
      <CampaignHeader
        {...{
          id,
          status,
          startedAt,
          onDelete,
          selectBroadcast,
          unformattedStartTime,
        }}
      />
      <CampaignFilters />
      <CampaignSummary {...props} />
    </CampaignContainer>
  );
}
