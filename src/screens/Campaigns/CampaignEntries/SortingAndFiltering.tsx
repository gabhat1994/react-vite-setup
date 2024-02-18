import { useState } from 'react';
import * as EM from '@/components/ExtendedModal';
import { Spacer, Stack } from '@/layout';
import { Radiobox } from '@/components/Radiobox';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button/Button';
import * as S from './styles';

type Props = {
  filters: {
    key: string;
    label: string;
    value: string;
    onClick: () => void;
  }[];
} & Pick<EM.IModal, 'open' | 'onClose'>;

const statusSorting = [
  {
    id: '1',
    label: 'Created: Newest to Oldest',
    selected: false,
  },
  {
    id: '2',
    label: 'Created: Oldest to Newest',
    selected: false,
  },
];

interface SortingProps {
  selected: boolean;
  onSelect: () => void;
  label: string;
}

function Sorting({ selected, onSelect, label }: SortingProps) {
  return (
    <S.SortingRow onClick={onSelect}>
      <Radiobox
        isChecked={selected}
        icon={
          <Icon
            name="radio_btn_m"
            size={selected ? 12 : 0}
            color={
              selected
                ? '--icon-radiobutton-brand-primary-default'
                : '--icon-radiobutton-inactive-default'
            }
          />
        }
      />
      <S.SortingLabel>{label}</S.SortingLabel>
    </S.SortingRow>
  );
}

export function SortingAndFiltering({ open, onClose, filters }: Props) {
  const [selectedItem, setSelectedItem] = useState('1');

  return (
    <EM.Modal open={open} onClose={onClose} isFullScreen>
      <EM.ModalHeader>
        <S.Heading>Sorting and Filtering</S.Heading>
      </EM.ModalHeader>
      <S.StyledModalBody>
        <S.SubHeading>Sorting</S.SubHeading>
        <Spacer height={16} />
        {statusSorting.map((_data) => (
          <Sorting
            key={_data.id}
            label={_data.label}
            selected={_data.id === selectedItem}
            onSelect={() => setSelectedItem(_data.id)}
          />
        ))}
        <Spacer height={24} />
        <S.SubHeading>Filtering</S.SubHeading>
        <Spacer height={24} />
        {filters.map((filter) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            style={{ width: '100%' }}
            key={filter.key}
            onClick={filter.onClick}
          >
            <Stack fullWidth justify="space-between" maxWidth="100%">
              <Stack vertical maxWidth="90%">
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-tablecell-header-neutral-highlighted"
                >
                  {filter.label}
                </TSpan>
                <S.FilterValue>{filter.value}</S.FilterValue>
              </Stack>
              <Icon name="chevron_small_right_m" size={24} />
            </Stack>
            <Spacer height={16} />
          </div>
        ))}
      </S.StyledModalBody>
      <EM.ModalFooter justifyContent="center">
        <Button style={{ width: '100%' }} primary onClick={onClose}>
          Close
        </Button>
      </EM.ModalFooter>
    </EM.Modal>
  );
}
