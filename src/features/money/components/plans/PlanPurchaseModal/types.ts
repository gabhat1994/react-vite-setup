import {
  type PlanSettingNoumOptionsConfigureOutput,
  type Plan_Setting_Action_Type,
} from '@/apollo/generated/types';
import {
  type SubscriptionAfterCreatePlanFragment,
  type SubscriptionFragment,
} from '@/apollo/graphql/fragments/subscription.generated';
import { type IModal } from '@/components/ExtendedModal';
import { type NoumData } from '@/screens/Chamber/components/modals/ProjectCreate/types';
import { type Maybe } from 'graphql/jsutils/Maybe';

export type UserAction = 'try' | 'upgrade' | 'downgrade';

export type ModalType =
  | 'plan-information'
  | 'plan-comparison'
  | 'plan-customization'
  | 'plan-upgrade'
  | 'plan-downgrade'
  | 'noum-selection';

export type PlanPurchaseModalProps = {
  userAction: UserAction;
  existingPlan?: SubscriptionFragment;
  newNoumData?: NoumData;
  chamberIdForUnarchive?: Maybe<string>;
  onSucessFulPurchase?: (
    subscription: SubscriptionAfterCreatePlanFragment,
  ) => void;
} & Pick<IModal, 'open' | 'onClose'>;

export type SwiperButtonProps = {
  onClick: () => void;
  disable: boolean;
  variant: 'previous' | 'next';
};

export enum PlanFrequency {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export type GlobalSettingItem = {
  control: string;
  description: string;
  enabledOnPurchaseScreen: boolean;
  helpImageURL: string;
  id: string;
  label: string;
  params: unknown;
  resource: string;
  resourceType: string;
};

export type GlobalSettingItemWithActionAndValue = {
  action: Maybe<Plan_Setting_Action_Type[]>;
  setting: Maybe<PlanSettingNoumOptionsConfigureOutput[]>;
} & GlobalSettingItem;

export type GlobalSettingObject = {
  financialProducts: GlobalSettingItem[];
  menuItems: GlobalSettingItem[];
  learningProducts: GlobalSettingItem[];

  noumSetting: {
    limits: GlobalSettingItemWithActionAndValue[];
    tools: GlobalSettingItem[];
  };
  homeNoumSetting: {
    limits: GlobalSettingItemWithActionAndValue[];
    tools: GlobalSettingItem[];
  };
};

export type BreakPoints = {
  isMobile: boolean;
  isSmallerThanLaptop: boolean;
};
