import { Stack } from '@/layout';
import { useGeniusImageResponse } from '../../hooks/useGeniusImageResponse';
import { ImageResponseItem } from './ImageResponseItem';

export function ImageResponseRenderer() {
  const { images } = useGeniusImageResponse();

  return (
    <Stack fullWidth gap={16}>
      {images.map((image, index) => (
        <ImageResponseItem index={index} key={image} src={image} />
      ))}
    </Stack>
  );
}
