import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';

type FileManagerEllipsisMenuType = {
  onDelete?: () => void;
  onEdit?: () => void;
  onPreview?: () => void;
  fileOwnerId?: string;
};

const FileManagerEllipsisMenu = ({
  onDelete,
  onEdit,
  onPreview,
  fileOwnerId,
}: FileManagerEllipsisMenuType) => {
  const { getFilePermissionByActionType } = useFileManagerElementContext();
  const hasEditFilePermission = getFilePermissionByActionType(
    'edit-file',
    fileOwnerId,
  );
  const hasDeleteFilePermission = getFilePermissionByActionType(
    'delete-file',
    fileOwnerId,
  );
  const { t } = useTranslation();

  const menuOptions = useMemo(() => {
    const arr: DropdownValueType<string>[] = [];
    if (onPreview)
      arr.push({
        label: t('noumena.file_manager.action_buttons.preview'),
        key: 'preview',
        type: 'value',
        value: 'preview',
        icon: (
          <Icon
            name="eye_on_m"
            size={16}
            color="--icon-tablecell-neutral-highlighted"
          />
        ),
      });
    if (onEdit && hasEditFilePermission)
      arr.push({
        label: t('noumena.file_manager.action_buttons.edit'),
        type: 'value',
        key: 'edit',
        value: 'edit',
        icon: (
          <Icon
            name="edit_m"
            size={16}
            color="--icon-tablecell-neutral-highlighted"
          />
        ),
      });
    if (onDelete && hasDeleteFilePermission)
      arr.push({
        label: t('noumena.file_manager.action_buttons.delete'),
        type: 'value',
        key: 'delete',
        value: 'delete',
        intent: 'danger',
        icon: (
          <Icon
            name="delete_m"
            size={16}
            color="--icon-tablecell-danger-primary-default"
          />
        ),
      });

    return arr;
  }, [
    onPreview,
    t,
    onEdit,
    hasEditFilePermission,
    onDelete,
    hasDeleteFilePermission,
  ]);

  const handleOnClick = (value?: string) => {
    switch (value) {
      case 'delete':
        onDelete?.();
        break;
      case 'edit':
        onEdit?.();
        break;
      case 'preview':
        onPreview?.();
        break;
      default:
        break;
    }
  };

  if (!menuOptions.length) return null;

  return (
    <EllipsisMenu
      containerWidth="125px"
      neutral
      onClick={handleOnClick}
      menuOptions={menuOptions}
      iconColorToken="--button-card-neutral-default"
    />
  );
};

export default FileManagerEllipsisMenu;
