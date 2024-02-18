import { useState } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';
import { useUpdateUserMediaTestingForShMutation } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { type MediaContentProps } from './types';
import {
  ButtonContainer,
  MediaMessageWrapper,
  SkipHardwareTestingWrapper,
} from './styles';

export const MediaContent = ({
  onCompleted,
  onLeave,
  showLoader,
}: MediaContentProps) => {
  const { refetchUserData } = useAuth();
  const [skipHardwareTesting, setSkipHardwareTesting] = useState(false);
  const [updateUserMediaTestingForSh] =
    useUpdateUserMediaTestingForShMutation();

  const onCompleteHandler = async () => {
    if (skipHardwareTesting) {
      await updateUserMediaTestingForSh({
        variables: { accept: skipHardwareTesting },
      });
      refetchUserData();
    }
    onCompleted();
  };

  return (
    <MediaMessageWrapper>
      <TSpan
        colorToken="--text-modal-header-neutral-default"
        font="heading-s-bold"
      >
        {t('noumena.social_hall.hardware_testing_heading')}
      </TSpan>
      <Spacer height={8} />
      <TSpan colorToken="--text-modal-neutral-default" font="body-l">
        {t('noumena.social_hall.hardware_testing_title')}
      </TSpan>
      <Spacer height={24} />
      <ButtonContainer>
        <Button
          tertiary
          intent="negative"
          size="full"
          loading={showLoader}
          onClick={() => onLeave()}
          data-testid="leave-event-button"
        >
          {t('noumena.social_hall.hardware_testing_cancel_btn')}
        </Button>
        <Spacer width={16} />
        <Button
          primary
          size="full"
          loading={showLoader}
          onClick={onCompleteHandler}
          data-testid="join-event-button"
        >
          {t('noumena.social_hall.hardware_testing_success_btn')}
        </Button>
      </ButtonContainer>
      <Spacer height={32} />
      <SkipHardwareTestingWrapper>
        <Checkbox
          onChange={() => setSkipHardwareTesting(!skipHardwareTesting)}
          isChecked={skipHardwareTesting}
          icon={
            <Icon
              name="tick_m"
              size={skipHardwareTesting ? 24 : 0}
              color="--icon-checkbox-neutral-alt-default"
            />
          }
        />
        <Spacer width={8} />
        <TSpan colorToken="--text-tablecell-header-neutral-default">
          {t('noumena.social_hall.hardware_testing_skip_future_test')}
        </TSpan>
      </SkipHardwareTestingWrapper>
    </MediaMessageWrapper>
  );
};
