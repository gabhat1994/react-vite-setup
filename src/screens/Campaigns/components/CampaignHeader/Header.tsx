import { useNavigate } from 'react-router';

import Icon from '@/components/Icon/Icon';
import { TSpan } from '@/components/Typography';
import { Stepper } from '@/components/Stepper';
import { Spacer } from '@/layout';

import { type HeaderProps } from './types';
import S from './styles';

export function Header({
  isMobile,
  isTablet,
  heading,
  currentStep,
  totalSteps,
  stepper = true,
  label,
  onBack,
  unsetMinWidth = false,
  wrap = false,
  rightAction = <Spacer width={300} />,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <S.HeaderContainer wrap={wrap}>
      <S.Left unsetMinWidth={unsetMinWidth}>
        <S.BackButton
          onClick={handleBack}
          neutral
          size="small"
          leftIcon={<Icon name="arrow_left_m" size={22} />}
        />
        <TSpan
          font={isMobile || isTablet ? 'body-l-bold' : 'heading-xs-bold'}
          colorToken="--text-body-header-neutral-default"
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          {heading}
          {label && label}
        </TSpan>
      </S.Left>
      {!isMobile && stepper ? (
        <S.StepperContainer>
          <S.Steps>
            <Stepper currentStep={currentStep} completed={totalSteps} />
          </S.Steps>
          <S.StepName>
            <TSpan font="footnote-bold">New Campaign</TSpan>
            <TSpan font="footnote-bold">Offering</TSpan>
            <TSpan font="footnote-bold">Start Campaign</TSpan>
          </S.StepName>
        </S.StepperContainer>
      ) : (
        <S.StepperContainer />
      )}
      {rightAction && (
        <S.ActionContainer updateMargin={wrap}>{rightAction}</S.ActionContainer>
      )}
    </S.HeaderContainer>
  );
}
