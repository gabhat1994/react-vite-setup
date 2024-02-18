import { classNames, customStyles } from '@/components/DatePicker/styles';
import { Modal, ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { TextArea } from '@/components/TextArea/TextArea';
import { TextField } from '@/components/TextField';
import ImageEditor from '@/screens/Chamber/components/elements/ImageElement/ImageEditor';
import { format, startOfDay, subDays } from 'date-fns';
import { t } from 'i18next';
import { DayPicker } from 'react-day-picker';
import { Controller, type Control } from 'react-hook-form';
import { useState } from 'react';
import { Icon } from '@/components';
import { getErrorProps } from '@/utils/forms';
import { DatePickerContainer, StyledTabWrapper } from './styles';
import { type EditElementSchema } from './types';

type EditElementProps = {
  control: Control<EditElementSchema>;
};

export const AddQuestionForm = ({ control }: EditElementProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <StyledTabWrapper data-testid="EditElementWrapper" fullWidth>
      <Controller<EditElementSchema, 'question'>
        name="question"
        control={control}
        render={({ field: { ref, value, ...fieldProps }, fieldState }) => (
          <TextArea
            data-testid="tTextArea"
            placeholder={t('noumena.chamber.quick_question.question')}
            value={value}
            resize={false}
            maxLength={250}
            maxLengthPosition="end"
            maxHeight={150}
            {...getErrorProps(fieldState)}
            {...fieldProps}
          />
        )}
      />
      <Controller<EditElementSchema, 'date'>
        name="date"
        control={control}
        render={({
          field: { ref, value, onChange, ...fieldProps },
          fieldState,
        }) => (
          <>
            <TextField
              required
              onFocus={() => setShowPicker(true)}
              value={value ? format(value, 'MM/dd/yyyy') : undefined}
              label={t('noumena.chamber.quick_question.expiry_date')}
              {...getErrorProps(fieldState)}
              rightIcon={
                <Icon
                  name="calendar_m"
                  size={24}
                  onClick={() => setShowPicker(true)}
                />
              }
              {...fieldProps}
            />

            <Modal
              open={showPicker}
              spacingMode="gap-content"
              enableCloseButton
              onClose={() => setShowPicker(false)}
            >
              <ModalHeader />
              <ModalBody noFooter>
                <DatePickerContainer>
                  <DayPicker
                    mode="single"
                    disabled={{
                      from: new Date(0),
                      to: subDays(new Date(), 1),
                    }}
                    selected={value || undefined}
                    required
                    onSelect={(val) => {
                      // Ignore unselecting a date.
                      if (val) {
                        onChange(val);
                      }
                      setShowPicker(false);
                    }}
                    fromDate={startOfDay(new Date())}
                    styles={customStyles}
                    classNames={classNames}
                    captionLayout="buttons"
                  />
                </DatePickerContainer>
              </ModalBody>
            </Modal>
          </>
        )}
      />

      <Controller
        name="url"
        control={control}
        render={({ field: { value, onChange } }) => (
          <ImageEditor url={value} onContentChange={onChange} />
        )}
      />
    </StyledTabWrapper>
  );
};
