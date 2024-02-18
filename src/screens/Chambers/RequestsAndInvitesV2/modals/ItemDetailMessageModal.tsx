import { type IModal } from '@/components/ExtendedModal';
import { type FC } from 'react';
import { t } from 'i18next';
import { BottomSheet } from '@/components/BottomSheet';
import { Icon, TSpan } from '@/components';
import { Spacer } from '@/layout';
import {
  StyledBottomSheetCloseButton,
  StyledBottomSheetHeader,
  StyledSeparator,
} from './styles';

const ItemDetailMessageModal: FC<IModal> = (props) => {
  const { open, children, onClose } = props;
  return (
    <BottomSheet open={open} usePortal>
      <StyledBottomSheetCloseButton
        size="small"
        tertiary
        icon={
          <Icon
            name="close_m"
            size={24}
            color="--icon-button-neutral-default"
          />
        }
        onClick={onClose}
      />
      <StyledBottomSheetHeader fullWidth padding={8}>
        <TSpan
          font="body-xl-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          {t(`noumena.noums.requests_or_invites.detail.modal.message`)}
        </TSpan>
      </StyledBottomSheetHeader>
      <Spacer height={16} />
      {children}
      <StyledSeparator />
    </BottomSheet>
  );
};
export default ItemDetailMessageModal;
