import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Modal,
  ModalBody,
  ModalSize,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { useError } from '@/hooks';
import { Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useEventHandlers,
  useUserLiveEventDetails,
} from '@/features/events/hooks';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { useCreateInstantEventMutation } from '@/apollo/graphql';
import { Button } from './styles';
import { AddMembers } from './AddMembers';
import { EventFieldRow } from '../styles';
import { getCalendarInviteSchema } from './utils';
import { useCreateEditEventContext } from '../contexts';
import { StartNowEventWarningModal } from './StartNowEventWarningModal';

export const OnDemandEventModalV2 = () => {
  const { logError } = useError();

  const [showStartNowWarningModal, setShowStartNowWarningModal] =
    useState(false);
  const [showOnDemandModal, setShowOnDemandModal] = useState(false);

  const { chamberId, eventSuccessCallback, onCancelModal, members } =
    useCreateEditEventContext();

  const { eventScheduledIn60Mins, isAnotherEventLive } =
    useUserLiveEventDetails(chamberId);

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
    resolver: yupResolver(
      getCalendarInviteSchema(t('noumena.event_title_field_cant_be_empty')),
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { onJoinEvent } = useEventHandlers({});

  const onCreateEventSuccess = (eventId: string, socialHallId: string) => {
    if (eventSuccessCallback) {
      onClose();
      eventSuccessCallback();
    }
    onJoinEvent(eventId, socialHallId);
  };

  const onCancelConfirmationModal = () => {
    setShowStartNowWarningModal(false);
    setShowOnDemandModal(false);
  };

  const onConfirmConfirmationModal = () => {
    setShowStartNowWarningModal(false);
    setShowOnDemandModal(true);
  };

  const onClose = () => {
    reset();
    onCancelModal();
    onCancelConfirmationModal();
  };

  const onSubmit = async () => {
    try {
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

  useEffect(() => {
    if (eventScheduledIn60Mins || isAnotherEventLive) {
      setShowStartNowWarningModal(true);
    } else {
      setShowOnDemandModal(true);
    }
  }, [
    eventScheduledIn60Mins,
    isAnotherEventLive,
    setShowStartNowWarningModal,
    setShowOnDemandModal,
  ]);

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

  return (
    <>
      {showOnDemandModal && !showStartNowWarningModal && (
        <Modal
          testId="ondemand-event-modal"
          open={true}
          enableCloseButton
          onClose={onClose}
          size={ModalSize.XL}
          disableBackdropClick
        >
          <ModalHeader topPadding={0} bottomPadding={0}>
            {t(
              'noumena.chambers.toolbox.element.calendar.start_now_modal.title',
            )}
          </ModalHeader>
          <ModalBody>
            <EventFieldRow>
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
            </EventFieldRow>
            <AddMembers showHelperText />
          </ModalBody>
          <ModalFooter marginTop={0}>
            <Stack justify="space-between" fullWidth>
              <Button tertiary size="large" onClick={onCancelModal}>
                {t('noumena.cancel')}
              </Button>
              <Button
                primary
                size="large"
                disabled={!firstName || !!formState.errors.eventName}
                onClick={handleSubmit(onSubmit)}
                loading={loading || !firstName}
              >
                {t(
                  'noumena.chambers.toolbox.element.calendar.start_now_modal.start_action',
                )}
              </Button>
            </Stack>
          </ModalFooter>
        </Modal>
      )}

      {showStartNowWarningModal && (
        <StartNowEventWarningModal
          spaceId={chamberId}
          event={eventScheduledIn60Mins}
          isOpen={showStartNowWarningModal}
          onClose={onClose}
          onContinueClick={onConfirmConfirmationModal}
        />
      )}
    </>
  );
};
