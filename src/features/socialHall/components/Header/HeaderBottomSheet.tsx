import { useCallback, useState } from 'react';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { useSocialHallContext } from '@/providers';
import { Button } from '@/components/Button';
import { IconButton } from './styles';
import MoreOptionsBottomSheet from './MoreOptionsBottomSheet';
import LayoutSwitchBottomSheet from './LayoutSwitchBottomSheet';
import { MediaSettingModal } from '../MediaSettingModal/MediaSettingModal';
import { type HeaderBottomSheetProps } from './types';

const HeaderBottomSheet = ({
  onChangeGroupName,
  isScreenSharing,
}: HeaderBottomSheetProps) => {
  const { width } = useWindowDimensions();
  const { onSwitchLayout, isGridLayout, selectDefaultMediaInput } =
    useSocialHallContext();
  const isMobile = width < breakpoints.TABLET;
  const [showMoreOptionsBottomSheet, setShowMoreOptionsBottomSheet] =
    useState<boolean>(false);
  const [isLayoutSwitchBottomSheetOpen, setIsLayoutSwitchBottomSheetOpen] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const onLayoutSwitchBottomSheetClose = () => {
    setIsLayoutSwitchBottomSheetOpen(false);
  };

  const onLayoutSwitchBottomSheetLayoutChange = (isGrid: boolean) => {
    setIsLayoutSwitchBottomSheetOpen(false);
    onSwitchLayout(isGrid);
  };

  const onToggleMediaSettingPopup = useCallback(() => {
    selectDefaultMediaInput();
    setIsOpen((open) => !open);
    setShowMoreOptionsBottomSheet(false);
  }, [selectDefaultMediaInput]);

  const onToggleChangeRoomNamePopup = useCallback(() => {
    onChangeGroupName?.();
    setShowMoreOptionsBottomSheet(false);
  }, [onChangeGroupName]);

  return isMobile ? (
    <>
      <Button
        onClick={() => setIsLayoutSwitchBottomSheetOpen(true)}
        size="small"
        disabled={isScreenSharing}
        icon={
          <Icon
            color={
              !isScreenSharing
                ? '--icon-tab-basic-brand-primary-default'
                : '--icon-tab-basic-neutral-default'
            }
            name={
              isGridLayout ? 'video_grid_gallery_m' : 'video_grid_speaker_m'
            }
            size={16}
          />
        }
      />
      <IconButton onClick={() => setShowMoreOptionsBottomSheet(true)}>
        <Icon
          color="--icon-tab-basic-brand-neutral-default"
          name="more_m"
          size={24}
        />
      </IconButton>
      <MoreOptionsBottomSheet
        isOpen={showMoreOptionsBottomSheet}
        onClose={() => setShowMoreOptionsBottomSheet(false)}
        onSettingsClick={onToggleMediaSettingPopup}
        onChangeRoomNameClick={onToggleChangeRoomNamePopup}
      />
      <LayoutSwitchBottomSheet
        onClose={onLayoutSwitchBottomSheetClose}
        isOpen={isLayoutSwitchBottomSheetOpen}
        onLayoutChange={onLayoutSwitchBottomSheetLayoutChange}
      />
      <MediaSettingModal
        isOpen={isOpen}
        onAccept={onToggleMediaSettingPopup}
        handleClose={onToggleMediaSettingPopup}
      />
    </>
  ) : null;
};

export default HeaderBottomSheet;
