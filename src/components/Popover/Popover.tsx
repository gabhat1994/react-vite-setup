import { type FC, useRef } from 'react';
import { useClickOutside } from '@/hooks';
import useRefDimensions from '@/hooks/useRefDimensions';
import S from './styles';
import { type PopoverPosition } from './types';

interface RenderContentOptions {
  childDimensions: { width: number; height: number };
}

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  position: PopoverPosition;
  margin?: string;
  renderContent: (options: RenderContentOptions) => JSX.Element;
}

const Popover: FC<PopoverProps> = ({
  isOpen,
  children,
  position,
  margin,
  onClose,
  renderContent,
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useClickOutside(ref, true, onClose);

  const childDimensions = useRefDimensions(childRef);

  return (
    <S.Container ref={ref}>
      <div ref={childRef}>{children}</div>
      {isOpen && (
        <S.StyledMotionContainer
          layout
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          $position={position}
          ref={contentRef}
          $margin={margin}
        >
          {renderContent({ childDimensions })}
        </S.StyledMotionContainer>
      )}
    </S.Container>
  );
};

export const { BasicPopoverContent } = S;

export default Popover;
