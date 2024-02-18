import { useMemo, useState } from 'react';
import {
  type SpaceOutputFragment,
  useGetOwnProjectChambersQuery,
} from '@/apollo/graphql';
import { type DropdownItemType } from '@/components/Dropdown';
import { cleanList } from '@/utils/list';
import { Avatar } from '@/components/Avatar/Avatar';
import {
  type ProjectChamberType,
  SortOperator,
  SpaceStatusEnum,
} from '@/apollo/generated/types';
import {
  ApiEntityPickerFieldWithRemoteSearch,
  type ApiEntityPickerFieldProps,
} from '@/components/ApiEntityPickerField';
import { Spinner } from '@/components/Spinner';
import { type Maybe } from '@/common/types';
import { TSpan } from '@/components/Typography';
import { projectTypeLabelMap } from '@/constants/projectTypeOptions';
import { Icon } from '@/components/Icon';
import S from './styles';

type ProjectNoumSelectorProps = Omit<
  ApiEntityPickerFieldProps<string>,
  'options' | 'onChange' | 'children'
> & {
  onChange: (value: string | undefined) => void;
  preselectedItem?: Maybe<
    Pick<SpaceOutputFragment, 'name' | 'profileImage' | 'projectType' | '_id'>
  >;
};

export function ProjectNoumSelector({
  onChange,
  preselectedItem,
  ...apiEntityPickerFieldProps
}: ProjectNoumSelectorProps) {
  const [search, setSearch] = useState<string>();

  const { data, loading, fetchMore } = useGetOwnProjectChambersQuery({
    variables: {
      limit: 10,
      offset: 0,
      filter: {
        status: SpaceStatusEnum.Published,
        search,
      },
      sort: {
        column: 'name',
        operator: SortOperator.Asc,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const selectedItem = [
    ...(data?.getOwnProjectChambers?.data ?? []),
    preselectedItem,
  ].find((item) => item?._id === apiEntityPickerFieldProps.value);

  const projectTypeLabel =
    projectTypeLabelMap[selectedItem?.projectType as ProjectChamberType];

  const options = useMemo<DropdownItemType<string>[]>(
    () =>
      cleanList(data?.getOwnProjectChambers?.data).map((noum) => ({
        type: 'value',
        value: noum._id ?? '',
        key: noum._id ?? '',
        label: (
          <TSpan
            font="body-m-bold"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {noum.name ?? ''} ⋅{' '}
            <TSpan
              font="body-m"
              colorToken="--text-tablecell-header-neutral-default"
            >
              {projectTypeLabelMap[noum?.projectType as ProjectChamberType]}
            </TSpan>
          </TSpan>
        ),
        icon: <Avatar url={noum.profileImage} size="M" />,
      })),

    [data?.getOwnProjectChambers?.data],
  );

  const inputValue = selectedItem
    ? `${selectedItem.name} ${projectTypeLabel ? `⋅ ${projectTypeLabel}` : ''} `
    : '';

  return (
    <ApiEntityPickerFieldWithRemoteSearch
      {...apiEntityPickerFieldProps}
      onInputChange={setSearch}
      options={options}
      hideIcons={false}
      isLoading={loading}
      readOnly={!!apiEntityPickerFieldProps.value}
      value={apiEntityPickerFieldProps.value || undefined}
      maxContainerHeight="350px"
      onChange={(option) => onChange(option?.value)}
      inputValue={inputValue}
      leftIcon={
        selectedItem ? (
          <Avatar url={selectedItem.profileImage} size="M" />
        ) : undefined
      }
      onFetchMore={() =>
        fetchMore({
          variables: {
            offset: data?.getOwnProjectChambers?.data?.length ?? 0,
          },
        })
      }
      rightIcon={
        loading ? (
          <S.SpinnerContainer>
            <Spinner zIndex={50} />
          </S.SpinnerContainer>
        ) : apiEntityPickerFieldProps.value &&
          !apiEntityPickerFieldProps.disabled ? (
          <Icon
            onClick={() => {
              onChange(undefined);
              setSearch('');
            }}
            name="close_s"
            size={24}
            color="--icon-input-neutral-default"
          />
        ) : (
          <></>
        )
      }
    />
  );
}
