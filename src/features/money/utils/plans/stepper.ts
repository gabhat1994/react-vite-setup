import { STEPPER_SUBTRACTION_FACTOR } from '../../components/plans/PlanPurchaseModal/constants';

export function getPlanStepperArray(planArraylength: number) {
  return planArraylength === 0
    ? []
    : Array.from(
        { length: planArraylength - STEPPER_SUBTRACTION_FACTOR },
        (_value, index) => index + 1,
      );
}
