/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { type BasicPlanFragment } from '@/apollo/graphql/fragments/basicPlan.generated';

type ChargebeeAnchorsProps = {
  plans: BasicPlanFragment[];
};

export function ChargebeeAnchors({ plans }: ChargebeeAnchorsProps) {
  return (
    <>
      {plans.map((setting) =>
        setting.plans.map((plan) => (
          <a
            key={plan.plan_name_id}
            id={plan.plan_name_id!}
            data-cb-type="checkout"
            data-cb-item-0={plan.plan_name_id}
            data-cb-item-0-quantity="1"
            className="chargebee-links"
            href="javascript:void0"
          />
        )),
      )}
    </>
  );
}
