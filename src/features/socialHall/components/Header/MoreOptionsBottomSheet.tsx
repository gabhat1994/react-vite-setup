import React from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useSocialHallEventContext } from '@/providers';
import { type MoreOptionsBottomSheetProps } from './types';
import { SocialHallBottomSheetBody } from './styles';

const MoreOptionsBottomSheet: React.FC<MoreOptionsBottomSheetProps> = ({
  isOpen,
  onClose,
  onSettingsClick,
  onChangeRoomNameClick,
}) => {
  const { isMainEvent } = useSocialHallEventContext();
  const { t } = useTranslation();

  return (
    <BottomSheet
      enableCloseButton
      open={isOpen}
      onClose={onClose}
      position="fixed"
    >
      <SocialHallBottomSheetBody>
        {!isMainEvent && (
          <Button
            icon={
              <Icon
                color="--text-button-neutral-default"
                name="edit_s"
                size={24}
              />
            }
            size="full"
            onClick={onChangeRoomNameClick}
          >
            {t('noumena.social_hall.change_group_name')}
          </Button>
        )}
        <Button
          icon={
            <Icon
              color="--text-button-neutral-default"
              name="settings_m"
              size={24}
            />
          }
          size="full"
          onClick={onSettingsClick}
        >
          {t('noumena.social_hall.settings')}
        </Button>
      </SocialHallBottomSheetBody>
    </BottomSheet>
  );
};

export default MoreOptionsBottomSheet;
