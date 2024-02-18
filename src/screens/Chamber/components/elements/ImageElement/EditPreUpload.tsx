import { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getValidFormats } from '@/utils/uploadFile';
import { Spacer } from '@/layout';

import { TSpan } from '../../../../../components/Typography';
import { type EditPreUploadProps } from './types';
import { EditPreUploadContainer } from './styles';

const EditPreUpload = memo((props: EditPreUploadProps) => {
  const { t } = useTranslation();
  const acceptedFormats = getValidFormats('image');

  return (
    <EditPreUploadContainer
      {...props}
      onClick={props.onClick}
      data-testid="image-edit-pre-upload-container"
    >
      <div>
        <TSpan
          font="body-l-bold"
          $fill
          colorToken="--text-dragdrop-header-neutral-default"
        >
          <Trans
            i18nKey="noumena.image_element.edit_pre_upload.text"
            components={{
              link1: (
                <TSpan
                  data-testid="multi_media_upload_btn"
                  font="body-l-bold"
                  colorToken="--text-dragdrop-brand-primary-default"
                />
              ),
            }}
          />
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
            {`${t('noumena.image_element.edit_pre_upload.error_text')} ${t(
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
