import styled from 'styled-components';
import { type StepProps } from './types';
import { getStepBgColor, getStepColor, getStepPointBgDimens } from './helpers';

export const Point = styled.div`
  border-radius: 100%;
  transition: background-color 0.2s linear 0s;
  z-index: 1000;
`;

export const PointBackground = styled.div<StepProps>`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s linear 0s;
  background-color: ${(props) => getStepBgColor(props.isPassed)};
  ${(props) => getStepPointBgDimens(props.isPassed)}

  ${Point} {
    height: 8px;
    width: 8px;
    background-color: ${(props) => getStepColor(props.isPassed)};
  }
`;

export const Container = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProgressBarContainer = styled.div<{ top?: number }>`
  width: calc(100% - 20px);
  padding: 0 10px;
  position: absolute;
  top: ${(props) => (props.top ? props.top : 0)}px;
  left: 0;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

export const RootContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`;
