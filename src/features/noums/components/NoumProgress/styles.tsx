import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const StyledNoumProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  min-width: 322px;
  /* min-height: 182px; */

  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 704px;
    min-height: 96px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    min-width: unset;
    margin: unset;
  }

  background: var(--bg-card-brand-primary-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;
`;

export const StyledNoum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  width: calc(100% - 32px);
  gap: 16px;
`;

export const StyledFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  min-width: 290px;
  max-height: 72px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 672px;
    max-height: 50px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    min-width: unset;
    max-height: 72px;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 290px;
  height: 38px;
  justify-content: space-between;
  background: var(--bg-profile-completion-brand-primary-default);
  border-radius: 8px;
  cursor: pointer;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 672px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    /* min-width: 311px; */
    min-width: unset;
  }
`;

export const StyledDiv = styled.div`
  padding: 8px 0px 8px 12px;
  width: 100%;
  min-width: 223px;

  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 605px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    min-width: 244px;
  }
`;

export const StyledButtonDiv = styled.div`
  padding: 8px 12px 8px 0px;
  cursor: pointer;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
`;

export const ProgressItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
  min-width: 290px;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;
