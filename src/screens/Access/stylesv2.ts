import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';
import { TSpan } from '@/components';

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

export const Form = styled(Stack).attrs({
  align: 'center',
  justify: 'flex-start',
  vertical: true,
})``;
export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  z-index: 2;
  background: while;
  top: -120%;
  right: -87%;
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

export const TextHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 85px;
  height: 80vh;
`;

export const Footer = styled(Stack).attrs({
  vertical: true,
})`
  width: 402px;
  align-items: center;
  @media (max-width: ${sizes.MOBILE_L}) {
    width: auto;
  }
`;

export const FooterNote = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-header-neutral-disabled',
})``;

export const TermsLink = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-header-neutral-highlighted',
})`
  cursor: pointer;
`;

export const OutlineBox = styled(Stack).attrs({
  vertical: true,
  gap: 24,
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
