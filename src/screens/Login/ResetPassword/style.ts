import styled from 'styled-components';

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  z-index: 2;
  background: var(--bg-tooltip-neutral-alt-default);
  top: -120%;
  right: -75%;
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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
