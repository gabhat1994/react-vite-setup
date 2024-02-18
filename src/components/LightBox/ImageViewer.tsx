import React, {
  useState,
  useEffect,
  createRef,
  type CSSProperties,
  useMemo,
} from 'react';
import { Trans } from 'react-i18next';
import { Modal, ModalCloseButton } from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { type ImageViewerProps } from './types';
import {
  getXYTouch,
  getXYGeneric,
  getCoordinatesOnDoubleClick,
} from './helper';
import { DEFAULT_ZOOM_STEP } from './constants';
import { Content, Image, ModalHeaderAddOnContainer } from './styles';

let initX = 0;
let initY = 0;
let lastX = 0;
let lastY = 0;

const resetInitCoordinates = () => {
  initX = 0;
  initY = 0;
  lastX = 0;
  lastY = 0;
};

const ImageViewer = (props: ImageViewerProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const [loading, setLoading] = useState(true);
  const [moving, setMoving] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [translationX, setTranslationX] = useState(0);
  const [translationY, setTranslationY] = useState(0);
  const [enableClose, setEnableClose] = useState(false);
  const windowSize = useWindowDimensions();
  const isMobile = windowSize.width < breakpoints.TABLET;

  useEffect(() => {
    setLoading(false);
    resetZoom();
    resetInitCoordinates();
  }, [props.url]);

  useEffect(() => {
    resetZoom();
    resetInitCoordinates();
  }, [props.isOpen]);

  const startMove = (e: React.MouseEvent) => {
    if (zoom <= 1) return false;
    setMoving(true);
    const xy = getXYGeneric(e);
    initX = xy.x - lastX;
    initY = xy.y - lastY;
    return true;
  };

  const startTouchMove = (e: React.TouchEvent) => {
    if (zoom <= 1) return false;
    setMoving(true);
    const xy = getXYTouch(e);
    initX = xy.x - lastX;
    initY = xy.y - lastY;
    return true;
  };

  const duringMove = (e: React.MouseEvent) => {
    if (!moving) return false;
    const xy = getXYGeneric(e);
    lastX = xy.x - initX;
    lastY = xy.y - initY;
    setTranslationX(xy.x - initX);
    setTranslationY(xy.y - initY);
    return true;
  };

  const duringTouchMove = (e: React.TouchEvent) => {
    if (!moving) return false;
    const xy = getXYTouch(e);
    lastX = xy.x - initX;
    lastY = xy.y - initY;
    setTranslationX(xy.x - initX);
    setTranslationY(xy.y - initY);
    return true;
  };

  const endMove = () => setMoving(false);
  const stopSideEffect = (e: React.MouseEvent<Element, MouseEvent>) =>
    e.stopPropagation();

  const resetZoom = () => {
    resetInitCoordinates();
    setTranslationX(0);
    setTranslationY(0);
    setZoom(1);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    stopSideEffect(e);
    if (zoom > 1) return resetZoom();

    const { x, y, z } = getCoordinatesOnDoubleClick(e, containerRef);

    setTranslationX(x);
    setTranslationY(y);
    lastX = x;
    lastY = y;
    setZoom(z);
    return true;
  };

  const applyZoom = (type: string) => {
    const zoomStep = DEFAULT_ZOOM_STEP;
    switch (type) {
      case 'in':
        setZoom(zoom + zoomStep);
        break;
      case 'out':
        {
          const newZoom = zoom - zoomStep;
          if (newZoom < 1) break;
          else if (newZoom === 1) resetZoom();
          else setZoom(newZoom);
        }
        break;
      case 'reset':
        resetZoom();
        break;
    }
  };

  const ActionButtons = () => (
    <>
      <ModalHeaderAddOnContainer data-testid="modalHeaderAddonButtons">
        <Button
          tertiary
          size="small"
          onClick={() => applyZoom('in')}
          testId="zoomin-button"
        >
          <Trans i18nKey="noumena.component.lightbox.button.zoomin" />
        </Button>
        <Button
          tertiary
          size="small"
          onClick={() => applyZoom('out')}
          testId="zoomout-button"
        >
          <Trans i18nKey="noumena.component.lightbox.button.zoomout" />
        </Button>
        <Button tertiary size="small" onClick={resetZoom} testId="reset-button">
          <Trans i18nKey="noumena.component.lightbox.button.reset" />
        </Button>
      </ModalHeaderAddOnContainer>
      {enableClose && (
        <ModalCloseButton
          top={32}
          horizontal={isMobile ? 16 : 40}
          enforceRight
          onClose={props.handleClose}
          defaultBtnForMobile
        />
      )}
    </>
  );

  const style = useMemo<CSSProperties>(
    () =>
      ({
        transform: `translate3d(${translationX}px,${translationY}px,0px) scale(${zoom}) rotate(0deg)`,
        cursor: zoom > 1 ? 'grab' : 'unset',
        transition: moving ? 'none' : 'all 0.1s',
        padding: 0,
      } as CSSProperties),
    [moving, translationX, translationY, zoom],
  );

  return (
    <>
      <Modal
        isFullScreen={false}
        testId="light-box"
        open={props.isOpen}
        onClose={props.handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        targetRef={containerRef}
        overlayVariant="dark"
        noPaddingNoBorder
        style={style}
        modalHeaderAddonButtons={<ActionButtons />}
      >
        <Content data-testid="modal-content-lightbox">
          {loading ? (
            <Spinner />
          ) : (
            <Image
              src={props.url}
              data-testid="light-box-image-testid"
              alt="imagePreview"
              draggable="false"
              onMouseDown={startMove}
              onTouchStart={startTouchMove}
              onMouseMove={duringMove}
              onTouchMove={duringTouchMove}
              onMouseUp={endMove}
              onMouseLeave={endMove}
              onTouchEnd={endMove}
              onClick={stopSideEffect}
              onDoubleClick={onDoubleClick}
              onPointerDown={startMove}
              onPointerMove={duringMove}
              onPointerUp={endMove}
              onPointerOut={endMove}
              onPointerCancel={endMove}
              onPointerLeave={endMove}
              onLoadStart={() => {
                setLoading(true);
              }}
              onLoad={() => {
                setLoading(false);
                setEnableClose(true);
              }}
              onError={() => {
                props.setImageError(true);
              }}
            />
          )}
        </Content>
      </Modal>
    </>
  );
};

export default ImageViewer;
