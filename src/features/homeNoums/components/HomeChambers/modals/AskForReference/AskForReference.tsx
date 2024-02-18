import { useMemo } from 'react';
import { t } from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { Dropdown } from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { useWindowDimensions } from '@/hooks/dimensions';
import { Spacer } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { type AskForReferencePayload } from '@/apollo/generated/types';
import { askForReferenceSchema } from '../data';
import { type AskForReferenceProps } from '../types';
import { getCapacityLabelFromValue } from '../helpers';

const AskForReference = ({
  isOpen,
  onClose,
  capacityOptions,
  referenceLoading,
  onSubmitAskForReference,
}: AskForReferenceProps) => {
  const { width } = useWindowDimensions();
  const isDesktop = useMemo(() => width > breakpoints.TABLET_L, [width]);
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  const {
    reset,
    control,
    handleSubmit: handleFormSubmit,
    formState: { isValid },
  } = useForm<AskForReferencePayload>({
    defaultValues: {
      providerName: '',
      providerEmail: '',
    },
    resolver: yupResolver(askForReferenceSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    await handleFormSubmit(onSubmitAskForReference)();
    handleClose();
  };

  return (
    <Modal
      open={!!isOpen}
      onClose={handleClose}
      testId="ask-for-reference-modal"
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
        {t('noumena.chamber_edit.add_reference.ask_for_a_reference')}
      </ModalHeader>
      <ModalBody
        style={{
          textAlign: 'left',
        }}
        minHeight="55vh"
        isFullScreen={!isDesktop}
        noFooter
      >
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          {t(
            'noumena.chamber_edit.add_reference.ask_for_a_reference.description',
          )}
        </TSpan>
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
              value={value}
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
              inputValue={value}
              onSelectOption={(e) => {
                onChange(e.value);
              }}
              usePopStyle={!isMobile}
              renderContainerFromBottom={isMobile}
            >
              {({ inputProps, inputRef, toggle }) => (
                <TextField
                  readOnly
                  {...inputProps}
                  ref={inputRef}
                  value={getCapacityLabelFromValue(value, capacityOptions)}
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
          name="providerEmail"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <TextField
              label={t(
                'noumena.chamber_edit.add_reference.ask_for_a_reference.provider.email',
              )}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Spacer height="16px" />
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

export default AskForReference;
