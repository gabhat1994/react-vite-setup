import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { bodyTypography } from '@/components/Typography';

export const InviteFriendsWrapper = styled.form`
  height: 100%;
  display: flex;
  gap: 0;
  position: relative;
  @media (max-width: ${sizes.LAPTOP}) {
    flex-direction: column;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex-direction: column;
    margin-left: 16px;
  }
`;
export const LeftContent = styled.div`
  width: 401px;
  @media (max-width: ${sizes.LAPTOP}) {
    width: 820px;
    margin-left: 204px;
  }
  @media (max-width: ${sizes.TABLET}) {
    width: 560px;
    margin-left: 204px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 405px;
    margin-left: 0;
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    width: 360px;
    margin-left: 0;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 401px;

  @media (max-width: ${sizes.TABLET}) {
    width: 360px;
    margin-top: 28px;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 348px;
    margin: 28px 20px 0 20px;
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    width: 300px;
  }
`;
export const HeaderWrapper = styled.div`
  margin-top: 24px;
  @media (max-width: ${sizes.TABLET}) {
    display: none;
    margin-top: 0px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: none;
    margin-top: 0px;
  }
`;
export const InvitesWrapper = styled.div`
  height: 100%;
  margin-top: 96px;
  width: 400px;
  flex: 0;
  flex-grow: 1;
  display: flex;
  margin-left: 109px;
  flex-direction: column;
  @media (max-width: ${sizes.LAPTOP}) {
    order: 1;
    margin-left: 204px;
    margin-top: 24px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    order: 1;
    margin-left: 0;
    margin-top: 24px;
    > span {
      font-size: 16px;
    }
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    width: 300px;
    margin: 28px 20px 60px 20px;
    > span {
      font-size: 16px;
    }
  }
`;

export const ReferralCodeHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 401px;
  border-radius: 16px;
  background: var(--bg-input-neutral-default);
  padding: 16px;
  button {
    margin-top: 8px;
    background: var(--bg-button-neutral-alt-default);
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    /* width: 343px; */
    width: calc(343px - 16px - 32px);
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    width: 290px;
  }
`;

export const InvHead = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${bodyTypography.bodyMedium}
`;

export const InvDataHead = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const InvDataBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InvTitle = styled.span`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  color: var(--text-tablecell-header-neutral-highlighted);
  ${bodyTypography.bodyMediumBold};
`;
export const InvContainer = styled.div`
  width: 100%;
`;
