import styled from 'styled-components';
import { Button } from '@/components/Button';
import { bodyTypography, TSpan } from '@/components/Typography';
import { mediaSizes, sizes } from '@/constants/devices';
import { singleLineEllipisText } from '@/common/globalStyles';
import { ButtonText } from '@/components/Button/styles';

export const UserFormHeader = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: block;
    min-height: unset;
  }
  gap: 10px;
`;

export const ModalDescription = styled(TSpan)`
  line-height: 160%;
`;

export const SettingWrapper = styled.div<{ justifyCenter?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.justifyCenter ? 'center' : 'space-between'};
  gap: 12px;
  width: 100%;
  padding-top: 16px;
  box-sizing: border-box;
`;

export const DropdownContainer = styled.div`
  flex: 1;
`;

export const DropdownWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) => props.fullWidth && 'width: 100%'};
`;

export const DescriptionWrapper = styled.div`
  padding-top: 5px;
  margin-left: 12px;
`;

export const NonMemberDescriptionWrapper = styled.div<{ isMobile?: boolean }>`
  padding-top: 0px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding-top: 6px;
  }
`;

export const Description = styled(TSpan)`
  width: 100%;
  line-height: 160%;
`;

export const TextUnderLine = styled(TSpan)`
  width: 100%;
  line-height: 160%;
  font-weight: 600;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const Divider = styled.div`
  width: 100%;
  border-top: 1px solid var(--bg-separator-neutral-default);
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const InviteTitle = styled.div`
  width: 100%;
`;

export const SaveButton = styled(Button)`
  width: 100px;
`;

export const InvitedUsersWrapper = styled.div`
  width: 100%;
  padding-bottom: 12px;
  box-sizing: border-box;
  height: 296px;
  overflow-y: auto;
  @media (max-width: ${sizes.TABLET_L}) {
    height: calc(100vh - 453px);
    overflow-y: auto;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  min-height: 86px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding-left: 16px;
  box-sizing: border-box;
`;

export const UserBody = styled.div<{ isPadding?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: ${(props) => (props.isPadding ? '16px' : 0)};
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  span {
    ${singleLineEllipisText}
  }
`;

export const DropdownPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const PickedInviteStatus = styled(TSpan)`
  margin-right: 12px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 296px;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    height: calc(100vh - 452px);
  }
`;

export const TabSection = styled.div`
  ${bodyTypography.bodyMedium};
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    justify-content: flex-start;
  }
`;

export const CountryName = styled.div`
  min-width: 240px;
`;

export const CountryDescription = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    justify-content: flex-start;
    width: 100%;
  }
`;

export const TabContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const FieldContent = styled.div<{ width?: string }>`
  padding: 12px 0px;
  width: ${(props) => props.width};
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding: 6px 0px;
    width: 100%;
  }
`;

export const ViewCountriesButton = styled(Button)`
  display: inline;
  height: auto;
  width: auto;
  min-height: unset;
  max-height: unset;
  min-width: unset;
  vertical-align: baseline;
  padding: 0;
  margin: 0;

  & > ${ButtonText} {
    text-decoration: underline;
    font: inherit;
    color: var(--text-input-neutral-default);
  }
`;
