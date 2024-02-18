import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import ChambersFilter from './Modal';
import { LinkedFilterOptions, updatedSortOptions } from './constants';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      {isOpen && (
        <ChambersFilter
          shouldShowFilter
          onClose={toggle}
          onSelectOption={() => {}}
          selectedSortOption={updatedSortOptions[0]}
          categoryOptions={[]}
          onSelectCategory={() => {}}
          selectedCategoryID=""
          selectedId=""
          onSelectLinkOption={() => {}}
          selectedLinkSort={LinkedFilterOptions()[0]}
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/ChambersFilter',
  component: Component,
} as Meta<typeof ChambersFilter>;

export const Primary = {};
