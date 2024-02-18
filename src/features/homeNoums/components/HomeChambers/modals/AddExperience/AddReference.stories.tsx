import React, { useState } from 'react';
import { type Meta } from '@storybook/react';
import { ElementStatusEnum, ElementTypeEnum } from '@/apollo/generated/types';
import AddReference from './AddExperience';
import { type AddExperienceProps } from '../types';

const AddReferenceWithHooks = ({
  approveReference,
  fetchMoreReferences,
  handleAddOption,
  rejectReference,
  discardReference,
  updateReference,
  setShowDiscardExperienceModal,
  handleDeleteOption,
  referenceFetching,
  capacityOptions,
}: AddExperienceProps) => {
  const [isOpenAddReferenceModal, setIsOpenAddReferenceModal] = useState(true);

  const handleCloseAddReferenceModal = () => setIsOpenAddReferenceModal(false);
  return (
    <AddReference
      elementType={ElementTypeEnum.ProjectWorkExperience}
      isEditing={false}
      title="Add Experience"
      handleOpenAddReferenceModal={() => {}}
      isOpen={isOpenAddReferenceModal}
      onClose={handleCloseAddReferenceModal}
      handleAddOption={handleAddOption}
      defaultData={{
        title: 'lorem',
        body: 'lorem',
        position: 0,
        id: '123',
        status: ElementStatusEnum.Unsaved,
      }}
      infiniteState="end"
      loading={false}
      referenceData={[]}
      {...{
        referenceFetching,
        approveReference,
        rejectReference,
        discardReference,
        updateReference,
        fetchMoreReferences,
        handleDeleteOption,
        setShowDiscardExperienceModal,
        capacityOptions,
      }}
    />
  );
};
export const AddReferenceStories = {
  render: AddReferenceWithHooks,
};

export default {
  title: 'UI/Chambers/AddReference',
  component: AddReference,
  argTypes: {
    isOpen: {
      type: 'boolean',
      defaultValue: true,
    },
    campaignsLoading: {
      type: 'boolean',
      defaultValue: false,
    },
    infiniteState: {
      options: ['loading', 'hasNextPage', 'end', 'end-with-force'],
      defaultValue: 'end',
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof AddReference>;
