/* eslint-disable no-console */
import { type MouseEventHandler, type MouseEvent, useMemo } from 'react';
import { TSpan } from '@/components/Typography';
import { TextWrapper, UploadInputContainer, IConTextWrapper } from './styles';

interface InputProps {
  defaultPlaceHolder: string;
  defaultSubPlaceHolder: string;
  linkPlaceHolder?: string;
  onDragOverText?: string;
  isUploadStarted?: boolean;
  isUploadComplete?: boolean;
  isDraggingOver: boolean;
  isMobile: boolean;
  isTablet?: boolean;
  isSingleSideUpload: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}
export const Input = ({
  isUploadComplete,
  isUploadStarted,
  onClick,
  defaultPlaceHolder,
  defaultSubPlaceHolder,
  isDraggingOver,
  linkPlaceHolder,
  onDragOverText,
  isMobile,
  isTablet,
  isSingleSideUpload,
}: InputProps) => {
  const isUploading = useMemo(
    () => (isUploadStarted && !isUploadComplete) || false,
    [isUploadComplete, isUploadStarted],
  );

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    onClick?.(event);
  };

  return (
    <UploadInputContainer
      onClick={handleClick}
      isDraggingOver={isDraggingOver}
      isSingleSideUpload={isSingleSideUpload}
    >
      <IConTextWrapper>
        <>
          {!isUploading && !isUploadComplete && (
            <TextWrapper>
              <TSpan
                font="body-l-bold"
                colorToken={
                  isDraggingOver || isTablet || isMobile
                    ? '--text-dragdrop-brand-primary-default'
                    : '--text-dragdrop-header-neutral-default'
                }
              >
                {isDraggingOver ? onDragOverText : defaultPlaceHolder}
                {linkPlaceHolder && !isDraggingOver && (
                  <TSpan colorToken="--text-dragdrop-brand-primary-default">
                    {' '}
                    {linkPlaceHolder}
                  </TSpan>
                )}
                .
              </TSpan>
              <TSpan font="footnote" colorToken="--text-card-neutral-default">
                {defaultSubPlaceHolder}
              </TSpan>
            </TextWrapper>
          )}
        </>
      </IConTextWrapper>
    </UploadInputContainer>
  );
};
