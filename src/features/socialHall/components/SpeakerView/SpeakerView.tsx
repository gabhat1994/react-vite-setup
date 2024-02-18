import { useMemo } from 'react';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { useSocialHallCallContext } from '@/providers';
import { useSpeakerView } from '@/features/socialHall/hooks';
import { SpeakerViewCarousel } from '../SpeakerViewCarousel';
import { MediaPreview } from '../MediaPreview';
import {
  PinedFrameWarpper,
  SpeakerWarpper,
  SpeakerWarpperChlid,
} from './styles';
import { type SpeakerViewProps } from './types';

export const SpeakerView = (props: SpeakerViewProps) => {
  const {
    speakerFeed,
    isMinimalView,
    clientHeight,
    clientWidth,
    showChatPanel,
    showMembersPanel,
    isFullScreen,
    userFeeds,
  } = props;
  const { width } = useWindowDimensions();
  const isTablet = useMemo(
    () => width < breakpoints.LAPTOP_L && width > breakpoints.MOBILE_MAX,
    [width],
  );
  const isMobile = useMemo(() => width < breakpoints.MOBILE_MAX, [width]);
  const { isShareScreen, isRemoteScreenSharing } = useSocialHallCallContext();

  const isScreenSharing = useMemo(
    () => isShareScreen || isRemoteScreenSharing,
    [isShareScreen, isRemoteScreenSharing],
  );

  const { elemRef, maxHeight, dimension } = useSpeakerView({
    clientHeight,
    clientWidth,
    showChatPanel,
    showMembersPanel,
  });

  const isSingleAttendee = useMemo(
    () => userFeeds && userFeeds?.length === 1,
    [userFeeds],
  );

  const maxMinWidth = useMemo(
    () => (isSingleAttendee ? dimension.width : dimension.width - 115),
    [dimension.width, isSingleAttendee],
  );

  const maxMinHeight = useMemo(
    () => (isSingleAttendee ? dimension.height : dimension.height - 115),
    [dimension.height, isSingleAttendee],
  );

  return (
    <SpeakerWarpper isFullScreen={isFullScreen}>
      {speakerFeed?._id && !isScreenSharing && (
        <SpeakerWarpperChlid
          ref={elemRef}
          style={{
            maxHeight,
            minWidth: clientWidth - 368,
          }}
        >
          <PinedFrameWarpper
            style={{
              maxWidth: maxMinWidth,
              maxHeight: maxMinHeight,
              minWidth: maxMinWidth,
              minHeight: maxMinHeight,
            }}
          >
            {speakerFeed?._id && (
              <MediaPreview
                key={speakerFeed?._id}
                isFullScreen={!!isFullScreen}
                isMinimalView={isMinimalView!}
                speakerCarouselPortal={false}
                {...speakerFeed}
              />
            )}
          </PinedFrameWarpper>
        </SpeakerWarpperChlid>
      )}
      {(!isSingleAttendee || isScreenSharing) && (
        <SpeakerViewCarousel
          {...props}
          maxVideoPerPage={isMobile ? 1 : isTablet ? 3 : 5}
        />
      )}
    </SpeakerWarpper>
  );
};
export default SpeakerView;
