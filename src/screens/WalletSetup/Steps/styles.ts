import styled, { keyframes } from 'styled-components';
import { TSpan } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';

export const FormWrapper = styled.div<{ isMobile?: boolean }>`
  width: 438px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-left: ${({ isMobile }) => (isMobile ? '16px' : '0px')};
  padding-right: ${({ isMobile }) => (isMobile ? '16px' : '0px')};
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 95%;
  }
`;

export const FormText = styled(TSpan)`
  text-align: center;
`;

export const FormHelperText = styled(TSpan)`
  text-align: center;
`;
export const FormHelperTextBold = styled(FormHelperText)``;

export const Note = styled(TSpan)<{ leftMargin?: boolean }>`
  padding-left: ${({ leftMargin }) => (leftMargin ? '12px' : '0')};
`;

export const StyledSpinner = styled.div`
  position: relative;
  width: 100%;
`;

const resendCodeAnimation = keyframes`
0% { opacity: 1; visibility: visible; z-index: 100; position: static;}
100% { opacity: 0; visibility: hidden; z-index: -1; height: 0; }

`;

export const StyledResendSpan = styled.div`
  text-align: center;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
  opacity: 0;
  animation-name: ${resendCodeAnimation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const resendCodeWaitAnimation = keyframes`
0% { opacity: 1;}
100% {opacity: 1;}
`;

export const StyledResendWaitSpan = styled.div<{
  duration: number;
}>`
  width: 100%;
  opacity: 0;
  animation-name: ${resendCodeWaitAnimation};
  animation-duration: ${(props) => props.duration}s;
  animation-delay: 3s;
  text-align: center;
  align-items: 'center';
  justify-content: 'center';
`;

export const FormTerms = styled(FormHelperText)`
  color: var(--text-body-header-neutral-default);
  font-size: var(--font-input-small-size);
  text-align: left;
`;

export const FormLink = styled.a`
  text-decoration: none;
`;

export const FormLinkText = styled(FormTerms)`
  color: var(--text-skillbadge-brand-primary-selected);
`;
