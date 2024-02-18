// @ts-ignore This package has no type declaration file but we inevitably use this.
import { useScrapper } from 'react-tiny-link';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';

interface LinkPreviewPayload {
  title: string;
  host: string;
  image: string;
  loading: boolean;
}

function useLinkPreview(url: string): LinkPreviewPayload {
  const [result, loading] = useScrapper({ url });
  const { host, pathname } = new URL(url);
  return {
    title: result
      ? result.title
      : pathname.substring(pathname.lastIndexOf('/') + 1),
    host: host.replace('www.', ''),
    image: result?.image?.[0] || ChamberDefaultImage,
    loading,
  };
}

export default useLinkPreview;
