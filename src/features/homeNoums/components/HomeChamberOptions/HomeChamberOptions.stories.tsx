import { MockedProvider } from '@apollo/client/testing';
import { ElementStatusEnum } from '@/apollo/generated/types';
import HomeChamberOptions from './HomeChamberOptions';

const arrayOfOptions = [
  {
    id: '1',
    title: 'Lorem ipsum 1',
    body: '<p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p>',
    position: 1,
    status: ElementStatusEnum.Unsaved,
  },
  {
    id: '2',
    title: 'Lorem ipsum 2',
    body: '<p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p>',
    position: 2,
    status: ElementStatusEnum.Unsaved,
  },
  {
    id: '3',
    title: 'Lorem ipsum 3',
    body: '<p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p>',
    position: 3,
    status: ElementStatusEnum.Unsaved,
  },
];

export const HomeChamberOptionsStories = () => {
  const handleOpenAddReferenceModal = () => {};
  const handleDeleteOption = (id: string) => id;
  const setDefaultData = ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => ({ title, body });

  return (
    <MockedProvider mocks={[]}>
      <HomeChamberOptions
        arrayOfOptions={arrayOfOptions}
        handleOpenAddExperienceModal={handleOpenAddReferenceModal}
        handleDeleteOption={handleDeleteOption}
        setDefaultData={setDefaultData}
        handleSelectOption={() => {}}
      />
    </MockedProvider>
  );
};

export const HomeChamberOptionsEditModeStories = () => {
  const handleOpenAddReferenceModal = () => {};
  const handleDeleteOption = (id: string) => id;
  const setDefaultData = ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => ({ title, body });
  return (
    <MockedProvider mocks={[]}>
      <HomeChamberOptions
        arrayOfOptions={arrayOfOptions}
        isEditMode
        handleOpenAddExperienceModal={handleOpenAddReferenceModal}
        handleDeleteOption={handleDeleteOption}
        setDefaultData={setDefaultData}
        handleSelectOption={() => {}}
      />
    </MockedProvider>
  );
};

export default {
  title: 'UI/Chambers/HomeChamberOptions',
  component: HomeChamberOptionsStories,
  subcomponents: { HomeChamberOptionsEditModeStories },
};
