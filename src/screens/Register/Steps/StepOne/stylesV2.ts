import { TSpan } from '@/components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const Header = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  justify: 'center',
  gap: 16,
})`
  align-items: center;
`;

export const FormWrapper = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  gap: 12,
})`
  width: 450px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  z-index: 2;
  background: while;
  top: -120%;
  right: -75%;
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 8px;
    border-color: transparent white transparent transparent;
  }
`;

export const AuthenticationWrapper = styled(Stack).attrs({
  vertical: true,
  fullWidth: true,
  gap: 12,
})`
  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
  }
  /* To show the lines on right 
and left sides of the text */
  .divider::after,
  .divider::before {
    content: '';
    border: 1px solid var(--bg-separator-neutral-default);
    flex: 1;
  }

  /* Space on left and right sides of text */
  .divider:not(:empty)::before {
    margin-right: 0.25em;
  }

  .divider:not(:empty)::after {
    margin-left: 0.25em;
  }
`;

export const LoginLink = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-highlighted',
})`
  cursor: pointer;
`;

export const TermsLink = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-header-neutral-highlighted',
})`
  cursor: pointer;
`;

export const SignupTitle = styled(TSpan).attrs({
  font: 'heading-m-bold',
  colorToken: '--text-modal-header-neutral-default',
})``;

export const SignupSubTitle = styled(TSpan).attrs({
  font: 'body-l',
  colorToken: '--text-card-header-neutral-default',
})``;

export const Note = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-default',
})``;

export const FooterNote = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-header-neutral-disabled',
})``;

export const Form = styled.form`
  width: 100%;
`;

export const Body = styled(Stack).attrs({
  vertical: true,
})`
  padding: 24px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--bg-separator-neutral-default);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    border: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0px;
  }
`;

export const Footer = styled(Stack).attrs({
  vertical: true,
})`
  width: 402px;
  align-items: center;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: auto;
  }
`;

export const ReferralStack = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 402px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px 12px;
  background: var(--color-base-secondary-10);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;
