import React from 'react';
import { Stack } from '@/layout';
import { Icon } from '../Icon';
import { Radiobox } from '../Radiobox';
import S from './styles';
import { type OptionSelectorSize } from './types';

interface OptionSelectorItemProps {
  label: string;
  size: OptionSelectorSize;
  isSelected: boolean;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  footerElement?: React.ReactElement;
  onClick?(): void;
}

function OptionSelectorItem({
  size,
  label,
  isSelected,
  leftElement,
  rightElement,
  footerElement,
  onClick,
}: OptionSelectorItemProps) {
  return (
    <Stack vertical gap={16} grow align="stretch">
      <S.Container size={size} isSelected={isSelected} onClick={onClick}>
        <Radiobox
          isChecked={isSelected}
          icon={
            isSelected ? (
              <Icon
                name="radio_btn_m"
                size={12}
                color="--icon-radiobutton-brand-primary-default"
              />
            ) : undefined
          }
        />
        {leftElement && <S.SideElement>{leftElement}</S.SideElement>}
        <S.Label isSelected={isSelected}>{label}</S.Label>
        {rightElement && <S.SideElement>{rightElement}</S.SideElement>}
      </S.Container>
      {footerElement}
    </Stack>
  );
}

export default OptionSelectorItem;
