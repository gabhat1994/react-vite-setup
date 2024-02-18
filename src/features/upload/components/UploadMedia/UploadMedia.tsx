import React, { type MouseEventHandler } from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { type CSSProperties } from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Upload } from '../Upload';
import { UploadContainer, UploadDescription, DragDropText } from './style';
import { type UploadMediaType } from '../../types';

export type UploadMediaProps = {
  acceptedFileTypes?: string;
  maxSize?: number;
  isHidden?: boolean;
  style?: CSSProperties;
  marginTop?: number;
  keepOriginalName?: boolean;
  error?: boolean;
  allTypesSupported?: boolean;
  type: UploadMediaType;
  setMediaDetail: (e: File) => void;
  onUploading: (uploading: boolean) => void;
  onContentChange?: (next: string) => void;
  onError?(hasError: boolean): void;
};

const UploadMedia: React.FC<UploadMediaProps> = (props) => (
  <Upload<HTMLDivElement>
    acceptedFileTypes={props.acceptedFileTypes}
    maxSize={props.maxSize || 500}
    onContentChange={props.onContentChange}
    onUploadFile={props.setMediaDetail}
    keepOriginalName={props.keepOriginalName}
    allTypesSupported={props.allTypesSupported}
    type={props.type}
  >
    {({ triggerElRef, isDraggingOver, ...rest }) => {
      props.onUploading(rest.isUploadStarted && !rest.isUploadComplete);
      props.onError?.(rest.error);

      return (
        <UploadContainer
          ref={triggerElRef}
          disabled={rest.isUploadStarted && !rest.isUploadComplete}
          data-testid="multi_media_upload"
          isDraggingOver={isDraggingOver}
          style={props.style}
          isHidden={props.isHidden}
          marginTop={props.marginTop}
          error={props.error}
        >
          <DragDropText>
            <Trans
              i18nKey="noumena.image_element.edit_pre_upload.text"
              components={{
                link1: (
                  <TSpan
                    data-testid="multi_media_upload_btn"
                    colorToken="--text-dragdrop-brand-primary-default"
                    font="body-l-bold"
                    onClick={
                      rest.onClickHandler as MouseEventHandler<HTMLButtonElement>
                    }
                  />
                ),
              }}
            />
          </DragDropText>
          <UploadDescription font="footnote" error={props.error}>
            {t('noumena.drag_drop_media_type_size.text', {
              maxSize: props.maxSize,
            })}
          </UploadDescription>
        </UploadContainer>
      );
    }}
  </Upload>
);

export default UploadMedia;
