import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spacer, Stack } from '@/layout';
import { type DropdownValueType } from '@/components/Dropdown';
import { Radiobox } from '@/components/Radiobox';
import { t } from 'i18next';
import {
  PostVisibility,
  SortOperator,
  type UserOutput,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import { capitalizeAllWord } from '@/utils/strings';
import { getFullName } from '@/utils/fullName';

import { Checkbox } from '@/components/Checkbox';
import { Avatar } from '@/components/Avatar/Avatar';
import { UserUtil } from '@/utils/user';
import {
  OrderOptions,
  VisibilityOptions,
} from '../Chamber/components/elements/PostElement/modals/FilterPost/constants';
import { usePostElement } from '../Chamber/components/elements/PostElement/PostElementProvider';
import { type FilterType } from '../Chamber/components/elements/PostElement/types';
import { type PostMobileActionModalProps } from './types';

const MobilePostFilter: React.FC<PostMobileActionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    setShowFilter,
    setFilter: setPostFilter,
    filter,
    isMasterNoum,
    authorFilterOptions: authorOptions,
  } = usePostElement();
  const [isChanged, setIsChanged] = useState(false);
  const [changedView, setChangedView] = useState('');
  const [order, setOrder] = useState<SortOperator>(SortOperator.Desc);
  const [visibility, setVisibility] = useState<PostVisibility[]>([
    PostVisibility.Connection,
  ]);
  const [filterAuthors, setFilterAuthors] = useState<
    DropdownValueType<UserOutput>[]
  >([]);

  useEffect(() => {
    if (authorOptions.length > 0) {
      setFilterAuthors(authorOptions as DropdownValueType<UserOutput>[]);
    }
  }, [authorOptions]);

  const closeModal = useCallback(() => {
    setShowFilter(false);
    setIsChanged(false);
    setChangedView('');
    onClose();
  }, [onClose, setShowFilter]);

  const onSelectOrder = useCallback(
    (op) => {
      if (!isChanged) setIsChanged(true);
      setOrder(op.value);
    },
    [isChanged],
  );

  const onSelectMember = useCallback(
    (op) => {
      if (!isChanged) setIsChanged(true);
      const found = visibility.find((item) => item === op.value);
      if (found) {
        setVisibility(visibility.filter((item) => item !== op.value));
      } else {
        setVisibility([...visibility, op.value]);
      }
    },
    [isChanged, visibility],
  );

  const onSelectAuthor = useCallback(
    (op) => {
      if (!isChanged) setIsChanged(true);
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
    },
    [filterAuthors, isChanged],
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

  const authorValue = useMemo(() => {
    if (authorOptions.length === filterAuthors.length)
      return t('noumena.search.filter_all');
    return filterAuthors
      .map((faItem) =>
        getFullName(
          faItem.value.firstName,
          faItem.value.middleName,
          faItem.value.lastName,
        ),
      )
      .join(', ');
  }, [authorOptions.length, filterAuthors]);

  const applyFilters = useCallback(() => {
    const tmpFilter: FilterType = {};
    if (authorOptions.length === filterAuthors.length) {
      tmpFilter.filter = { visibility };
    } else if (filterAuthors.length > 0) {
      tmpFilter.filter = {
        uids: filterAuthors.map((faItem) => faItem.key),
        visibility,
      };
    } else {
      tmpFilter.filter = {
        uids: [],
        visibility,
      };
    }

    tmpFilter.sort = {
      column: 'createdAt',
      operator: order,
    };

    setPostFilter(tmpFilter);
    setIsChanged(false);
    setChangedView('');
    onClose();
  }, [filterAuthors, order, setPostFilter, onClose, authorOptions, visibility]);

  useEffect(() => {
    if (!filter) return;
    setVisibility(
      cleanList(filter.filter?.visibility) || [PostVisibility.Connection],
    );
    setOrder(filter.sort?.operator || SortOperator.Desc);
  }, [filter, authorOptions]);

  const isActive = (option: DropdownValueType<string | UserOutput, string>) =>
    filterAuthors.some((faItem) => faItem.key === option.key);

  return (
    <Modal
      open={isOpen}
      isFullScreen
      enableCloseButton
      testId="chamber-filter"
      onClose={closeModal}
      disableBackdropClick
      customCloseButton={
        <>
          {changedView ? (
            <Stack padding="0 16px" onClick={() => setChangedView('')}>
              <Icon name="arrow_left_m" size={24} />
            </Stack>
          ) : (
            <Stack padding="0 16px" onClick={closeModal}>
              <Icon name="close_m" size={24} />
            </Stack>
          )}
        </>
      }
    >
      <ModalHeader isFullScreen justifyContent="flex-start">
        {changedView === 'Show Posts for'
          ? t('noumena.editor.post_visibility')
          : changedView === 'Show Posts for'
          ? t('noumena.editor.post_author')
          : t(`noumena.chambers.filter_modal_title`)}
      </ModalHeader>
      <ModalBody maxHeight="unset">
        {changedView === 'Show Posts for' ? (
          <>
            {VisibilityOptions.map((item) => (
              <Fragment key={item.key}>
                <Stack
                  gap={16}
                  onClick={() => onSelectMember(item)}
                  padding="20px 0"
                  borderBottom
                  fullWidth
                  justify="space-between"
                >
                  <TSpan
                    font="body-l"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {item.label?.toString()}
                  </TSpan>
                  <Checkbox
                    onChange={() => onSelectMember(item)}
                    icon={
                      <Icon
                        name="tick_m"
                        size={visibility.includes(item.value) ? 24 : 0}
                        color="--icon-checkbox-neutral-alt-default"
                      />
                    }
                    isChecked={visibility.includes(item.value)}
                  />
                </Stack>
              </Fragment>
            ))}
          </>
        ) : changedView === 'Authors' ? (
          <>
            {authorOptions.map((item) => (
              <Fragment key={item.key}>
                <Stack
                  gap={16}
                  onClick={() => onSelectAuthor(item)}
                  padding="20px 0"
                  borderBottom
                  fullWidth
                  justify="space-between"
                >
                  <Stack gap={16}>
                    {typeof item.value !== 'string' && (
                      <Avatar
                        url={UserUtil.getProfilePicture(item.value)}
                        size="M"
                      />
                    )}
                    <TSpan
                      font="body-l"
                      colorToken="--text-tablecell-header-neutral-highlighted"
                    >
                      {item.label?.toString()}
                    </TSpan>
                  </Stack>
                  <Checkbox
                    onChange={() => onSelectAuthor(item)}
                    icon={
                      <Icon
                        name="tick_m"
                        size={isActive(item) ? 24 : 0}
                        color="--icon-checkbox-neutral-alt-default"
                      />
                    }
                    isChecked={isActive(item)}
                  />
                </Stack>
              </Fragment>
            ))}
          </>
        ) : (
          <>
            <TSpan
              font="body-l-bold"
              colorToken="--text-body-header-neutral-default"
            >
              {t('noumena.chambers.sorting')}
            </TSpan>
            <Spacer height={16} />
            {OrderOptions.map((item) => (
              <Stack fullWidth key={item.key}>
                <Stack
                  gap={16}
                  onClick={() => onSelectOrder(item)}
                  padding="13px 0"
                  borderBottom
                  fullWidth
                >
                  <Radiobox
                    isChecked={item.label === orderValue}
                    icon={
                      <Icon
                        name="radio_btn_m"
                        size={item.label === orderValue ? 12 : 0}
                        color={
                          item.label === orderValue
                            ? '--icon-radiobutton-brand-primary-default'
                            : '--icon-radiobutton-inactive-default'
                        }
                      />
                    }
                  />
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {item.label?.toString()}
                  </TSpan>
                </Stack>
              </Stack>
            ))}
            <Spacer height={24} />
            <>
              <TSpan
                font="body-l-bold"
                colorToken="--text-body-header-neutral-default"
              >
                {t('noumena.editor.post_filtering')}
              </TSpan>
              <Spacer height={16} />
              <Stack
                justify="space-between"
                fullWidth
                borderBottom
                padding="13px 0px"
                align="center"
                onClick={() => setChangedView('Show Posts for')}
              >
                <Stack vertical gap={4}>
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {t('noumena.editor.post_visibility')}
                  </TSpan>
                  <TSpan colorToken="--text-tablecell-body-neutral-default">
                    {visibilityValue}
                  </TSpan>
                </Stack>
                <Icon name="chevron_right_m" size={12} />
              </Stack>
              {!isMasterNoum && (
                <Stack
                  justify="space-between"
                  fullWidth
                  borderBottom
                  padding="13px 0px"
                  align="center"
                  onClick={() => setChangedView('Authors')}
                >
                  <Stack vertical gap={4}>
                    <TSpan
                      font="body-m-bold"
                      colorToken="--text-tablecell-header-neutral-highlighted"
                    >
                      {t('noumena.editor.post_author')}
                    </TSpan>
                    <TSpan colorToken="--text-tablecell-body-neutral-default">
                      {authorValue}
                    </TSpan>
                  </Stack>
                  <Icon name="chevron_right_m" size={12} />
                </Stack>
              )}
            </>
          </>
        )}
      </ModalBody>
      <ModalFooter justifyContent="center">
        {isChanged ? (
          <Button
            testId="chamber-filter-apply-button"
            onClick={() => applyFilters()}
            primary
            size="full"
          >
            {t(`noumena.editor.post_filter_save`)}
          </Button>
        ) : (
          <Button
            testId="chamber-filter-cancel-button"
            size="full"
            primary
            onClick={closeModal}
          >
            {t(`noumena.editor.post_filter_close`)}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default MobilePostFilter;
