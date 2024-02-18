import styled, { css } from 'styled-components';
import { alertColor, alertFontColor } from '@/utils/colors';
import { Stack } from '@/layout';
import { type AlertType } from './types';
import { TSpan } from '../Typography';

export const pTopCenter = css`
  top: 40px;
  right: 50%;
  transform: translate(50%);
  transition: transform 0.6s ease-in-out;
  animation: toast-in-top 0.7s;
`;

export const Container = styled(Stack)<{
  type: AlertType;
  out: boolean;
  width?: number;
}>`
  background-color: ${(p) => alertColor[p.type]};
  width: ${({ width }) => (width ? `${width}px` : `343px;`)};
  margin: 4px 0;
  padding: 9px 16px;
  border-radius: 6px;

  animation: fade 0.3s linear;
  @keyframes fade {
    from {
      transform: scale(0.25);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  opacity: 1;
  transform: scale(1);
  transition: transform 0.3s 0s, opacity 0.3s 0s;
  ${(p) => (p.out ? 'opacity: 0; transform: scale(0.25);' : undefined)}
`;

export const Message = styled(TSpan)<{ type: AlertType }>`
  color: ${(p) => alertFontColor[p.type]};
  padding-top: 2px;
  word-break: break-word;
  * {
    color: ${(p) => alertFontColor[p.type]};
  }
`;

export const DismissIconButton = styled(Stack)`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  path {
    fill: var(--icon-snackbar-neutral-alt-default);
  }

  #cpb-container {
    position: absolute;
    top: 0;
    left: 0;
  }

  #button-container {
    z-index: 9999;
    padding: 2px;
  }
`;

export const DismissTextButton = styled(Stack)`
  width: 50px;
  height: 24px;
  cursor: pointer;
`;
