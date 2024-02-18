import { t } from 'i18next';
import { capitalize } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import {
  NoumReferenceStatus,
  type UpdateNoumReferencePayload,
} from '@/apollo/generated/types';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import {
  ReferenceContainer,
  ReferenceDetail,
  ReferenceDetailContainer,
  ReferenceClient,
  IconMainContainer,
  ReferenceDescription,
  ButtonWrapper,
} from './styles';
import ReferenceMedia from './ReferenceMedia';
import { getFileDetails } from './helpers';
import { type ReferecneViewItemProps } from './types';
import DeleteReference from './DeleteReference';
import UpdateReference from './UpdateReference';

export const ReferenceViewItem = ({
  reference,
  isEditing,
  approveReference,
  rejectReference,
  discardReference,
  updateReference,
  loading,
  capacityOptions,
}: ReferecneViewItemProps) => {
  const {
    _id: id,
    capacity,
    imageUrl,
    providerName,
    referenceText,
    status,
  } = reference;

  const { formattedCapacity, fileName, fileType } = useMemo(
    () => ({
      formattedCapacity: capacity
        .replaceAll('_', ' ')
        .split(' ')
        .map((item) => capitalize(item))
        .join(' '),
      ...getFileDetails(imageUrl ?? ''),
    }),
    [capacity, imageUrl],
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDiscardReference = useCallback(async () => {
    await discardReference?.(id);
    setShowDeleteModal(false);
  }, [discardReference, id]);

  const handleUpdateReference = useCallback(
    async (payload: UpdateNoumReferencePayload) => {
      await updateReference?.(id, payload);
      setShowEditModal(false);
    },
    [updateReference, id],
  );

  return (
    <>
      <ReferenceContainer>
        <ReferenceDetail>
          <ReferenceDetailContainer>
            <TSpan
              colorToken="--text-card-header-neutral-highlighted"
              font="body-xl-bold"
            >
              {providerName}
            </TSpan>
            <ReferenceClient
              font="body-m-bold"
              colorToken="--text-card-header-neutral-default"
            >
              {formattedCapacity}
            </ReferenceClient>
            {status === NoumReferenceStatus.Pending && (
              <>
                <Spacer height={16} />
                <ReferenceClient
                  font="body-m"
                  colorToken="--text-card-header-neutral-default"
                >
                  {t('noumena.chamber_edit.add_reference.subheading')}
                </ReferenceClient>
              </>
            )}
          </ReferenceDetailContainer>
          {isEditing && (
            <IconMainContainer>
              <Button
                tertiary
                size="small"
                icon={
                  <Icon
                    name="edit_m"
                    size={24}
                    color="--icon-button-neutral-default"
                  />
                }
                onClick={() => setShowEditModal(true)}
              />
              <Button
                secondary
                intent="negative"
                size="small"
                icon={
                  <Icon
                    name="delete_m"
                    size={24}
                    color="--icon-button-danger-secondary-default"
                  />
                }
                onClick={() => setShowDeleteModal(true)}
              />
            </IconMainContainer>
          )}
        </ReferenceDetail>
        <ReferenceDescription
          textAlign="left"
          font="body-m"
          colorToken="--text-card-neutral-highlighted"
        >
          {referenceText}
        </ReferenceDescription>
        {imageUrl && (
          <ReferenceMedia
            mediaSrc={imageUrl}
            mediaName={fileName}
            mediaType={fileType}
          />
        )}
        {status === NoumReferenceStatus.Pending && (
          <ButtonWrapper>
            <Button
              size="small"
              loading={loading}
              onClick={() => approveReference?.(id)}
              intent="positive"
              secondary
            >
              {t('noumena.keep')}
            </Button>
            <Spacer width={8} />
            <Button
              size="small"
              loading={loading}
              onClick={() => rejectReference?.(id)}
              intent="negative"
              secondary
            >
              {t('noumena.discard')}
            </Button>
          </ButtonWrapper>
        )}
      </ReferenceContainer>
      {isEditing && showDeleteModal && (
        <DeleteReference
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          handleDiscardReference={handleDiscardReference}
        />
      )}
      {isEditing && showEditModal && (
        <UpdateReference
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          reference={reference}
          referenceLoading={!!loading}
          capacityOptions={capacityOptions || []}
          onSubmitReference={handleUpdateReference}
        />
      )}
    </>
  );
};
