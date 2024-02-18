import { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';

import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import {
  PostVisibility,
  SortOperator,
  type UserOutput,
} from '@/apollo/generated/types';
import { capitalizeAllWord } from '@/utils/strings';
import { Stack } from '@/layout';
import {
  OrderOptions,
  VisibilityOptions,
} from '../Chamber/components/elements/PostElement/modals/FilterPost/constants';
import { type FilterType } from '../Chamber/components/elements/PostElement/types';
import { usePostElement } from '../Chamber/components/elements/PostElement/PostElementProvider';
import AuthorOptionsRenderer from '../Chamber/components/elements/PostElement/modals/FilterPost/AuthorOptionsRenderer';
import VisibilityoptionsRenderer from '../Chamber/components/elements/PostElement/modals/FilterPost/VisibilityOptionsRenderer';

export const FilterPosts = () => {
  const {
    setFilter: setPostFilter,
    isMasterNoum,
    authorFilterOptions: authorOptions,
    setAuthorFilterKeyword: setKeyword,
  } = usePostElement();

  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isVisibilityOpen, setVisibilityOpen] = useState(false);
  const [isAuthorFilterOpen, setAuthorFilterOpen] = useState(false);
  const [order, setOrder] = useState<SortOperator>(SortOperator.Desc);
  const [visibility, setVisibility] = useState<PostVisibility[]>([
    PostVisibility.Connection,
    PostVisibility.Follower,
  ]);

  const [filterAuthors, setFilterAuthors] = useState<
    DropdownValueType<UserOutput>[]
  >([]);

  useEffect(() => {
    if (authorOptions.length > 0)
      setFilterAuthors(authorOptions as DropdownValueType<UserOutput>[]);
  }, [authorOptions]);

  const applyFilters = useCallback(
    (
      authorsArg: DropdownValueType<UserOutput | string>[],
      PostAuthorVisibilty,
    ) => {
      const tmpFilter: FilterType = {
        filter: { visibility: PostAuthorVisibilty },
      };
      if (authorsArg.length > 0) {
        if (authorsArg.length !== authorOptions.length) {
          tmpFilter.filter = {
            ...tmpFilter.filter,
            uids: authorsArg.map((item) => item.key),
          };
        }
      } else {
        tmpFilter.filter = {
          ...tmpFilter.filter,
          uids: [],
        };
      }
      setPostFilter(tmpFilter);
    },
    [authorOptions.length, setPostFilter],
  );

  const onSelectOrder = useCallback(
    (op) => {
      setOrder(op.value);
      const tmpFilter: FilterType = {};
      tmpFilter.sort = {
        column: 'createdAt',
        operator: op.value,
      };
      setPostFilter(tmpFilter);
    },
    [setPostFilter],
  );

  const onSelectMember = useCallback(
    (op) => {
      const found = visibility.find((item) => item === op.value);
      if (found) {
        const filterMember = visibility.filter((item) => item !== op.value);
        applyFilters(filterAuthors, filterMember);
        setVisibility(filterMember);
      } else {
        const addMember = [...visibility, op.value];
        applyFilters(filterAuthors, addMember);
        setVisibility(addMember);
      }
    },
    [applyFilters, filterAuthors, visibility],
  );

  const onSelectAuthor = useCallback(
    (op) => {
      const foundIndex = filterAuthors.findIndex(
        (authorItem) => authorItem.value._id === op?.value?._id,
      );

      const newFilterAuthors =
        foundIndex > -1
          ? filterAuthors.filter(
              (authorItem) => authorItem.value._id !== op?.value?._id,
            )
          : [...filterAuthors, op];

      setFilterAuthors(newFilterAuthors);
      applyFilters(newFilterAuthors, visibility);
    },
    [applyFilters, filterAuthors, visibility],
  );

  const orderValue = useMemo(
    () => OrderOptions.find((od) => od.value === order)?.label?.toString(),
    [order],
  );

  const visibilityValue = useMemo(() => {
    if (visibility.length === 2) {
      return 'All';
    }
    if (visibility.length === 0) {
      return 'Members';
    }
    return `${capitalizeAllWord(visibility[0])}s`;
  }, [visibility]);

  const authorValue = useMemo(
    () =>
      filterAuthors.length > 0 && filterAuthors.length === authorOptions.length
        ? t('noumena.search.filter_all')
        : filterAuthors.map((faItem) => faItem.label).join(', '),
    [authorOptions.length, filterAuthors],
  );

  const handleInputAuthor = useCallback(
    (e) => {
      setKeyword?.(e.target.value);
    },
    [setKeyword],
  );

  const handleAuthorFilterClose = () => {
    setKeyword?.('');
    setAuthorFilterOpen(false);
  };

  return (
    <Stack gap={16}>
      <Dropdown
        hideIcons={true}
        closeOnSelect
        placement="bottom-end"
        options={OrderOptions}
        onSelectOption={onSelectOrder}
        onOpen={() => setIsOrderOpen(true)}
        onClose={() => setIsOrderOpen(false)}
        isAnimation={false}
        observerMinHeight="0"
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            readOnly
            inputSize="small"
            ref={inputRef}
            {...inputProps}
            value={orderValue}
            label={t('noumena.post.filter.order_label')}
            spellCheck="false"
            rightIcon={
              isOrderOpen ? (
                <Icon
                  name="chevron_up_m"
                  size={16}
                  color="--icon-input-neutral-default"
                  onClick={toggle}
                />
              ) : (
                <Icon
                  name="chevron_down_m"
                  color="--icon-input-neutral-default"
                  size={16}
                  onClick={toggle}
                />
              )
            }
          />
        )}
      </Dropdown>
      <Dropdown
        multiselect
        closeOnSelect={false}
        hideIcons={true}
        placement="bottom-end"
        options={VisibilityOptions}
        onSelectOption={onSelectMember}
        onOpen={() => setVisibilityOpen(true)}
        onClose={() => setVisibilityOpen(false)}
        isAnimation={false}
        observerMinHeight="0"
        optionsRenderer={(options, handleSelectOption) => (
          <VisibilityoptionsRenderer
            handleSelectOption={handleSelectOption}
            options={options}
            activeItem={visibility}
          />
        )}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            inputSize="small"
            readOnly
            ref={inputRef}
            {...inputProps}
            value={visibilityValue}
            label={t('noumena.post.filter.visibility_label')}
            spellCheck="false"
            rightIcon={
              isVisibilityOpen ? (
                <Icon
                  name="chevron_up_m"
                  color="--icon-input-neutral-default"
                  size={16}
                  onClick={toggle}
                />
              ) : (
                <Icon
                  name="chevron_down_m"
                  color="--icon-input-neutral-default"
                  size={16}
                  onClick={toggle}
                />
              )
            }
          />
        )}
      </Dropdown>
      {!isMasterNoum && (
        <Dropdown
          multiselect
          hideIcons={false}
          placement="bottom-end"
          onOpen={() => setAuthorFilterOpen(true)}
          onClose={handleAuthorFilterClose}
          options={authorOptions}
          onSelectOption={onSelectAuthor}
          isAnimation={false}
          observerMinHeight="0"
          optionsRenderer={(options, handleSelectOption) => (
            <AuthorOptionsRenderer
              options={options}
              handleSelectOption={handleSelectOption}
              activeItemKeys={filterAuthors.map((faItem) => faItem.key)}
            />
          )}
        >
          {({ inputProps, inputRef, toggle }) => (
            <TextField
              inputSize="small"
              ref={inputRef}
              {...inputProps}
              value={authorValue}
              onChange={handleInputAuthor}
              label={t('noumena.post.filter.authors_label')}
              spellCheck="false"
              rightIcon={
                isAuthorFilterOpen ? (
                  <Icon
                    name="chevron_up_m"
                    size={16}
                    color="--icon-input-neutral-default"
                    onClick={toggle}
                  />
                ) : (
                  <Icon
                    name="chevron_down_m"
                    color="--icon-input-neutral-default"
                    size={16}
                    onClick={toggle}
                  />
                )
              }
            />
          )}
        </Dropdown>
      )}
    </Stack>
  );
};
