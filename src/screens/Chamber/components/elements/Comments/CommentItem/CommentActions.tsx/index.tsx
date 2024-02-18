import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { DeleteCommentModal } from '@/screens/Chamber/components/modals/DeleteCommentModal/DeleteCommentModal';
import { useToggle } from '@/hooks';
import { DropdownPicker, MoreIcon } from './styles';

type CommentActionsProps = {
  onHandleSelect: (val: DropdownValueType<string>) => void;
  type?: string;
};

const CommentActions = ({ onHandleSelect, type }: CommentActionsProps) => {
  const { t } = useTranslation();
  const [showDelete, toggleShowDelete] = useToggle(false);
  const [value, setValue] = useState<DropdownValueType<string>>();
  /*
  const Report: DropdownValueType<string> = {
    key: 'report-post',
    label: t('noumena.report'),
    type: 'value',
    value: 'Report',
    description: '',
    icon: <Icon name="report_m" size={24} />,
  };

  const Edit: DropdownValueType<string> = {
    key: 'edit-post',
    label: t('noumena.chamber.edit_button'),
    type: 'value',
    value: 'Edit',
    description: '',
    icon: <Icon name="edit_m" size={24} />,
  };
  */

  const Delete: DropdownValueType<string> = {
    key: 'delete-post',
    label: t('noumena.delete'),
    type: 'value',
    value: 'Delete',
    description: '',
    labelColor: '--text-tablecell-header-danger-primary-highlighted',
    icon: (
      <Icon
        name="delete_m"
        size={24}
        color="--icon-tablecell-danger-primary-default"
      />
    ),
  };
  const options: DropdownValueType<string>[] = [Delete];
  // const options: DropdownValueType<string>[] = [Report, Edit, Delete];

  return (
    <>
      <Dropdown
        data-testid="commentActions"
        closeOnSelect
        placement="bottom-end"
        options={options}
        containerWidth="121px"
        minHeight={`${50 * options.length}px`}
        onSelectOption={(opt) => {
          if (opt.value === 'Delete') {
            setValue(opt);
            toggleShowDelete();
          }
        }}
        usePortal={false}
        calRefTop={false}
        isAnimation={false}
        usePopStyle={true}
        observerMinHeight="0"
        padding="0px"
      >
        {({
          targetProps,
          targetRef,
          toggle,
        }: DropdownTargetProps<HTMLDivElement>) => (
          <DropdownPicker ref={targetRef} {...targetProps} onClick={toggle}>
            <MoreIcon
              name="more_m"
              size={24}
              color="--icon-card-neutral-default"
            />
          </DropdownPicker>
        )}
      </Dropdown>
      {showDelete && (
        <DeleteCommentModal
          confirmCallback={() => {
            onHandleSelect(value!);
            toggleShowDelete();
          }}
          cancelCallback={toggleShowDelete}
          isOpen={true}
          type={type}
        />
      )}
    </>
  );
};

export default CommentActions;
