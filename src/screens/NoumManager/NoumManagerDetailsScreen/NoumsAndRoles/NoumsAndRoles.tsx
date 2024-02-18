import { Stack } from '@/layout';
import { TSpan } from '@/components';
import { DataGrid } from '@/components/DataGrid';
import { type Maybe } from '@/common/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { CardStyled } from '../styles';
import { NoumsAndRolesTable } from './NoumsAndRolesTable';

type NoumsAndRolesProps = {
  noum: Maybe<SpaceOutputFragment>;
};

export const NoumsAndRoles: React.FC<NoumsAndRolesProps> = ({ noum }) => (
  <CardStyled>
    <Stack vertical gap={16}>
      <Stack vertical gap={16}>
        <TSpan font="heading-xs-bold">Noums & Roles</TSpan>
      </Stack>

      <DataGrid.Provider<{ id: string }> data={[]}>
        <NoumsAndRolesTable
          noum={noum}
          onRowActionSelect={() => null}
          offset={0}
          onPaginationChange={() => null}
        />
      </DataGrid.Provider>
    </Stack>
  </CardStyled>
);
