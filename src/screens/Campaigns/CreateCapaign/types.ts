type Props = {
  isMobile: boolean;
  isTablet: boolean;
  currentStep: number;
  totalSteps: number;
};

export type CampaignFormProps = { onStepChange: (id: string) => void } & Props;
export type CampaignSubmittedProps = { onSeeDetails: () => void } & Props;
