import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const StoriesCnt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin: 0 auto;
  font-family: var(--font-family);
`;

export const StoriesWrapper = styled.div`
  display: flex;
  height: 254px;
`;

export const CampaignContainer = styled.div`
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 343px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  gap: 12px;

  @media (min-width: ${sizes.MOBILE_MAX}) and (max-width: ${sizes.TABLET_L}) {
    width: 359.5px;
  }
`;

export const CampaignSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
  z-index: 3;

  & :last-child {
    border: none;
  }
`;

export const CampaiginSummaryItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 8px;
  height: 27px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const CampaignHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  row-gap: 4px;
  min-height: 64px;
  width: 100%;
`;

export const CampaignHeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const CampaignBodyContainer = styled.div<{ spaceBetween?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ spaceBetween }) =>
    spaceBetween ? 'space-between' : 'flex-start'};
`;

export const CampaignFilterTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

export const CampaignFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  z-index: 2;
`;
