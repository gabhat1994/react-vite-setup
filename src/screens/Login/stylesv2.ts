import { TSpan } from '@/components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const Form = styled(Stack).attrs({
  align: 'center',
  justify: 'flex-start',
  vertical: true,
})`
  width: 450px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const Heading = styled(TSpan).attrs({
  font: 'heading-m-bold',
  colorToken: '--text-modal-header-neutral-default',
})``;

export const LoginLink = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-highlighted',
})`
  cursor: pointer;
`;

export const Note = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-default',
})``;

export const FooterNote = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-header-neutral-disabled',
})``;

export const AuthenticationWrapper = styled(Stack).attrs({
  vertical: true,
  fullWidth: true,
  gap: 12,
})`
  margin-bottom: 12px;
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
export const Container = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
  vertical: true,
})`
  height: 100%;
  width: 100%;
`;

export const Footer = styled(Stack).attrs({
  vertical: true,
})`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    position: absolute;
    width: 90%;
    bottom: 20px;
  }
`;

export const FooterLink = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

export const Body = styled(Stack).attrs({
  vertical: true,
})`
  padding: 24px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--bg-separator-neutral-default);
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    border: none;
    box-sizing: border-box;
    padding: 0px;
  }
`;

export const StyledStack = styled(Stack).attrs({
  vertical: true,
})`
  padding: 24px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--bg-separator-neutral-default);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    border: none;
    padding: 0px;
  }
`;

export const StyledForm = styled.form`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;
