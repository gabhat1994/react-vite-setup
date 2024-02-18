import { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Spacer } from '@/layout';
import LightBox from '@/components/LightBox';
import { ViewType } from '@/components/LightBox/types';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { ElementUtils } from '@/utils/element';
import { ElementResizable } from '@/components/ElementResizable';
import NoumLayoutToolWrapper from '../../ElementWrapper/NoumLayoutToolWrapper';
import { type ImageViewProps } from './types';
import UploadProgress from '../MediaElement/UploadProgress';

const ProgressBarWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
`;

const Image = styled.img<ImageViewProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  ${({ isCollapse }) => (isCollapse ? 'height: 64px' : '')};
  ${({ viewOnly }) => (viewOnly ? 'border-radius: 8px' : '')};
  cursor: ${({ viewOnly }) => (viewOnly ? 'pointer' : 'default')};
`;

const ImageView = memo((props: ImageViewProps) => {
  const {
    toolMetaValue,
    handleChangeToolMetaValue,
    updateToolMetaValue,
    noumSidePanelId,
    activeEditingTool,
    mediaUploadTempFile,
    mediaUploadPercentage,
  } = useEditChamberState();
  const [preview, setPreview] = useState(false);

  const isActiveEditing =
    !props.viewOnly &&
    activeEditingTool &&
    noumSidePanelId === activeEditingTool?._id &&
    activeEditingTool?._id === props.elementId;

  const percentageSize: number | undefined = useMemo(
    () =>
      isActiveEditing
        ? toolMetaValue?.percentageSize
        : props.meta?.percentageSize || 30,
    [
      props.meta?.percentageSize,
      isActiveEditing,
      toolMetaValue?.percentageSize,
    ],
  );

  const handleResize = useCallback(
    (e, direction, ref) => {
      const numericPercentage = Math.floor(ref?.style?.width?.replace('%', ''));
      handleChangeToolMetaValue?.({ percentageSize: numericPercentage });
    },
    [handleChangeToolMetaValue],
  );

  return (
    <>
      {!props.isCustomPreview ? (
        <NoumLayoutToolWrapper
          meta={
            props.elementId === noumSidePanelId ? toolMetaValue : props.meta
          }
        >
          <>
            {props.viewOnly && (
              <LightBox
                url={props.url || ''}
                type={ViewType.IMAGE}
                isOpen={preview}
                handleClose={() => setPreview(false)}
              />
            )}
            {isActiveEditing && mediaUploadTempFile ? (
              <UploadProgress
                file={mediaUploadTempFile}
                uploadPercentage={mediaUploadPercentage}
              />
            ) : (
              <ElementResizable
                onResize={handleResize}
                onResizeStop={updateToolMetaValue}
                disable={
                  props.viewOnly ||
                  props.elementId !== noumSidePanelId ||
                  !isActiveEditing
                }
                percentSize={percentageSize}
              >
                <Image
                  src={
                    isActiveEditing
                      ? ElementUtils.getBodyContent(activeEditingTool) ||
                        props.url
                      : props.url
                  }
                  {...props}
                  data-testid="image-element-view"
                  onClick={() => {
                    setPreview(!preview);
                  }}
                />
              </ElementResizable>
            )}
          </>
        </NoumLayoutToolWrapper>
      ) : (
        <ProgressBarWrapper
          draggable="false"
          onDragStart={(event) => event.preventDefault()}
        >
          {props.viewOnly ? (
            <LightBox
              url={props.url || ''}
              type={ViewType.IMAGE}
              isOpen={preview}
              handleClose={() => setPreview(false)}
            />
          ) : (
            <Spacer height={16} />
          )}
          <Image
            src={props.url}
            {...props}
            data-testid="image-element-view"
            onClick={() => {
              setPreview(!preview);
            }}
          />
        </ProgressBarWrapper>
      )}
    </>
  );
});

export default ImageView;
