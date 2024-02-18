import { type MouseEventHandler } from 'react';
import { mediaTypes } from '@/constants/fileTypes';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Upload } from '../Upload';
import { type MultiMediaPickerProps } from './types';

const MultiMediaPicker = (props: MultiMediaPickerProps) => (
  <Upload<HTMLDivElement>
    clipboard={props.clipboard}
    acceptedFileTypes={props.acceptedFileTypes || mediaTypes}
    onContentChange={props.onContentChange}
    onUploadFile={props.onUploadFile}
    maxSize={props.maxSize}
    generateThumbnail={true}
    type={props.type}
  >
    {({ triggerElRef, ...rest }) => {
      props.onUploading(rest.isUploadStarted && !rest.isUploadComplete);
      return (
        <div ref={triggerElRef} data-testid="multi_media_picker">
          <Button
            data-testid="multi_media_picker_btn"
            loading={rest.isUploadStarted && !rest.isUploadComplete}
            disabled={props.disabled}
            tertiary
            onClick={
              rest.onClickHandler as MouseEventHandler<HTMLButtonElement>
            }
            icon={
              rest.isUploadStarted && !rest.isUploadComplete ? undefined : (
                <Icon
                  size={24}
                  name="picture_m"
                  color="--icon-button-neutral-default"
                />
              )
            }
          />
        </div>
      );
    }}
  </Upload>
);

export default MultiMediaPicker;
