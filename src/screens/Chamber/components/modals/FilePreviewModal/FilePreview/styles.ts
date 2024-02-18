import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';

const FilePreviewWrapper = styled.div`
  flex-basis: 70%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--border-file-unknown-default);

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    flex-basis: 100%;
    justify-content: center;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`;

const PreviewVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`;

const PreviewNotAvailableContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PreviewNotAvailableText = styled(TSpan)`
  margin-top: 20px;
  color: var(--text-card-neutral-disabled);
`;

const SpinnerContainer = styled.div`
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export default {
  FilePreviewWrapper,
  Image,
  PreviewVideo,
  PreviewNotAvailableContainer,
  PreviewNotAvailableText,
  SpinnerContainer,
};
