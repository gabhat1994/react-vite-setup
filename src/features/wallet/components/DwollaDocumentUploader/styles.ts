import { Icon } from '@/components/Icon';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled, { css } from 'styled-components';

export const DisplayFileContainer = styled.div<{
  isSingleFileDownload: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 362px;
  width: 458px;
  border-radius: 8px;
  background-color: var(--bg-dragdrop-neutral-default);
  border: 1px solid var(--border-dragdrop-neutral-default);
  border-style: none;

  ${({ isSingleFileDownload }) =>
    isSingleFileDownload &&
    css`
      width: 100%;
      height: 470px;

      @media (max-width: ${sizes.TABLET_L}) {
        width: 100%;
        height: 100%;
      }
    `}
  ${({ isSingleFileDownload }) =>
    !isSingleFileDownload &&
    css`
      @media (max-width: ${sizes.TABLET_L}) {
        width: 100%;
        height: 362px;
      }
    `}



  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    height: 287px;
  }
`;

export const FileDetails = styled(Stack)`
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  padding: 12px;
  border-bottom: 1px solid var(--border-dragdrop-neutral-default);
`;

export const ClearFile = styled(Icon)`
  cursor: pointer;
`;

export const DocumentContainer = styled.div<{ isSingleFileDownload: boolean }>`
  width: 100%;
  height: 297px;
  box-sizing: border-box;

  ${({ isSingleFileDownload }) =>
    isSingleFileDownload &&
    css`
      height: 80%;
    `}

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    height: 221px;
  }
`;
export const Image = styled.img<{ isSingleFileDownload: boolean }>`
  width: 100%;
  height: 297px;

  ${({ isSingleFileDownload }) =>
    isSingleFileDownload &&
    css`
      height: 100%;
    `}

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    height: 221px;
  }
`;

export const UploadInputContainer = styled.div<{
  isDraggingOver: boolean;
  isSingleSideUpload: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 362px;
  width: 458px;
  cursor: pointer;
  border-radius: 8px;

  ${({ isSingleSideUpload }) =>
    isSingleSideUpload &&
    css`
      height: 470px;
      width: 100%; ;
    `}

  ${({ isDraggingOver }) =>
    isDraggingOver &&
    css`
      background-color: var(--bg-dragdrop-brand-secondary-focused);
      border: 2px solid var(--border-dragdrop-brand-primary-focused);
      border-style: dashed;
    `}
  ${({ isDraggingOver }) =>
    !isDraggingOver &&
    css`
      background-color: var(--bg-dragdrop-neutral-default);
      border: 1px solid var(--border-dragdrop-neutral-default);
      border-style: none;
    `}

${({ isSingleSideUpload }) =>
    !isSingleSideUpload &&
    css`
      @media (max-width: ${sizes.TABLET_L}) {
        width: 100%;
        height: 362px;
      }
    `}

${({ isSingleSideUpload }) =>
    isSingleSideUpload &&
    css`
      @media (max-width: ${sizes.TABLET_L}) {
        width: 100%;
        height: 80vh;
      }
    `}




  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    height: 287px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const IConTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IDPickerContainer = styled(Stack).attrs({
  gap: '16px',
  align: 'center',
})`
  width: 438px;
  padding: 16px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    height: 127px;
  }
`;
export const IDPickerLeft = styled(Stack).attrs({})`
  box-sizing: border-box;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 279px;
    height: 95px;
  }
`;

export const IDPickerIcon = styled.span<{ isSuccess: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  ${({ isSuccess }) =>
    isSuccess &&
    css`
      background-color: var(--bg-iconbox-success-secondary-default);
    `}
  ${({ isSuccess }) =>
    !isSuccess &&
    css`
      background-color: var(--bg-iconbox-brand-secondary-default);
    `}
`;

export const IDPickerContent = styled(Stack).attrs({
  vertical: true,
})`
  width: 290px;
  box-sizing: border-box;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const Chevrolet = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;

export const Index = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 24px;
  height: 24px;
  background-color: var(--bg-badge-brand-secondary-default);
  border-radius: 12px;
`;
