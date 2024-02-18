import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import {
  IDPickerContainer,
  IDPickerLeft,
  IDPickerIcon,
  IDPickerContent,
  Chevrolet,
} from './styles';

type PickerProps = {
  variant: 'primary' | 'success';
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
};

export const Picker = ({
  variant,
  isOpen,
  onToggle,
  isMobile,
}: PickerProps) => (
  <IDPickerContainer>
    <IDPickerLeft
      align={isMobile ? undefined : 'center'}
      justify={isMobile ? 'center' : undefined}
      gap={isMobile ? '10px' : '16px'}
      vertical={isMobile}
    >
      <IDPickerIcon isSuccess={variant === 'success'}>
        <Icon
          name={variant === 'primary' ? 'id_card_m' : 'tick_m'}
          size={26}
          color={
            variant === 'primary'
              ? '--icon-iconbox-brand-primary-default'
              : '--icon-iconbox-success-primary-default'
          }
        />
      </IDPickerIcon>
      <IDPickerContent gap={isMobile ? undefined : '4px'}>
        <TSpan font="body-l" colorToken="--text-card-neutral-highlighted">
          Government-issued ID Document
        </TSpan>
        <TSpan font="footnote" colorToken="--text-card-neutral-default">
          Upload 1 of the 3 types of required documents
        </TSpan>
      </IDPickerContent>
    </IDPickerLeft>
    {variant === 'primary' ? (
      <Chevrolet
        name="chevron_down_m"
        isOpen={isOpen}
        size={14}
        onClick={onToggle}
        color="--icon_card-neutral-highlighted"
      />
    ) : (
      <Icon
        onClick={onToggle}
        name="edit_m"
        size={24}
        color="--icon_card-neutral-highlighted"
      />
    )}
  </IDPickerContainer>
);
