import { useCallback } from 'react';
import { Icon } from '@/components/Icon';
import { useWindowDimensions } from '@/hooks';
import { useSocialHallContext } from '@/providers';
import { breakpoints } from '@/constants/devices';
import { Button } from '@/components/Button';
import { RightWrapper } from './styles';
import { type LayoutToggleProps } from './types';

const LayoutToggle: React.FC<LayoutToggleProps> = ({ isScreenSharing }) => {
  const { width } = useWindowDimensions();
  const { showBuzzRoom, onSwitchLayout, isGridLayout } = useSocialHallContext();
  const isMobile = width < breakpoints.TABLET;

  const onSwitchLayoutHandler = useCallback(
    (isGrid: boolean) => {
      if (!isMobile) {
        onSwitchLayout(isGrid);
      }
      // @to-do in-case of mobile we need to open a modal from which user will select
    },
    [isMobile, onSwitchLayout],
  );

  return (
    <RightWrapper isBuzzRoom={showBuzzRoom}>
      <Button
        onClick={() => onSwitchLayoutHandler(true)}
        size="small"
        disabled={isScreenSharing}
        icon={
          <Icon
            color={
              !isScreenSharing && isGridLayout
                ? '--icon-tab-basic-brand-primary-default'
                : '--icon-tab-basic-neutral-default'
            }
            name="video_grid_gallery_m"
            size={16}
          />
        }
      />

      {!isMobile && (
        <Button
          onClick={() => onSwitchLayoutHandler(false)}
          size="small"
          disabled={isScreenSharing}
          icon={
            <Icon
              color={
                !isScreenSharing && !isGridLayout
                  ? '--icon-tab-basic-brand-primary-default'
                  : '--icon-tab-basic-neutral-default'
              }
              name="video_grid_speaker_m"
              size={16}
            />
          }
        />
      )}
    </RightWrapper>
  );
};

export default LayoutToggle;
