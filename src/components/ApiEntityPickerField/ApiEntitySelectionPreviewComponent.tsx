import { Icon } from '@/components/Icon';
import Tooltip, { TooltipMessage } from '../Tooltip';
import { TSpan } from '../Typography/Typography';
import {
  SelectedItem,
  SelectedItemHeader,
  SelectedRightColumn,
  StyledColumn,
} from './styles';
import { type ApiEntitySelectionPreviewComponentProps } from './types';

export function ApiEntitySelectionPreviewComponent<
  Key extends string,
  Data extends unknown = Key,
>({
  selectedOption,
  fullWidth,
  selectedRightSideOption,
  disabled,
  inputSize,
  softDisabled,
  softDisabledReason,
  bold = true,
  clearButtonDisabled,
  onClear,
  onChange,
}: ApiEntitySelectionPreviewComponentProps<Key, Data>) {
  if (!selectedOption) {
    return null;
  }

  const shouldDisplayRightIcon = !disabled || softDisabled;
  const rightIconColor = softDisabled
    ? '--icon-input-neutral-disabled'
    : '--icon-input-neutral-default';

  return (
    <SelectedItem $fullWidth={fullWidth}>
      <SelectedItemHeader $inputSize={inputSize}>
        {selectedOption.icon}
        <StyledColumn>
          <TSpan
            font={bold ? 'body-l-bold' : 'body-l'}
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {selectedOption.label}
          </TSpan>
          <TSpan colorToken="--text-tablecell-body-neutral-default">
            {selectedOption.description}
          </TSpan>
        </StyledColumn>
        <SelectedRightColumn>
          {selectedRightSideOption}
          {shouldDisplayRightIcon &&
            (softDisabledReason ? (
              <Tooltip
                icon={inputSize === 'small' ? 'close_s' : 'close_m'}
                iconSize={24}
                iconColor={rightIconColor}
                top={30}
                left={20}
                onClick={() => {}}
              >
                <TooltipMessage>{softDisabledReason}</TooltipMessage>
              </Tooltip>
            ) : !clearButtonDisabled ? (
              <Icon
                name={inputSize === 'small' ? 'close_s' : 'close_m'}
                size={24}
                onClick={() => {
                  onChange(undefined);
                  onClear?.();
                }}
                color={rightIconColor}
              />
            ) : null)}
        </SelectedRightColumn>
      </SelectedItemHeader>
    </SelectedItem>
  );
}
