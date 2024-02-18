import { t } from 'i18next';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import {
  useEventHandlers,
  useUserLiveEventDetails,
} from '@/features/events/hooks';
import { Spacer } from '@/layout';
import { useError, useToggle } from '@/hooks';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { useCreateInstantEventMutation } from '@/apollo/graphql';

import { getCalendarInviteSchema } from './utils';
import { useCreateEditEventContext } from '../contexts';
import { EventInviteMembers } from '../createEditEvent/components/EventInviteMembers';
import { StartNowEventWarningModal } from './StartNowEventWarningModal';

export const OnDemandEventModal = () => {
  const { logError } = useError();
  const [isStartNowWarningModal, toggleStartNowWarningModal] = useToggle();
  const { chamberId, isOpen, eventSuccessCallback, onCancelModal, members } =
    useCreateEditEventContext();

  const { eventScheduledIn60Mins } = useUserLiveEventDetails(chamberId);

  const { space: spaceViewData } = useNoumDetails(chamberId);

  const fullName = spaceViewData?.name;

  const space =
    fullName?.indexOf(' ') === -1 ? fullName.length : fullName?.indexOf(' ');

  const firstName = fullName?.substring(0, space);

  const [createInstantEventMutation, { loading }] =
    useCreateInstantEventMutation({});

  const { control, handleSubmit, reset, formState } = useForm<{
    eventName: string;
  }>({
    resolver: yupResolver(getCalendarInviteSchema()),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { onJoinEvent } = useEventHandlers({});

  useEffect(() => {
    let eventName = '';
    if (firstName) {
      eventName = `${
        space && space > 0 ? firstName : fullName
      }'s On-Demand Event`;
    }
    reset({
      eventName,
    });
  }, [firstName, fullName, reset, space]);

  const onClose = () => {
    reset();
    onCancelModal();
  };

  const onCreateEventSuccess = (eventId: string, socialHallId: string) => {
    if (eventSuccessCallback) {
      onClose();
      eventSuccessCallback();
    }
    onJoinEvent(eventId, socialHallId);
  };

  const onSubmit = async () => {
    try {
      if (eventScheduledIn60Mins) {
        toggleStartNowWarningModal();
        return;
      }

      const { data } = await createInstantEventMutation({
        variables: {
          input: {
            title: formState.defaultValues?.eventName ?? '',
            description: '',
            chamberId,
            invitations: members.map((item) => ({
              userId: item._id || '',
              chamberId: item.chamberId,
            })),
          },
        },
      });
      onCreateEventSuccess(
        data?.createInstantEvent?._id ?? '',
        data?.createInstantEvent?.socialHall?._id ?? '',
      );
    } catch (err) {
      logError(err, 'event');
    }
  };

  return (
    <>
      <Modal
        testId="calendar-start-now"
        open={!!isOpen}
        enableCloseButton
        onClose={onClose}
        size={ModalSize.XL}
        disableBackdropClick
      >
        <ModalHeader>
          {t('noumena.chambers.toolbox.element.calendar.start_now_modal.title')}
        </ModalHeader>
        <ModalBody>
          <Spacer height={10} />
          <Controller
            control={control}
            name="eventName"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                label={t(
                  'noumena.chambers.toolbox.element.calendar.start_now_modal.input_event',
                )}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                error={!!error?.message}
                helperText={error?.message}
              />
            )}
          />
          <Spacer height={24} />
          <EventInviteMembers
            showHelperText
            dropdownProps={{
              usePortal: true,
              placement: 'bottom',
            }}
          />
        </ModalBody>
        <ModalFooter gap={16}>
          <Button tertiary size="full" onClick={onCancelModal}>
            {t('noumena.cancel')}
          </Button>
          <Button
            primary
            size="full"
            disabled={!firstName || !!formState.errors.eventName}
            onClick={handleSubmit(onSubmit)}
            loading={loading || !firstName}
          >
            {t(
              'noumena.chambers.toolbox.element.calendar.start_now_modal.start_action',
            )}
          </Button>
        </ModalFooter>
      </Modal>
      {isStartNowWarningModal && (
        <StartNowEventWarningModal
          spaceId={chamberId}
          event={eventScheduledIn60Mins}
          isOpen={isStartNowWarningModal}
          onClose={toggleStartNowWarningModal}
          onContinueClick={toggleStartNowWarningModal}
        />
      )}
    </>
  );
};
