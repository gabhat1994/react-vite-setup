import React, { useState, useCallback, useEffect } from 'react';
import { t } from 'i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { NoumReferenceCapacity } from '@/apollo/generated/types';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { TSpan } from '@/components/Typography';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { TextArea } from '@/components/TextArea';
import { Spacer } from '@/layout';

import {
  StyledTabWrapper,
  EditReferenceDescription,
  EditReferenceForm,
  FieldWrapper,
  ButtonWrapper,
  TabContainer,
} from './styles';
import { type EditReferenceProps, type ReferenceDetailsInput } from './types';

const listOfTabs: InputListTypes[] = [
  {
    name: t('noumena.chamber_edit.add_reference.ask_for_a_reference'),
    image: 'terms_m',
    text: t('noumena.chamber_edit.add_reference.ask_for_a_reference'),
    labelSize: 'auto',
  },
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chamber_edit.add_reference.enter_manually'),
    labelSize: 'auto',
  },
];

const intialReferenceDetails: ReferenceDetailsInput = {
  providerName: '',
  capacity: NoumReferenceCapacity.Client,
  providerEmail: '',
  referenceText: '',
  isManual: false,
  file: undefined,
};

// const capacityOptions: DropdownValueType<string>[] = [
//   {
//     key: 'manager',
//     value: 'Manager',
//     type: 'value',
//     label: 'Manager',
//   },
// ];

const referenceSchema = yup
  .object({
    providerName: yup.string().required(t('noumena.input.not_empty')),
    capacity: yup.string().required(t('noumena.input.not_empty')),
    email: yup.string().when('isManual', {
      is: false,
      then: yup
        .string()
        .email(
          t(
            'noumena.email_login_form.valid_email.error_message_without_example',
          ),
        )
        .required(t('noumena.input.not_empty')),
    }),
    referenceText: yup.string().when('isManual', {
      is: true,
      then: yup.string().required(t('noumena.input.not_empty')),
    }),
    isManual: yup.boolean().required(),
  })
  .required();

const EditReference = ({ onClose }: EditReferenceProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [, setSelectedCapacity] = useState<
    DropdownValueType<string> | undefined
  >(undefined);
  const [referenceDetails, setReferenceDetails] =
    useState<ReferenceDetailsInput>({
      ...intialReferenceDetails,
      isManual: false,
    });

  const {
    register,
    reset,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReferenceDetailsInput>({
    resolver: yupResolver(referenceSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const handleChange = (value: string) => {
    const parsedValue = Number(value);
    setActiveTab(parsedValue);
    setReferenceDetails({
      ...referenceDetails,
      isManual: parsedValue === 1,
    });
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReferenceDetails({
        ...referenceDetails,
        [e.currentTarget.name]: e.currentTarget.value,
      });

      if (
        e.currentTarget.name === 'providerEmail' ||
        e.currentTarget.name === 'referenceText'
      ) {
        setValue(e.currentTarget.name, e.currentTarget.value);
        trigger(e.currentTarget.name);
      }
    },
    [setReferenceDetails, setValue, trigger, referenceDetails],
  );

  // const handleSelectCapacity = useCallback(
  //   (option: DropdownValueType<string>) => {
  //     setReferenceDetails({ ...referenceDetails, capacity: option.value });
  //     setSelectedCapacity(option);
  //     setValue('capacity', option.value);
  //     trigger('capacity');
  //   },
  //   [
  //     referenceDetails,
  //     setReferenceDetails,
  //     setSelectedCapacity,
  //     setValue,
  //     trigger,
  //   ],
  // );

  /*
  const handleUploadFile = useCallback(
    (fileURL: string | undefined) => {
      setValue('file', fileURL);
      trigger('file');
    },
    [setValue, trigger],
  );
  */

  const handleCancel = useCallback(() => {
    setReferenceDetails(intialReferenceDetails);
    setSelectedCapacity(undefined);
    reset();
    onClose();
  }, [setReferenceDetails, setSelectedCapacity, onClose, reset]);

  const onSubmit: SubmitHandler<ReferenceDetailsInput> = useCallback(
    async (data: ReferenceDetailsInput) => {
      // eslint-disable-next-line no-console
      console.log(data);
    },
    [],
  );

  useEffect(() => {
    setValue('isManual', activeTab === 1);
    trigger('isManual');
  }, [activeTab, setValue, trigger]);

  return (
    <StyledTabWrapper
      data-testid="EditReferenceWrapper"
      fullWidth
      style={{ height: '100%' }}
    >
      <TabContainer>
        <BasicChipsTabsForm
          onChange={handleChange}
          inputList={listOfTabs}
          selectedId={activeTab.toString()}
          mode="isBackground"
          isWithoutImage
          fontSize="--font-body-medium-regular-size"
          textFont="--font-body-medium-regular-font"
        />
      </TabContainer>
      {activeTab === 0 && (
        <EditReferenceDescription>
          <TSpan colorToken="--text-modal-neutral-default" font="body-l">
            {t(
              'noumena.chamber_edit.add_reference.ask_for_a_reference.description',
            )}
          </TSpan>
        </EditReferenceDescription>
      )}
      <Spacer height={16} />
      <EditReferenceForm onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper>
          <TextField
            {...register('providerName', {
              required: {
                value: true,
                message: t(`noumena.input.not_empty`),
              },
              onChange: handleInputChange,
            })}
            value={referenceDetails.providerName}
            label={t(
              `noumena.chamber_edit.add_reference.ask_for_a_reference.provider.full_name`,
            )}
            error={!!errors.providerName}
            helperText={errors.providerName?.message}
          />
          <Spacer height={16} />
          {/* <Dropdown
            hideIcons
            placement="bottom-start"
            options={capacityOptions}
            inputValue={selectedCapacity?.value}
            onSelectOption={handleSelectCapacity}
            usePortal={false}
          >
            {({ inputProps, inputRef, toggle }) => (
              <TextField
                readOnly
                {...inputProps}
                ref={inputRef}
                value={selectedCapacity ? String(selectedCapacity.label) : ''}
                label={t(
                  'noumena.chamber_edit.add_reference.ask_for_a_reference.capacity',
                )}
                spellCheck="false"
                onChange={() => {
                  setValue('capacity', selectedCapacity?.value || '');
                }}
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
                rightIcon={
                  <Icon name="chevron_down_m" color="--icon-input-neutral-default" size={16} onClick={toggle} />
                }
              />
            )}
          </Dropdown> */}
          <Spacer height={16} />
          {activeTab === 0 && (
            <>
              <TextField
                {...register('providerEmail', {
                  required: {
                    value: true,
                    message: t(`noumena.input.not_empty`),
                  },
                  onChange: handleInputChange,
                })}
                value={referenceDetails.providerEmail}
                label={t(
                  `noumena.chamber_edit.add_reference.ask_for_a_reference.provider.providerEmail`,
                )}
                error={!!errors.providerEmail}
                helperText={errors.providerEmail?.message}
              />
              <Spacer height={16} />
            </>
          )}
          {activeTab === 1 && (
            <>
              <TextArea
                {...register('referenceText', {
                  required: {
                    value: true,
                    message: t(`noumena.input.not_empty`),
                  },
                  onChange: handleInputChange,
                })}
                value={referenceDetails.referenceText}
                label={t(
                  `noumena.chamber_edit.add_reference.ask_for_a_reference.reference_text`,
                )}
                error={!!errors.referenceText}
                helperText={errors.referenceText?.message}
                multiple
              />
              <Spacer height={16} />
            </>
          )}
          <Spacer height={72} />
        </FieldWrapper>
        <ButtonWrapper>
          <Button onClick={() => handleCancel()} secondary tertiary size="full">
            {t('noumena.cancel')}
          </Button>
          <Spacer width={16} />
          {activeTab === 0 && (
            <Button
              type="submit"
              primary
              size="full"
              loading={false}
              secondary={!isValid}
              tertiary={!isValid}
              disabled={!isValid}
            >
              {t('noumena.send')}
            </Button>
          )}
          {activeTab === 1 && (
            <Button
              type="submit"
              primary
              size="full"
              loading={false}
              secondary={!isValid}
              tertiary={!isValid}
              disabled={!isValid}
            >
              {t('noumena.chamber_edit.visibility.save')}
            </Button>
          )}
        </ButtonWrapper>
      </EditReferenceForm>
    </StyledTabWrapper>
  );
};

export default EditReference;
