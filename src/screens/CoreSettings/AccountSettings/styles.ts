import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';

export const AccountWrapper = styled.div`
  height: 100%;
  gap: 0;
  display: block;
  width: 590px;
  @media (max-width: ${sizes.TABLET_L}) {
    margin-bottom: 0px;
    max-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    margin-left: calc((100vw - 401px) / 2);
    overflow-y: hidden;
    margin-bottom: 40px;
  }

  @media (max-width: ${sizes.TABLET}) {
    margin-left: calc((100vw - 360px) / 2);
    margin-bottom: 98px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    margin-left: calc((100vw - 343px) / 2);
    margin-bottom: 98px;
  }
`;

export const EditAndEnableButton = styled(Button)`
  width: 175px;

  @media (max-width: ${sizes.TABLET_L}) {
    width: 401px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 343px;
  }
`;

export const ActionButton = styled(Button)`
  width: 175px;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const DeleteAccountWrapper = styled.div`
  padding-top: 190px;
  @media (max-width: ${sizes.TABLET_L}) {
    text-align: center;
    padding-top: 170px;
  }
`;
export const DeleteAccountWrapperV2 = styled(Stack).attrs({})`
  position: absolute;
  bottom: 20px;
`;

export const FourDigitOtp = styled.p`
  height: 48px;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-input-medium-regular-weight);
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const DeleteAccountParagraph = styled.div`
  width: 100%;
  font-style: normal;
  line-height: 150%;
  text-align: center;
`;

export const LinkIconWrapper = styled.div`
  display: flex;
`;

export const DeleteAccountProceed = styled.div`
  text-align: center;
`;

export const TextHeader = styled.div``;

export const DeleteFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: ${sizes.TABLET}) {
    display: block;
    width: 768px;
    div {
      width: 360px;
    }
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: block;
    width: 767px;
    div {
      width: 343px;
    }
  }
`;

export const PhoneInputBox = styled.div`
  width: 401px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 343px;
  }
`;

export const EmailInputBox = styled.div`
  width: 401px;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 343px;
  }
`;

export const EmailInputBoxV2 = styled.div`
  width: 401px;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const StyledButton = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  button {
    border-radius: 0;
  }

  svg path {
    ${({ isDisabled }) =>
      isDisabled &&
      'fill: var(--icon-button-neutral-disabled); cursor: default;'};
  }

  :hover {
    svg path {
      ${({ isDisabled }) =>
        isDisabled &&
        'fill: var(--icon-button-neutral-disabled); cursor: default;'};
    }
  }
`;

export const AdvancedSettingsWrapper = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PrivacyPolicyLink = styled(TSpan)<{ isDisabled?: boolean }>`
  text-decoration-line: underline;
  cursor: pointer;
  padding-left: 3px;
  ${({ isDisabled }) => isDisabled && 'cursor: default;'};
`;

export const RemoveAccount = styled.div`
  margin-left: 20px;
`;

export const CheckBoxWrapper = styled.div`
  position: relative;
`;

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 26px;
  border-radius: 15px;
  background: var(--bg-toggle-neutral-default);
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 4px;
    background: var(--bg-toggle-neutral-alt-default);
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 24px;
  &:checked + ${CheckBoxLabel} {
    background: var(--bg-toggle-brand-primary-selected);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export const RightIcon = styled(Icon)<{
  isOpen?: boolean;
  isDisabled?: boolean;
}>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
  ${({ isDisabled }) => isDisabled && 'cursor: default'};
  svg path {
    ${({ isDisabled }) =>
      isDisabled &&
      'fill: var(--icon-button-neutral-disabled); cursor: default'};
  }
`;

export const TextFieldWrapper = styled.div`
  text-align: left;
  width: 100%;
`;
export const AccountWrapperV2 = styled.div`
  height: 100%;
  gap: 0;
  display: block;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    padding: 0px 100px;
    margin-bottom: 0px;
  }

  @media (max-width: ${sizes.TABLET_L}) {
    margin-bottom: 98px;
    padding-top: 24px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 24px;
  }
`;

export const StyledStack = styled(Stack)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const StyledTSpan = styled(TSpan)``;
