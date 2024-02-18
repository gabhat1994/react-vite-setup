import * as EM from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { type DropdownValueType } from '@/components/Dropdown';
import { DataGrid } from '@/components/DataGrid';
import { MultiselectField } from '@/components/MultiselectField';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon';
import { type CampaignFilters } from './types';
import * as S from './styles';

type Props = {
  dropDownOptions: DropdownValueType<string, string>[];
  title: 'Noum' | 'Status';
} & Pick<EM.IModal, 'open' | 'onClose'>;

export function NoumFilter({ open, onClose, dropDownOptions, title }: Props) {
  return (
    <EM.Modal open={open} forceHideCloseButton onClose={onClose} isFullScreen>
      <Spacer height={40} />
      <EM.ModalHeader>
        <S.Heading>{title}</S.Heading>
      </EM.ModalHeader>
      <S.StyledModalBody>
        <Spacer height={16} />
        <DataGrid.FilterInput<CampaignFilters, 'noums'>
          name="noums"
          render={({ field: { value, onChange } }) => (
            <MultiselectField<string, string>
              leftIcon={
                <Icon
                  name="search_m"
                  size={20}
                  color="--icon-input-neutral-default"
                />
              }
              inputSize="small"
              value={value}
              options={dropDownOptions}
              label="Noums"
              onChange={onChange}
              isOpen
            />
          )}
        />
      </S.StyledModalBody>
      <EM.ModalFooter justifyContent="center">
        <Button style={{ width: '100%' }} primary onClick={onClose}>
          Save Filter
        </Button>
      </EM.ModalFooter>
    </EM.Modal>
  );
}
