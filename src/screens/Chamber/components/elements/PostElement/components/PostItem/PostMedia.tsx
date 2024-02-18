import { PostCategory } from '@/apollo/generated/types';
import LightBox from '@/components/LightBox';
import { ViewType } from '@/components/LightBox/types';
import VideoPlayer from '@/components/VideoPlayer';
import { getFileExtension, getVideoMimeType } from '@/utils/file';
import { useMemo, useState } from 'react';
import generate from 'uniqid';
import { Image, ItemImageWrap } from './styles';
import { type PostItemProps } from './types';

const PostMedia = ({ data }: PostItemProps) => {
  const [lightBoxUrl, setLightBoxUrl] = useState<string | null>();

  const images = useMemo(() => {
    if (
      typeof data.post?.content === 'string' ||
      typeof data.post?.content === 'object'
    ) {
      return [{ ...data.post, key: generate() }];
    }
    return [];
  }, [data]);

  return (
    <>
      {images.map((img) =>
        img.content ? (
          <ItemImageWrap key={img.key}>
            {img.category === PostCategory.Image && (
              <Image
                src={img.content || ''}
                alt="post"
                data-testid="postImage"
                onClick={() => {
                  setLightBoxUrl(img.content ?? '');
                }}
              />
            )}
            {img.category === PostCategory.Video && (
              <VideoPlayer
                url={img.content}
                fileType={getVideoMimeType(
                  getFileExtension(img?.content ?? ''),
                )}
                controls
              />
            )}
          </ItemImageWrap>
        ) : null,
      )}
      <LightBox
        url={lightBoxUrl ?? ''}
        type={ViewType.IMAGE}
        isOpen={!!lightBoxUrl}
        handleClose={() => {
          setLightBoxUrl(null);
        }}
      />
    </>
  );
};

export default PostMedia;
