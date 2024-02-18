import { useMemo, useState, useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { type UpdateNoumReferencePayload } from '@/apollo/generated/types';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { Dropdown } from '@/components/Dropdown';
import { TextArea } from '@/components/TextArea';
import { UploadMedia } from '@/features/upload/components';
import { Button } from '@/components/Button';
import { useWindowDimensions } from '@/hooks/dimensions';
import { Spacer } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { mediaTypes } from '@/constants/fileTypes';
import ReferenceMedia from '../ReferenceMedia';
import {
  getFileType,
  getFileDetails,
  getCapacityLabelFromValue,
} from '../helpers';
import { addManualReferenceSchema } from '../data';
import { type UpdateReferenceProps } from '../types';

const UpdateReference = ({
  isOpen,
  onClose,
  reference,
  capacityOptions,
  referenceLoading,
  onSubmitReference,
}: UpdateReferenceProps) => {
  const { capacity, imageUrl, providerName, referenceText } = reference;

  const { fileName, fileType } = getFileDetails(imageUrl ?? '');

  const { width } = useWindowDimensions();
  const isDesktop = useMemo(() => width > breakpoints.TABLET_L, [width]);
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  const [, setMediaUploading] = useState(false);
  const [media, setMedia] = useState(imageUrl ?? '');
  const [mediaDetail, setMediaDetail] = useState({
    name: fileName,
    type: fileType,
    size: 0,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit: handleFormSubmit,
    formState: { isValid },
  } = useForm<UpdateNoumReferencePayload>({
    defaultValues: {
      providerName: providerName ?? '',
      referenceText: referenceText ?? '',
      capacity: capacity ?? '',
      imageUrl: imageUrl ?? '',
    },
    resolver: yupResolver(addManualReferenceSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
  });

  const handleClose = () => {
    reset();
    setMedia('');
    onClose();
  };

  const handleSubmit = async () => {
    await handleFormSubmit(onSubmitReference)();
  };

  useEffect(() => {
    setValue('imageUrl', media);
  }, [media, setValue]);

  const handleSetMediaDetails = useCallback((e: File) => {
    setMediaDetail({
      name: e.name,
      type: getFileType(e.type),
      size: Number((Math.round(e.size) / 1000000).toPrecision(2)),
    });
  }, []);

  const handleSetMediaUploading = useCallback((uploading: boolean) => {
    setMediaUploading(uploading);
  }, []);

  return (
    <Modal
      open={!!isOpen}
      onClose={handleClose}
      testId="update-reference-modal"
      isFullScreen={!isDesktop}
      style={{
        width: isDesktop ? 752 : undefined,
      }}
      hasBackButton
      enableCloseButton
      closeButtonStyles={{
        enforceLeft: true,
        transparentModalCloseButton: true,
        defaultBtnForMobile: false,
      }}
      disableBackdropClick
    >
      <ModalHeader isFullScreen={!isDesktop}>
        {t(`noumena.chamber_edit.edit_reference.title`)}
      </ModalHeader>
      <ModalBody
        style={{
          textAlign: 'left',
        }}
        minHeight="55vh"
        isFullScreen={!isDesktop}
        noFooter
      >
        <Spacer height={24} />
        <Controller
          control={control}
          name="providerName"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <TextField
              label={t(
                'noumena.chamber_edit.add_reference.ask_for_a_reference.provider.full_name',
              )}
              onBlur={onBlur}
              value={value ?? ''}
              onChange={onChange}
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Spacer height="16px" />
        <Controller
          control={control}
          name="capacity"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Dropdown
              containerStyle={{
                padding: '0',
              }}
              observerMinHeight="0px"
              hideIcons
              placement="bottom-start"
              options={capacityOptions}
              inputValue={value ?? ''}
              onSelectOption={(e) => {
                onChange(e.value);
              }}
              usePopStyle={!isMobile}
              renderContainerFromBottom={isMobile}
              dropdownItemStyle={isMobile ? { textAlign: 'center' } : undefined}
            >
              {({ inputProps, inputRef, toggle }) => (
                <TextField
                  readOnly
                  {...inputProps}
                  ref={inputRef}
                  value={getCapacityLabelFromValue(
                    value || undefined,
                    capacityOptions,
                  )}
                  label={t(
                    'noumena.chamber_edit.add_reference.ask_for_a_reference.capacity',
                  )}
                  spellCheck="false"
                  error={!!error?.message}
                  helperText={error?.message}
                  rightIcon={
                    <Icon
                      name="chevron_down_m"
                      size={16}
                      color="--icon-input-neutral-default"
                      onClick={toggle}
                    />
                  }
                />
              )}
            </Dropdown>
          )}
        />
        <Spacer height="16px" />
        <Controller
          control={control}
          name="referenceText"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <TextArea
              label={t(
                `noumena.chamber_edit.add_reference.ask_for_a_reference.reference_text`,
              )}
              autoResize
              value={value ?? ''}
              onBlur={onBlur}
              onChange={onChange}
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Spacer height="16px" />
        {media?.length ? (
          <ReferenceMedia
            mediaSrc={media}
            clearMedia={() => setMedia('')}
            mediaName={mediaDetail.name}
            mediaSize={mediaDetail.size}
            mediaType={mediaDetail.type}
          />
        ) : (
          <UploadMedia
            acceptedFileTypes={mediaTypes}
            onUploading={handleSetMediaUploading}
            maxSize={500}
            setMediaDetail={handleSetMediaDetails}
            onContentChange={setMedia}
            type="profile"
          />
        )}
        <Spacer height="16px" />
      </ModalBody>
      <ModalFooter isFullScreen={!isDesktop} justifyContent="space-between">
        <Button
          tertiary
          testId="add-reference-cancel-action"
          size="full"
          softDisabled={referenceLoading}
          disabled={!isValid}
          onClick={handleClose}
        >
          {t(`noumena.cancel`)}
        </Button>
        <Spacer width={16} />
        <Button
          testId="add-reference-save-action"
          primary
          size="full"
          softDisabled={referenceLoading}
          loading={referenceLoading}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {t('noumena.button.save')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateReference;
