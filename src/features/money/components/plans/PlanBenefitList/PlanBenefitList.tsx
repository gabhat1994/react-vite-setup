import {
  BenefitsWrapperStack,
  AvailableBenefit,
  UnAvailableBenefit,
} from './styles';
import * as S from '../planCommonStyles';

type PlanBenefitListProps = {
  listOfBenefits: { label: string; isIncluded: boolean }[];
  benefitsExpired?: boolean;
};

export function PlanBenefitList({
  listOfBenefits,
  benefitsExpired = false,
}: PlanBenefitListProps) {
  return (
    <BenefitsWrapperStack>
      {listOfBenefits?.map((benefits) => (
        <S.BenefitStack>
          {benefits.isIncluded ? (
            <S.ConfirmedIcon
              // TODO: Icon specific color token is missing in figma. Asked UX, update here once received
              color={benefitsExpired ? '--color-base-gray-60' : undefined}
            />
          ) : (
            <S.CloseIcon />
          )}
          {benefits.isIncluded ? (
            <AvailableBenefit>{benefits.label}</AvailableBenefit>
          ) : (
            <UnAvailableBenefit>{benefits.label}</UnAvailableBenefit>
          )}
        </S.BenefitStack>
      ))}
    </BenefitsWrapperStack>
  );
}
