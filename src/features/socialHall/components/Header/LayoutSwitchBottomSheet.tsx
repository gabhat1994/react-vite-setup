import React from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { SocialHallBottomSheetBody } from './styles';
import { type LayoutSwitchBottomSheetProps } from './types';

const LayoutSwitchBottomSheet: React.FC<LayoutSwitchBottomSheetProps> = ({
  isOpen,
  onClose,
  onLayoutChange,
}) => {
  const { t } = useTranslation();

  const onLayoutChangeClick = (isGrid: boolean) => {
    onLayoutChange(isGrid);
    onClose();
  };

  return (
    <BottomSheet
      enableCloseButton
      open={isOpen}
      onClose={onClose}
      position="fixed"
    >
      <SocialHallBottomSheetBody>
        <Button
          icon={
            <Icon
              color="--icon-tab-basic-neutral-default"
              name="video_grid_gallery_m"
              size={16}
            />
          }
          size="full"
          onClick={() => onLayoutChangeClick(true)}
        >
          {t('noumena.social_hall.gallery_view')}
        </Button>
        <Button
          icon={
            <Icon
              color="--icon-tab-basic-neutral-default"
              name="video_grid_speaker_m"
              size={16}
            />
          }
          size="full"
          onClick={() => onLayoutChangeClick(false)}
        >
          {t('noumena.social_hall.speaker_view')}
        </Button>
      </SocialHallBottomSheetBody>
    </BottomSheet>
  );
};
export default LayoutSwitchBottomSheet;
