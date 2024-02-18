import { useState } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout/Stack';
import useEvent from '@/hooks/useEvent';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { type ScheduleACall, type Section01 } from '../types';
import {
  StyledHomeStorySection,
  StyledVideoSection,
  StyledContentSection,
  StyledDescription,
  StyledTime,
} from './styles';
import { VideoPlayerModal } from '../VideoPlayerModal/Modal';
import { TellUsYourStoryModal } from '../TellUsYourStoryModal/Modal';

type StorySectionProps = {
  sectionData: Section01 | undefined;
  calendlyData: ScheduleACall | undefined;
};

export default function StorySection(props: StorySectionProps) {
  const { addToast } = useToast();
  const { isActive } = useAuth();
  const [showTellUsYourStoryModal, setShowTellUsYourStoryModal] =
    useState<boolean>(false);
  const [showPlayVideoModal, setShowPlayVideoModal] = useState<boolean>(false);
  const { sectionData, calendlyData } = props;

  const title = sectionData?.Title;
  const assetTitle = sectionData?.Asset_Title;
  const description = sectionData?.Description;
  const thumbnailUrl = sectionData?.Thumbnail?.filename;
  const buttonLabel = sectionData?.Button_Label;
  const videoURL = sectionData?.Asset?.filename || '';
  const videoDuration = sectionData?.Video_Duration || '00:00';

  const handleOpenTellUsYourStoryModal = useEvent(() => {
    if (isActive) setShowTellUsYourStoryModal(true);
    else
      addToast(
        'error',
        'none',
        `${t('noumena.money.setup_wallet.not.authorized')}`,
      );
  });
  const handleCloseTellUsYourStoryModal = useEvent(() => {
    setShowTellUsYourStoryModal(false);
  });

  const handleOpenPlayVideoModal = useEvent(() => {
    setShowPlayVideoModal(true);
  });
  const handleClosePlayVideoModal = useEvent(() => {
    setShowPlayVideoModal(false);
  });

  return (
    <StyledHomeStorySection data-testid="home-story-section-testid">
      <StyledVideoSection
        thumbnailUrl={thumbnailUrl}
        onClick={handleOpenPlayVideoModal}
      >
        <Button
          size="small"
          primary
          icon={
            <Icon
              name="play_xs"
              size={16}
              color="--icon-button-neutral-alt-default"
            />
          }
        />
        <Spacer height={16} />
        <TSpan font="body-l-bold" colorToken="--text-card-neutral-alt-default">
          {assetTitle}
        </TSpan>
        <StyledTime>{videoDuration}</StyledTime>
      </StyledVideoSection>
      <StyledContentSection>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {title}
        </TSpan>
        <StyledDescription
          font="body-m"
          colorToken="--text-card-neutral-default"
        >
          {description}
        </StyledDescription>
        <Button size="small" secondary onClick={handleOpenTellUsYourStoryModal}>
          {buttonLabel}
        </Button>
      </StyledContentSection>
      <TellUsYourStoryModal
        open={showTellUsYourStoryModal}
        onClose={handleCloseTellUsYourStoryModal}
        calendlyData={calendlyData}
      />
      <VideoPlayerModal
        open={showPlayVideoModal}
        onClose={handleClosePlayVideoModal}
        videoURL={videoURL}
      />
    </StyledHomeStorySection>
  );
}
