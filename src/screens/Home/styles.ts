import styled from 'styled-components';
import { mediaSizes, sizes } from '@/constants/devices';
import { singleLineEllipisText } from '@/common/globalStyles';
import {
  StyledCompleteInfoCard,
  StyledUserInfoCard,
} from './components/SideBar/styles';

export const Container = styled.div<{ isAppUiV2: boolean }>`
  * {
    box-sizing: border-box;
  }
  font-family: var(--font-family);
  display: grid;
  gap: 16px;
  box-sizing: border-box;
  ${(props) =>
    !props.isAppUiV2 &&
    `
  @media (max-width: ${mediaSizes.MOBILE_S_MAX}) and (min-width: ${mediaSizes.MOBILE_S_MIN}) {
    width: 100%;
    gap: 16px;
    padding-bottom: 80px;
    padding-top: 16px;
  }
  @media (max-width: ${mediaSizes.MOBILE_M_MAX}) and (min-width: ${mediaSizes.MOBILE_M_MIN}) {
    gap: 16px;
    padding-bottom: 80px;
    padding-top: 16px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) and (min-width: ${mediaSizes.MOBILE_L_MIN}) {
    width: calc(100vw);
    gap: 16px;
    padding-bottom: 80px;
    padding-top: 16px;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.TABLET_MIN}) {
    width: calc(100vw);
    padding-bottom: 110px;
    padding-top: 16px;
  }
  @media (max-width: ${sizes.LAPTOP_L}) and (min-width: ${sizes.LAPTOP}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  @media (max-width: ${mediaSizes.LAPTOP_MAX}) and (min-width: ${sizes.LAPTOP_SM}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  @media (max-width: ${mediaSizes.LAPTOP_L_MAX}) and (min-width: ${mediaSizes.LAPTOP_L_MIN}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  @media (min-width: ${sizes.DESKTOP}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  `}
`;

export const NoumMeCard = styled(StyledCompleteInfoCard)`
  display: none;
  border-radius: unset;
  align-items: center;

  span {
    display: inline-block;
  }

  @media (max-width: ${sizes.TABLET_L}) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    padding: 32px;
    justify-content: space-between;
    > div:first-of-type {
      width: 60%;
    }
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex-direction: column;
    padding: 16px;
    gap: 48px;
    > div:first-of-type {
      width: 100%;
      span:first-of-type {
        width: 80%;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const UserInfoCard = styled(StyledUserInfoCard)`
  display: none;
  border-radius: unset;
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    .name-and-title {
      width: 60%;
      .name {
        padding-top: unset;
        ${singleLineEllipisText}
      }
      .job-title {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        ${singleLineEllipisText}
        color: var(--text-card-header-neutral-default);
      }
    }
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    .right {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .name-and-title {
        width: 100%;
      }
      .job-title {
        display: none !important;
      }
    }
  }
  @media (max-width: ${sizes.TABLET_L}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
