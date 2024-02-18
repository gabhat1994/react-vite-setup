import styled, { keyframes } from 'styled-components';

export const StyledSpacer = styled.div`
  padding-top: 16px;
`;

export const StyledSpinner = styled.div`
  position: relative;
  width: 100%;
`;
export const StyledResendOTPWrapper = styled.div<{ minHeight?: string }>`
  min-height: ${({ minHeight }) => minHeight ?? '100px'};
  position: relative;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const StyledButton = styled.div`
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;

  button span {
    color: var(--text-button-brand-secondary-default);
  }
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
