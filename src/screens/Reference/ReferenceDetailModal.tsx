import { useMemo } from 'react';
import { Modal, ModalHeader } from '@/components/ExtendedModal';
import { useWindowDimensions } from '@/hooks/dimensions';
import { Spacer } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { RichTextEditorView } from '@/features/richTextEditor';
import { StyledRichEditor, StyledImage } from './styles';
import { type ReferenceDetailModalProps } from './types';

const ReferenceDetailModal = ({
  experienceTitle,
  experienceDetail,
  onClose,
  isOpen,
  imageUrl,
}: ReferenceDetailModalProps) => {
  const { width } = useWindowDimensions();
  const isDesktop = useMemo(() => width >= breakpoints.LAPTOP, [width]);
  const isTablet = useMemo(
    () => width >= breakpoints.TABLET && width < breakpoints.LAPTOP,
    [width],
  );
  const isMobile = useMemo(() => width < breakpoints.TABLET, [width]);

  return (
    <Modal
      isFullScreen={isMobile || isTablet}
      enableCloseButton
      open={isOpen}
      onClose={onClose}
      testId="add_experience_modal"
      style={{
        width: isDesktop || isTablet ? '752px' : '375px',
      }}
      disableBackdropClick
    >
      <ModalHeader isFullScreen={isMobile || isTablet}>
        {experienceTitle}
      </ModalHeader>
      <Spacer height={16} />
      <StyledRichEditor>
        <RichTextEditorView
          data-testid="RichTextEditorView"
          html={experienceDetail}
        />
        {imageUrl?.length ? <StyledImage src={imageUrl} /> : undefined}
      </StyledRichEditor>
    </Modal>
  );
};

export default ReferenceDetailModal;
