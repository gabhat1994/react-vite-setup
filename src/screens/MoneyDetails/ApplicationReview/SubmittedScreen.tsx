import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import Layout from '@/layout/ApplicationReviewLayoutV2';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import {
  Container,
  UploadContainer,
  WrapperIcon,
  ReturnToNoumenaWrapper,
} from './styles';

type SubmittedScreenProps = {
  onButtonClick: () => void;
};

export const SubmittedScreen = ({ onButtonClick }: SubmittedScreenProps) => (
  <Layout>
    <Container>
      <Spacer height={16} />
      <TSpan
        font="heading-s-bold"
        textAlign="center"
        colorToken="--text-card-header-neutral-highlighted"
      >
        {t('noumena.application_review_completed_heading')}
      </TSpan>
      <Spacer height={64} />
      <UploadContainer>
        <WrapperIcon>
          <Icon name="success_cq_xxxl" size={96} />
        </WrapperIcon>
        <Spacer height={64} />
        <TSpan
          font="body-l"
          colorToken="--text-body-neutral-default"
          textAlign="center"
        >
          {t('noumena.application_review_succes_message')}
        </TSpan>
        <ReturnToNoumenaWrapper>
          <Button primary size="full" onClick={onButtonClick}>
            {t('noumena.application_review_completed_btn')}
          </Button>
        </ReturnToNoumenaWrapper>
      </UploadContainer>
    </Container>
  </Layout>
);
