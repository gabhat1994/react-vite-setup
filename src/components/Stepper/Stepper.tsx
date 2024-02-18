import { type FC, useEffect, useMemo, useState } from 'react';
import { type StepperProps } from './types';
import { StepPoint } from './StepPoint';
import { ProgressBar } from '../ProgressBar';
import { getStepColor } from './helpers';
import {
  ProgressBarContainer,
  RootContainer,
  StepperContainer,
} from './styles';

export const Stepper: FC<StepperProps> = (props) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const percentage = useMemo(
    () => (100 * (currentStep - 1)) / (props.completed - 1),
    [currentStep, props.completed],
  );

  const handleClickStep = (step: number) => setCurrentStep(step);

  useEffect(() => setCurrentStep(props.currentStep), [props.currentStep]);

  return (
    <RootContainer data-testid="stepper-root-container">
      <StepperContainer data-testid="stepper-container">
        {[...Array(props.completed).keys()].map((value, i) => (
          <StepPoint
            pointNum={i + 1}
            isPassed={currentStep > i}
            isFirst={i === 0}
            isLast={i === currentStep - 1}
            key={`${value}`}
            onClick={handleClickStep}
          />
        ))}
      </StepperContainer>
      <ProgressBarContainer data-testid="stepper-pb-bg-container" top={6}>
        <ProgressBar
          percentage={percentage}
          color={getStepColor(false)}
          barSize={8}
        />
      </ProgressBarContainer>
      <ProgressBarContainer data-testid="stepper-pb-container" top={9}>
        <ProgressBar
          percentage={percentage}
          color={getStepColor(true)}
          barSize={2}
          backgroudColor={getStepColor(false)}
        />
      </ProgressBarContainer>
    </RootContainer>
  );
};
