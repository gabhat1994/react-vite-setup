import { Stack } from '@/layout';
import { Checkbox } from '@/components/Checkbox';
import { Icon, Spinner } from '@/components';
import { Separator } from '@/components/Separator/Separator';
import { useFileManagerElementContext } from '@/screens/Chamber/components/elements/FileManagerElement/providers/FileManagerElementProvider';
import S from './styles';

type RoleListProps = {
  maxFilesToDisplay?: number;
  handleCheckboxChange: (roleId: string, value: boolean) => void;
  selectedRoleIds: string[];
};

const RoleList: React.FC<RoleListProps> = ({
  handleCheckboxChange,
  selectedRoleIds,
}) => {
  const { noumFileRoleOptions: roleOptions, loadingNoumRoles: loading } =
    useFileManagerElementContext();

  return (
    <Stack fullWidth vertical>
      {loading && roleOptions.length === 0 ? (
        <Spinner />
      ) : (
        roleOptions.map((roleOption) => (
          <Stack key={roleOption._id} vertical fullWidth>
            <S.CheckBoxWrapper>
              <Checkbox
                isChecked={selectedRoleIds.includes(roleOption._id)}
                icon={
                  <Icon
                    name="tick_m"
                    size={20}
                    color="--icon-checkbox-neutral-alt-default"
                  />
                }
                onChange={(value) =>
                  handleCheckboxChange(roleOption._id, value)
                }
              />
              <S.CheckBoxLabel>{roleOption.name}</S.CheckBoxLabel>
            </S.CheckBoxWrapper>
            <Separator fullWidth noMargin />
          </Stack>
        ))
      )}
    </Stack>
  );
};

export default RoleList;
