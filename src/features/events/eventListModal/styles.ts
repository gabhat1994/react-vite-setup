import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';
import { Icon } from '@/components/Icon';
import { sizes } from '@/constants/devices';

export const EventListModalHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  flex-shrink: 0;
  position: sticky;
  background-color: var(--bg-modal-neutral-alt-default);
  ${noScrollBar}
  padding-bottom: 16px;
`;

export const EventListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${sizes.TABLET_L}) {
    width: 100%;
  }
`;

export const EventListEmptyScreenWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

export const EventListEmptyScreenSubHint = styled.div`
  padding: 0 60px;
  text-align: center;
  flex-direction: column;
`;

export const EventListEmptyScreenArrowsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: break-spaces;
`;

export const EventListEmptyScreenArrowIcon = styled(Icon)`
  display: inline-block;
`;

export const AllEventListWrapper = styled.div<{ canFetchMore: boolean }>`
  overflow: visible;
  position: relative;
  padding-bottom: ${({ canFetchMore }) => (canFetchMore ? '26px' : '0px')};
  ${noScrollBar}
  & > :first-child {
    padding-top: 0;
  }
  #atcb-customTrigger-atcb-btn-noumena-atc-host {
    left: 1px !important;
  }
`;

export const EventItemGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .atc-tooltip:hover::after {
    left: 0;
  }
`;
