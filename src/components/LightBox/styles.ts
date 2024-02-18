import styled, { css } from 'styled-components';
import { sizes } from '@/constants/devices';
import { ellipsisText } from '@/common/globalStyles';
import { TSpan } from '../Typography';

const BaseContent = css`
  width: auto;
  display: flex;
  max-width: 90vw;
  position: relative;
`;

export const Content = styled.div`
  ${BaseContent};
  max-height: 90vh;
`;

export const DocContent = styled.div`
  ${BaseContent}
  .react-pdf__Page__canvas {
    max-height: calc(100vh - 200px);
    width: auto !important;
    @media (max-width: ${sizes.MOBILE_MAX}) {
      width: calc(100vw - 40px) !important;
    }
  }
`;

export const DocFileName = styled(TSpan)`
  max-width: 100%;
  ${ellipsisText};
`;

export const NoPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 279px;
  text-align: center;
  padding: 0 14px 0 14px;
`;

export const Image = styled.img`
  max-height: 90vh;
  max-width: 90vw;
`;

export const Video = styled.video.attrs({ controls: true })`
  max-height: 90vh;
  max-width: 90vw;
`;

export const ModalHeaderAddOnContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 32px;
  margin-left: 40px;
  cursor: pointer;
  z-index: 3000;
  display: flex;
  gap: 10px;
`;

export const DocModalHeaderAddOnContainer = styled.div`
  position: absolute;
  top: 0;
  right: 40px;
  margin-top: 32px;
  margin-right: 50px;
  cursor: pointer;
  z-index: 3000;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    margin-right: 25px;
  }
`;

export const DocFooterWrapper = styled.div`
  position: absolute;
  z-index: 3000;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;
`;
