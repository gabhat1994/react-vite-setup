import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import VideoView from '@/screens/Chamber/components/elements/VideoElement/VideoView';
import { getFileExtension, getVideoMimeType } from '@/utils/file';
import {
  ReferenceImageContainer,
  RefereneceImageHeader,
  RefereneceImageDetailHeader,
  ReferenceImageCloseButton,
  ReferenceImage,
} from './styles';

const ReferenceMedia: React.FC<{
  mediaName?: string;
  mediaSize?: number;
  mediaType?: string;
  mediaSrc: string;
  clearMedia?: () => void;
}> = ({ clearMedia, mediaName, mediaSize, mediaType, mediaSrc }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= breakpoints.MOBILE_MAX;
  return (
    <ReferenceImageContainer>
      {mediaName && (
        <RefereneceImageHeader>
          <RefereneceImageDetailHeader>
            <TSpan
              font="body-m"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {mediaName}
            </TSpan>
            {!!mediaSize && (
              <TSpan
                font="systemInfo-s"
                colorToken="--text-card-neutral-default"
              >
                {`${mediaSize}mb`}
              </TSpan>
            )}
          </RefereneceImageDetailHeader>
          {clearMedia && (
            <ReferenceImageCloseButton
              onClick={clearMedia}
              size="small"
              textOnly
              icon={
                <Icon
                  name="close_m"
                  size={24}
                  color="--icon-card-neutral-default"
                />
              }
            />
          )}
        </RefereneceImageHeader>
      )}
      {mediaType === 'image' ? (
        <ReferenceImage src={mediaSrc} />
      ) : mediaType === 'video' ? (
        <VideoView
          url={mediaSrc}
          fileType={getVideoMimeType(getFileExtension(mediaSrc))}
          height={isMobile ? 222 : 413}
        />
      ) : null}
    </ReferenceImageContainer>
  );
};

export default ReferenceMedia;
