import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { QuickSignUpScreenLayout } from '../QuickSignUp/QuickSignUpScreenLayout';
import { Wrapper, WrapperChildren, WrapperIcon } from './styles';

const QuickSignUp = () => {
  const { quickSignUpNoumId } = useInitialSignUp();

  const navigate = useNavigate();

  const onContinue = () => {
    if (quickSignUpNoumId) {
      navigate(`/noum/${quickSignUpNoumId}`, { replace: true });
    } else {
      navigate(ROUTES.GUEST_HOME, { replace: true });
    }
  };

  return (
    <QuickSignUpScreenLayout showBackButton={false}>
      <Wrapper>
        <WrapperChildren>
          <WrapperIcon>
            <Icon
              name="success_cq_xxxl"
              color="--icon-card-brand-primary-default"
              size={96}
            />
          </WrapperIcon>
          <TSpan
            font="heading-m-bold"
            colorToken="--text-modal-header-neutral-default"
            textAlign="center"
          >
            Thanks for signing up
          </TSpan>
          <TSpan
            font="body-l"
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            {`Nice work! Let's get started`}
          </TSpan>
        </WrapperChildren>
        <Button primary size="full" onClick={onContinue}>
          Start Using Noumena
        </Button>
      </Wrapper>
    </QuickSignUpScreenLayout>
  );
};
export default QuickSignUp;
