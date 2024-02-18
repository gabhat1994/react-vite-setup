import { type NoumDropDownListFragment } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import { Stack } from '@/layout';
import DefaultImag from '@/assets/images/chamber_default.png';
import { NOUMCard } from './components/NoumCard';

export const mapDropDownList = (
  noumList: NoumDropDownListFragment[],
): DropdownValueType<NoumDropDownListFragment>[] =>
  noumList?.map((noum) => ({
    key: noum._id || '',
    label: (
      <Stack>
        <NOUMCard
          name={noum.name || ''}
          image={noum?.profileImage || DefaultImag}
          status={noum.projectType ?? undefined}
        />
      </Stack>
    ),
    type: 'value',
    value: { ...noum },
  })) || [];

export const filterNoums = (
  noums: DropdownValueType<NoumDropDownListFragment>[],
  query: string,
) =>
  noums.filter(({ value }) =>
    value.name?.toLowerCase().includes(query.toLowerCase()),
  );
