import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';

import { MemberPicker } from './MemberPicker';
import type { AddMemberModalProps } from './types';

export const AddMemberModal = ({
  type,
  btnLabel,
  onChange,
  chamberId,
  modalTitle,
  isShowModal,
  initialData = [],
  onClose: onCloseModal,
  testId = 'add-member-modal',
  ...props
}: AddMemberModalProps) => {
  const { isMobile } = useBreakpoints();

  return (
    <Modal
      style={{ maxWidth: '80%', minHeight: '250px' }}
      disableBackdropClick
      isScrollableContent={true}
      disableEscapeKeyDown={false}
      isFullScreen={isMobile}
      onClose={onCloseModal}
      testId={testId}
      open={isShowModal}
      enableCloseButton
      size={ModalSize.XL}
    >
      <ModalHeader topPadding={0} bottomPadding={12}>
        {modalTitle}
      </ModalHeader>
      <ModalBody overflow="visible" maxHeight="95%">
        <MemberPicker
          type={type}
          btnLabel={btnLabel}
          chamberId={chamberId}
          onBtnClick={onCloseModal}
          initialData={initialData}
          onChange={onChange}
          {...props}
        />
      </ModalBody>
    </Modal>
  );
};
