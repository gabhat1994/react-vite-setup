import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { UploadMedia } from '@/features/upload/components';
import { imageTypes } from '@/constants/fileTypes';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { bytesToMegabytes } from '@/screens/Chamber/components/modals/FileUploadModal/utils';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import S from './styles';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';

type InvoiceLogoUploadProps = {};

const InvoiceLogoUpload: React.FC<InvoiceLogoUploadProps> = () => {
  const {
    setValue,
    control,
    formState: { isSubmitting },
    watch,
  } = useFormContext<InvoiceFormValues>();

  const [uploadError, setUploadError] = useState(false);

  const [mediaDetail, setMediaDetail] = useState({
    name: '',
    type: '',
    size: 0,
    extension: '',
  });

  const handleSetMediaDetails = (e: File) => {
    setMediaDetail({
      name: e.name,
      type: e.type,
      size: e.size,
      extension: e.name.substring(e.name.lastIndexOf('.') + 1),
    });
  };

  const handleClearMedia = () => {
    setValue('logo', '', { shouldDirty: true });
    setUploadError(false);
    setMediaDetail({ name: '', type: '', size: 0, extension: '' });
  };

  const hasValue = !!mediaDetail.name || !!watch('logo');

  return (
    <S.Container isUploaded={hasValue && !uploadError}>
      <Controller
        control={control}
        name="logo"
        defaultValue={undefined}
        render={({ field: { value } }) => (
          <>
            <UploadMedia
              type="invoice"
              onUploading={() => {}}
              acceptedFileTypes={imageTypes}
              maxSize={1}
              setMediaDetail={handleSetMediaDetails}
              onContentChange={(url) => {
                setValue('logo', url, {
                  shouldDirty: true,
                });
              }}
              onError={(error) => {
                if (mediaDetail.name && error) {
                  setMediaDetail({
                    name: '',
                    type: '',
                    size: 0,
                    extension: '',
                  });
                }
                setUploadError(error);
              }}
              isHidden={hasValue && !uploadError}
              error={uploadError}
              marginTop={0}
            />
            {!uploadError && hasValue ? (
              <Stack fullWidth gap={16} align="center">
                {value ? (
                  <S.ImagePreview src={value ?? ''} alt="" />
                ) : (
                  <S.SpinnerContainer>
                    <Spinner />
                  </S.SpinnerContainer>
                )}
                <Stack vertical fullWidth>
                  <TSpan
                    font="body-m"
                    singleLine
                    colorToken="--text-card-header-neutral-highlighted"
                  >
                    {mediaDetail?.name}
                  </TSpan>
                  <TSpan colorToken="--text-card-neutral-default">
                    {bytesToMegabytes(mediaDetail?.size)} MB
                  </TSpan>
                </Stack>
                <Button
                  size="small"
                  tertiary
                  disabled={(!!mediaDetail?.name && !value) || isSubmitting}
                  icon={
                    <Icon
                      name="delete_m"
                      size={20}
                      color="--button-card-neutral-default"
                    />
                  }
                  onClick={handleClearMedia}
                  neutral
                />
              </Stack>
            ) : null}
          </>
        )}
      />
    </S.Container>
  );
};

export default InvoiceLogoUpload;
