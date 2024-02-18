import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { ModalBody } from '@/components/ExtendedModal';

export const LeftContent = styled.div`
  width: 401px;
  @media (max-width: ${sizes.TABLET_L}) {
    width: 343px;
    margin: 0 auto;
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    width: calc(100vw - 32px);
  }
`;

export const Content = styled.div<{ vertical?: boolean }>`
  display: flex;
  flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
  gap: 16px;
  align-items: flex-start;
`;

export const UploadPhoto = styled.div`
  width: 170px;
  border: transparent;
  > div {
    display: flex;
    justify-content: flex-start;
  }
  button {
    margin-top: 16px;
  }
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;
export const HeaderWrapper = styled.div`
  margin-top: 24px;
  @media (max-width: ${sizes.TABLET_L}) {
    display: none;
    margin-top: 0px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: none;
    margin-top: 0px;
  }
`;
export const PersonalDetailsWrapper = styled(ModalBody)`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 6px;

  @media (min-width: ${sizes.LAPTOP}) {
    max-height: calc(100vh - 300px);
  }

  @media (max-width: ${sizes.TABLET_L}) {
    width: 343px;
    margin: 0 auto;
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 200px);
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 343px;
    margin: 0 auto;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    width: calc(100vw - 32px);
  }
`;

export const ProfileWrapper = styled.div`
  height: 100%;
  flex: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: ${sizes.LAPTOP}) {
    margin-left: 56px;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    margin-bottom: 32px;
  }
`;

export const AboutTextWrapper = styled.div`
  input {
    height: 104px;
  }
`;

export const SaveButtonWrap = styled.div<{ isModal?: boolean }>`
  @media (min-width: ${sizes.LAPTOP}) {
    width: 117px;
    margin: unset;
  }
  width: 360px;
  margin: 0 auto;
`;
