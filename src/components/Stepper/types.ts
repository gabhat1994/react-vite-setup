interface CommonStepperProps {
  /** The number of current step */
  currentStep: number;
  /** The number of completed steps */
  completed: number;
}

interface CommonStepProps {
  pointNum: number;
  isPassed: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onClick: (step: number) => void;
}

export type StepperProps = CommonStepperProps;

export type StepProps = CommonStepProps;
