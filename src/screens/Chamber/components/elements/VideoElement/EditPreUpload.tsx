import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getValidFormats } from '@/utils/uploadFile';
import { Spacer } from '@/layout';

import { TSpan } from '@/components/Typography';
import { type EditPreUploadProps } from './types';
import { EditPreUploadContainer } from './styles';

const EditPreUpload = memo((props: EditPreUploadProps) => {
  const { t } = useTranslation();
  const acceptedFormats = getValidFormats('video');

  return (
    <EditPreUploadContainer
      {...props}
      onClick={props.onClick}
      data-testid="edit-pre-upload-container"
    >
      <div>
        <TSpan
          font="body-l-bold"
          $fill
          colorToken="--text-dragdrop-header-neutral-default"
        >
          {t('noumena.video_element.edit_pre_upload.left_text')}
        </TSpan>
        <TSpan
          font="body-l-bold"
          $fill
          colorToken="--text-dragdrop-brand-primary-default"
        >
          {t('noumena.video_element.edit_pre_upload.link_text')}
        </TSpan>
        <TSpan
          font="body-l-bold"
          $fill
          colorToken="--text-dragdrop-neutral-default"
        >
          {t('noumena.video_element.edit_pre_upload.right_text')}
        </TSpan>
      </div>

      <Spacer height="7px" />

      <div>
        {props.error ? (
          <TSpan
            font="footnote"
            $fill
            colorToken="--text-dragdrop-danger-primary-default"
          >
            {`${t('noumena.video_element.edit_pre_upload.error_text')} ${t(
              acceptedFormats.defaultFootNote,
            )}`}
          </TSpan>
        ) : (
          <TSpan
            font="footnote"
            $fill
            colorToken="--text-dragdrop-neutral-default"
          >
            {t(acceptedFormats.defaultFootNote)}
          </TSpan>
        )}
      </div>
    </EditPreUploadContainer>
  );
});

export default EditPreUpload;
