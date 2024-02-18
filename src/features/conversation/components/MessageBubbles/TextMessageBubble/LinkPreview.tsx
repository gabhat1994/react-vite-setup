import Skeleton from 'react-loading-skeleton';
import useLinkPreview from '@/features/conversation/hooks/globalMessages/useLinkPreview';
import {
  LinkPreviewNote,
  LinkPreviewTextWrapper,
  LinkPreviewTitle,
  LinkPreviewWrapper,
  StyledImage,
} from '../styles';

const LinkPreview = ({ url, isSent }: { url: string; isSent?: boolean }) => {
  const { loading, image, title, host } = useLinkPreview(url);
  return (
    <LinkPreviewWrapper isSent={!!isSent}>
      {loading ? (
        <Skeleton height={120} />
      ) : (
        <StyledImage src={image} style={{ maxHeight: 120 }} />
      )}
      {loading ? (
        <Skeleton height={91} />
      ) : (
        <LinkPreviewTextWrapper>
          <LinkPreviewTitle>{title}</LinkPreviewTitle>
          <LinkPreviewNote>{host}</LinkPreviewNote>
        </LinkPreviewTextWrapper>
      )}
    </LinkPreviewWrapper>
  );
};
export default LinkPreview;
