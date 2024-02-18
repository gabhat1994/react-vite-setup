import { t } from 'i18next';
import { SortKeys } from '@/components/Dropdown';
import { render, screen, fireEvent } from '@/test-utils';
import { LinkedFilterOptions, updatedSortOptions } from './constants';
import ChambersFilter from './Modal';

const onClose = vi.fn();
const onSelectCategory = vi.fn();

const selectedSortOption = updatedSortOptions[0] ?? {
  label: t(`noumena.sorting_a_z`),
  key: SortKeys?.sorting_a_z,
  type: 'value',
  value: SortKeys?.sorting_a_z,
};

describe('<ChambersFilter />', () => {
  test('renders', () => {
    render(
      <ChambersFilter
        shouldShowFilter
        onClose={onClose}
        onSelectOption={() => {}}
        selectedSortOption={selectedSortOption}
        categoryOptions={[]}
        onSelectCategory={() => {}}
        selectedCategoryID=""
        selectedId=""
        onSelectLinkOption={() => {}}
        selectedLinkSort={LinkedFilterOptions()[0]}
      />,
    );

    const modal = screen.getByTestId('chamber-filter');
    expect(modal).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ChambersFilter
        shouldShowFilter
        onClose={onClose}
        onSelectOption={() => {}}
        selectedSortOption={selectedSortOption}
        categoryOptions={[]}
        onSelectCategory={onSelectCategory}
        selectedCategoryID=""
        selectedId=""
        onSelectLinkOption={() => {}}
        selectedLinkSort={LinkedFilterOptions()[0]}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('chamber-filter'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('apply clicked', () => {
    render(
      <ChambersFilter
        shouldShowFilter
        onClose={onClose}
        onSelectOption={() => {}}
        selectedSortOption={selectedSortOption}
        categoryOptions={[]}
        onSelectCategory={onSelectCategory}
        selectedCategoryID=""
        selectedId=""
        onSelectLinkOption={() => {}}
        selectedLinkSort={LinkedFilterOptions()[0]}
      />,
    );

    screen.getByText(updatedSortOptions[1].label as string).click();
    const applyBtn = screen.getByTestId('chamber-filter-apply-button');
    expect(applyBtn).toBeInTheDocument();

    fireEvent.click(applyBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('cancel on modal', () => {
    render(
      <ChambersFilter
        shouldShowFilter
        onClose={onClose}
        onSelectOption={() => {}}
        selectedSortOption={selectedSortOption}
        categoryOptions={[]}
        onSelectCategory={onSelectCategory}
        selectedCategoryID=""
        selectedId=""
        onSelectLinkOption={() => {}}
        selectedLinkSort={LinkedFilterOptions()[0]}
      />,
    );

    const cancelBtn = screen.getByTestId('chamber-filter-cancel-button');
    expect(cancelBtn).toBeInTheDocument();

    fireEvent.click(cancelBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
