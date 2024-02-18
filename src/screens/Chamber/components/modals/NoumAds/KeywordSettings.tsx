import generate from 'uniqid';

import { useMemo, useState } from 'react';
import { Chips } from '@/components/Chips/Chips';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';

import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import useDebounce from '@/hooks/useDebounce';
import { Button } from '@/components/Button';
import { ChipWrapper } from './styles';
import { type KeywordSettingsProps } from './types';

export function KeywordSettings({
  suggestions,
  selectedKeywords,
  onAdd,
  onRemove,
}: KeywordSettingsProps) {
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 500);

  const keywords: DropdownValueType<string>[] = suggestions.map((k) => ({
    key: generate(),
    value: k,
    type: 'value',
    label: (
      <Stack>
        <TSpan font="body-m-bold">{k}</TSpan>
      </Stack>
    ),
  }));

  const footer: DropdownValueType<string>[] = [
    {
      key: 'dropdown-footer',
      value: 'add-current-value',
      type: 'value',
      label: (
        <Button
          onClick={() => onAdd(query)}
          neutral
          size="small"
          leftIcon={
            <Icon
              name="add_m"
              size={24}
              color="--text-tablecell-body-neutral-default"
            />
          }
        >
          <TSpan
            font="body-m-bold"
            colorToken="--text-tablecell-body-neutral-default"
          >
            Add “{query}” to the list
          </TSpan>
        </Button>
      ),
    },
  ];

  const results = useMemo(
    () =>
      debouncedQuery
        ? keywords.filter((k) =>
            k.value.toLowerCase().includes(debouncedQuery.toLowerCase()),
          )
        : [],
    [debouncedQuery, keywords],
  );

  return (
    <>
      <Spacer height={8} />

      <ChipWrapper>
        {selectedKeywords.map((keyword) => (
          <Chips
            style={{ margin: '2px 5px' }}
            key={generate()}
            primary
            onClick={() => onRemove(keyword)}
            icon={
              <Icon
                color="--icon-skillbadge-brand-primary-selected"
                name="close_m"
                size={20}
              />
            }
          >
            {keyword}
          </Chips>
        ))}
      </ChipWrapper>

      <Spacer height={8} />

      <Dropdown
        options={results}
        stickyFooterOptions={footer}
        isOpen={!!results.length}
        placement="bottom-start"
        onSelectOption={({ value }) => {
          if (value !== 'add-current-value') {
            onAdd(value);
          }
        }}
      >
        {({ inputProps, inputRef }) => (
          <TextField
            {...inputProps}
            ref={inputRef}
            value={query}
            placeholder="Search for keywords or type your own and hit enter..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && query) {
                onAdd(query);
              }
            }}
            leftIcon={
              <Icon
                name="search_m"
                size={24}
                color="--icon-input-neutral-default"
              />
            }
          />
        )}
      </Dropdown>

      <Spacer height={16} />

      <TSpan
        font="body-m-bold"
        colorToken="--text-card-header-neutral-highlighted"
      >
        Suggested Keywords
      </TSpan>

      <Spacer height={8} />

      <ChipWrapper>
        {suggestions.map((keyword) => (
          <Chips
            style={{ margin: '2px 5px' }}
            key={generate()}
            secondary
            onClick={() => onAdd(keyword)}
          >
            {keyword}
          </Chips>
        ))}
      </ChipWrapper>
    </>
  );
}
