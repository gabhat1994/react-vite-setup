import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { LINKS } from '@/constants/links';
import {
  FormText,
  LinkContainer,
  LinksSection,
  SpacerText,
  Terms,
} from './styles';

const TermsAndPrivacy = () => {
  const { t } = useTranslation();
  const goToPrivacy = () => {
    window?.open(LINKS.PRIVACY, '_blank');
  };
  const goToTerms = () => {
    window?.open(LINKS.TERMS, '_blank');
  };
  return (
    <Terms>
      <LinkContainer align="center" justify="center" wrap="wrap">
        <FormText font="footnote" colorToken="--text-body-neutral-default">
          {t('noumena.signup.terms_and_conditions')}
        </FormText>
        <LinksSection>
          <Button
            secondary
            data-testid="terms"
            textOnly
            onClick={goToTerms}
            style={{ borderRadius: 0 }}
          >
            <TSpan
              colorToken="--text-button-brand-secondary-default"
              font="link-s"
            >
              {t('noumena.signup.terms_of_use')}
            </TSpan>
          </Button>
          <Button textOnly size="small">
            <SpacerText>&amp;</SpacerText>
          </Button>
          <Button
            secondary
            data-testid="privacy"
            textOnly
            onClick={goToPrivacy}
            style={{ borderRadius: 0 }}
          >
            <TSpan
              colorToken="--text-button-brand-secondary-default"
              font="link-s"
            >
              {t('noumena.signup.privacy_policy')}
            </TSpan>
          </Button>
        </LinksSection>
      </LinkContainer>
    </Terms>
  );
};

export default TermsAndPrivacy;
