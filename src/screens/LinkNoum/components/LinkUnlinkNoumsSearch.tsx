import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Icon } from '@/components/Icon';
import { SearchField, SearchWrapper } from './styles';

const DEFAULT_DEBOUNCE_DELAY = 1000;

export const LinkUnlinkNoumsSearch: React.FC<{
  onSearchChange: (value: string) => void;
  searchString: string;
}> = ({ onSearchChange, searchString }) => {
  const [search, setSearch] = useState(searchString ?? '');

  const debouncedSearch = useDebounce<string>(
    search ?? '',
    DEFAULT_DEBOUNCE_DELAY,
  );

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <SearchWrapper>
      <SearchField
        inputSize="small"
        placeholder="Search for a Noum"
        leftIcon={
          <Icon
            name="search_m"
            size={24}
            color="--icon-input-neutral-default"
          />
        }
        rightIcon={
          search ? (
            <Icon
              name="clear_m"
              size={24}
              color="--icon-input-brand-primary-default"
              onClick={() => setSearch('')}
            />
          ) : null
        }
        rightIconColor="--icon-input-brand-primary-default"
        value={search || ''}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setSearch(e.currentTarget.value)
        }
        data-testid="link-unlink-noums-search"
      />
    </SearchWrapper>
  );
};
