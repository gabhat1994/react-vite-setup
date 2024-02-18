import { Plan_Setting_Action_Type } from '@/apollo/generated/types';

export const shouldHightLightBackground = (position: number) =>
  position % 2 === 0;

export const isFeatureIncluded = (action: Plan_Setting_Action_Type[]) =>
  action.includes(Plan_Setting_Action_Type.View);
