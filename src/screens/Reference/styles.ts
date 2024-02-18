import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';

export const StyledRichEditor = styled.div`
  width: 100%;
  overflow-y: auto;
  gap: 16px;
  height: calc(600px - 156px);
  @media (max-width: ${sizes.TABLET_L}) {
    height: calc(100vh - 88px);
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    height: calc(100vh - 134px);
  }
  ${noScrollBar}
`;

export const WrapperContainer = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  @media (min-width: ${sizes.TABLET_L}) {
    width: 668px;
    margin: auto;
  }
`;

export const CompletedProvidingReferenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ProjectContainer = styled.div`
  padding: 12px;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
  @media (min-width: ${sizes.TABLET_L}) {
    width: 50%;
  }
`;

export const Header = styled.div`
  padding: 22px;
  padding-left: 40px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-left: 16px;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin: 0 !important;
`;
