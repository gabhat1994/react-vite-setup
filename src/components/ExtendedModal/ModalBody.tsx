import { ModalContext } from '@/components/ExtendedModal/ModalContext';
import useModalFullScreenMode from '@/hooks/modal/useModalFullScreenMode';
import { useContext, useEffect, useRef, useState } from 'react';
import { type CSSProperties } from 'styled-components';
import { type IModalBodyProps } from './types';
import { Spinner } from '../Spinner';
import { TSpan } from '../Typography';
import {
  ModalBodyStyled,
  ModalLoadingContainer,
  SpinnerContainer,
} from './styles';

export const ModalBody: React.FC<
  IModalBodyProps & { style?: CSSProperties }
> = (props) => {
  const { size } = useContext(ModalContext);
  const [hasScrollBar, setHasScrollBar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const defaultFullScreen = useModalFullScreenMode(size);

  const checkIsScrollbarPresent = () => {
    if (ref && ref.current) {
      setHasScrollBar(
        Math.round(ref.current?.scrollHeight) >
          Math.round(ref.current?.getBoundingClientRect().height),
      );
    }
  };

  useEffect(() => {
    checkIsScrollbarPresent();
    window.addEventListener('resize', checkIsScrollbarPresent);
    return () => window.removeEventListener('resize', checkIsScrollbarPresent);
  }, []);

  return (
    <>
      {props.loading && (
        <ModalLoadingContainer>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
          <TSpan colorToken="--text-modal-neutral-default" font="body-l">
            {props.loadingDescription || ''}
          </TSpan>
        </ModalLoadingContainer>
      )}
      <ModalBodyStyled
        {...props}
        hasScrollBar={hasScrollBar}
        ref={ref}
        isFullScreen={props.isFullScreen ?? defaultFullScreen}
      />
    </>
  );
};

export default ModalBody;
