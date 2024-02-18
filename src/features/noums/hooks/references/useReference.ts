import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { capitalize } from 'lodash';
import {
  type AskForReferencePayload,
  type ManualNoumReferencePayload,
  type UpdateNoumReferencePayload,
  NoumReferenceStatus,
} from '@/apollo/generated/types';
import {
  useGetNoumReferenceCapacityQuery,
  useAskForNoumReferenceMutation,
  useAddManualReferenceForNoumMutation,
  useUpdateNoumReferenceStatusMutation,
  useDiscardNoumReferenceMutation,
  useUpdateNoumReferenceMutation,
} from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import { useToast } from '@/hooks/toast';
import { useGetNoumReferences } from './useGetNoumReferences';

export const useReference = () => {
  const { addToast } = useToast();
  const [experienceId, setExperienceId] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const { data: referenceCapacity, loading: referenceCapacityLoading } =
    useGetNoumReferenceCapacityQuery();
  const [askForNoumReferenceMutation, { loading: submitLoading }] =
    useAskForNoumReferenceMutation({});
  const [addManualReferenceForNoumMutation, { loading: addManualLoading }] =
    useAddManualReferenceForNoumMutation({});
  const [updateNoumReferenceStatusMutation, { loading: updateStatusLoading }] =
    useUpdateNoumReferenceStatusMutation({});
  const [discardNoumReferenceMutation, { loading: discardLoading }] =
    useDiscardNoumReferenceMutation({});
  const [updateNoumReferenceMutation, { loading: updateLoading }] =
    useUpdateNoumReferenceMutation({});

  const {
    fetchMoreReferences,
    infiniteState,
    refetchReferences,
    references: referenceData,
    loading: fetching,
  } = useGetNoumReferences(
    experienceId,
    [NoumReferenceStatus.Accepted, NoumReferenceStatus.Pending],
    true,
    10,
  );

  const loading =
    referenceCapacityLoading ||
    submitLoading ||
    addManualLoading ||
    updateStatusLoading ||
    discardLoading ||
    updateLoading;

  const capacityOptions: DropdownValueType<string>[] = useMemo(
    () =>
      referenceCapacity?.getNoumReferenceCapacity.length
        ? referenceCapacity?.getNoumReferenceCapacity.map((item) => ({
            key: item,
            value: item,
            type: 'value',
            label: capitalize(item.replaceAll('_', '-')),
          }))
        : [],
    [referenceCapacity],
  );

  const handleAddReferenceManually = useCallback(
    async (payload: ManualNoumReferencePayload) => {
      const response = await addManualReferenceForNoumMutation({
        variables: {
          experienceId,
          reference: payload,
        },
      });
      if (response?.data?.addManualReferenceForNoum) {
        addToast(
          'success',
          'none',
          t(
            'noumena.chamber_edit.add_reference.add_a_reference.success_message',
          ),
        );
      } else {
        addToast('error', 'none', 'Something went wrong');
      }
    },
    [addManualReferenceForNoumMutation, addToast, experienceId],
  );

  const handleAskForNoumReference = useCallback(
    async (payload: AskForReferencePayload) => {
      const response = await askForNoumReferenceMutation({
        variables: {
          experienceId,
          reference: payload,
        },
      });
      if (response?.data?.askForNoumReference) {
        addToast(
          'success',
          'none',
          t(
            'noumena.chamber_edit.add_reference.ask_for_a_reference.success_message',
          ),
        );
      } else {
        addToast('error', 'none', 'Something went wrong');
      }
    },
    [addToast, askForNoumReferenceMutation, experienceId],
  );

  const onSubmitManualReference = useCallback(
    async (payload: ManualNoumReferencePayload) => {
      try {
        await handleAddReferenceManually(payload);
        refetchReferences();
      } catch (err) {
        addToast('error', 'none', 'Something went wrong');
      }
    },
    [addToast, refetchReferences, handleAddReferenceManually],
  );

  const onSubmitAskForReference = useCallback(
    async (payload: AskForReferencePayload) => {
      try {
        await handleAskForNoumReference(payload);
        refetchReferences();
      } catch (err) {
        addToast('error', 'none', 'Something went wrong');
      }
    },
    [handleAskForNoumReference, refetchReferences, addToast],
  );

  const updateNoumReferenceStatus = useCallback(
    (status: NoumReferenceStatus) => async (id: string) => {
      try {
        const response = await updateNoumReferenceStatusMutation({
          variables: {
            referenceId: id,
            status,
          },
        });
        if (response.data?.updateNoumReferenceStatus.status === status) {
          refetchReferences().then(() => {
            addToast(
              'success',
              'none',
              `successfully ${
                status === NoumReferenceStatus.Accepted
                  ? 'approved'
                  : 'rejected'
              } reference`,
            );
          });
        }
      } catch (err) {
        addToast(
          'error',
          'none',
          t('noumena.chamber_edit.add_reference.empty_title'),
        );
      }
    },
    [updateNoumReferenceStatusMutation, refetchReferences, addToast],
  );

  const approveReference = updateNoumReferenceStatus(
    NoumReferenceStatus.Accepted,
  );
  const rejectReference = updateNoumReferenceStatus(
    NoumReferenceStatus.Rejected,
  );

  const discardReference = useCallback(
    async (id: string) => {
      try {
        const response = await discardNoumReferenceMutation({
          variables: {
            referenceId: id,
          },
        });
        if (response.data?.discardNoumReference) {
          refetchReferences().then(() => {
            addToast(
              'success',
              'none',
              t('noumena.chamber_edit.delete_reference.success'),
            );
          });
        }
      } catch (err) {
        addToast(
          'error',
          'none',
          t('noumena.chamber_edit.add_reference.empty_title'),
        );
      }
    },
    [discardNoumReferenceMutation, refetchReferences, addToast],
  );

  const updateReference = useCallback(
    async (id: string, payload: UpdateNoumReferencePayload) => {
      try {
        const response = await updateNoumReferenceMutation({
          variables: {
            referenceId: id,
            payload,
          },
        });
        if (response.data?.updateNoumReference) {
          refetchReferences().then(() => {
            addToast(
              'success',
              'none',
              t('noumena.chamber_edit.edit_reference.success_message'),
            );
          });
        }
      } catch (err) {
        addToast(
          'error',
          'none',
          t('noumena.chamber_edit.add_reference.empty_title'),
        );
      }
    },
    [addToast, refetchReferences, updateNoumReferenceMutation],
  );

  return {
    loading,
    fetching,
    onSubmitManualReference,
    onSubmitAskForReference,
    capacityOptions,
    experienceId,
    setExperienceId,
    referenceId,
    setReferenceId,
    approveReference,
    rejectReference,
    discardReference,
    updateReference,
    referenceData,
    fetchMoreReferences,
    infiniteState,
  };
};

export default useReference;
