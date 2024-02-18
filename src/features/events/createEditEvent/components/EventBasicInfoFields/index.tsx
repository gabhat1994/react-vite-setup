import { t } from 'i18next';
import { Controller } from 'react-hook-form';

import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';
import { useCreateEditEventContext } from '@/features/events/contexts';
import { Spacer } from '@/layout';

import { useGeniusCompletionModal } from '@/features/genius/hooks/useGeniusCompletionModal';
import { EventBasicInfoFieldsWrapper } from './styles';

export const EventBasicInfoFields = () => {
  const { control, formState, setValue } = useCreateEditEventContext();

  const GeniusCompletion = useGeniusCompletionModal({
    onConfirm: (response) => {
      setValue('description', response.text);
    },
    type: 'text',
    buttonType: 'generate-description',
    descriptionType: 'event',
    title: t('noumena.genius.generate_event_description'),
  });

  return (
    <>
      <EventBasicInfoFieldsWrapper data-testid="event-basic-info-fields">
        <Spacer height={2} />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              name="title"
              value={value || ''}
              label={t(`noumena.event.event_name_label`)}
              onChange={onChange}
              error={!!formState?.errors?.title}
              helperText={formState?.errors?.title?.message}
            />
          )}
          name="title"
        />
        <Spacer height={16} />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              autoResize={!value || value.length < 100}
              name="description"
              value={value || ''}
              label={t(`noumena.event.event_description_label`)}
              onChange={onChange}
              helperText={formState?.errors?.description?.message}
              resize={false}
              rightIcon={value ? null : GeniusCompletion.buttonElement}
            />
          )}
          name="description"
        />
      </EventBasicInfoFieldsWrapper>
      {GeniusCompletion.modalElement}
    </>
  );
};
