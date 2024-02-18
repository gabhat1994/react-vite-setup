import * as EM from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { type DropdownValueType } from '@/components/Dropdown';
import { DataGrid } from '@/components/DataGrid';
import { MultiselectField } from '@/components/MultiselectField';
import { Button } from '@/components/Button/Button';
import { type CampaignFilters } from './types';
import * as S from './styles';

type Props = {
  dropDownOptions: DropdownValueType<string, string>[];
} & Pick<EM.IModal, 'open' | 'onClose'>;

export function StatusFilter({ open, onClose, dropDownOptions }: Props) {
  return (
    <EM.Modal open={open} isFullScreen forceHideCloseButton>
      <Spacer height={40} />
      <EM.ModalHeader>
        <S.Heading>Status</S.Heading>
      </EM.ModalHeader>
      <S.StyledModalBody>
        <Spacer height={16} />
        <DataGrid.FilterInput<CampaignFilters, 'status'>
          name="status"
          render={({ field: { value, onChange } }) => (
            <MultiselectField<string, string>
              inputSize="small"
              value={value}
              options={dropDownOptions}
              label="Status"
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
