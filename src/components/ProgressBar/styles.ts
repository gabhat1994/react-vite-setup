import styled from 'styled-components';
import { getPBFontSize } from '@/utils/dimens';

import { type ProgressBarProps } from './types';

export const Label = styled.span`
  color: var(--text-button-neutral-alt-default);
  font-weight: bold;
`;

export const Filler = styled.div<ProgressBarProps>`
  height: ${(props) => (props.barSize ? props.barSize : '20')}px;
  ${(props) => `width: ${props.percentage}%`};
  background-color: ${(props) =>
    props.color ? props.color : 'var(--bg-progressbar-brand-primary-default)'};
  transition: width 0.3s ease-in-out;
  border-radius: 4px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Label} {
    font-family: var(--font-family);
    font-size: ${(props) => getPBFontSize(props.barSize)}px;
  }
`;

export const Container = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  border-radius: 4px;
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
`;
