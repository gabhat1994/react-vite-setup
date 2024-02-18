import { memo, useEffect, useState } from 'react';
import { clone } from 'lodash';
import {
  ElementWrapper,
  type ElementWrapperProps,
} from '@/screens/Chamber/components/ElementWrapper';
import {
  RichTextEditor,
  type ReactQuillChangeResult,
  type RichTextEditorProps,
} from '@/features/richTextEditor';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import SkeletonLoaderTextElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderTextElement';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { t } from 'i18next';
import { ElementUtils } from '@/utils/element';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { ElementContainer } from '../ElementContainer';

type TextElementProps = ElementWrapperProps & {
  textEditor?: RichTextEditorProps;
};

const TextElement = memo((props: TextElementProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const [initialValue, setInitialValue] = useState(
    props.textEditor?.initialValue,
  );
  const { space } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();

  const { lastRerenderEvent } = useEditChamberState();

  const [internalRenderEvent, setInternalRenderEvent] =
    useState(lastRerenderEvent);

  useEffect(() => {
    if (internalRenderEvent !== lastRerenderEvent) {
      setInitialValue(props.textEditor?.initialValue);
      setInternalRenderEvent(lastRerenderEvent);
    }
  }, [props.textEditor?.initialValue, lastRerenderEvent, internalRenderEvent]);

  const onContentChange = (next: ReactQuillChangeResult) => {
    const data = clone(next);
    props.textEditor?.onContentChange?.(data);
  };
  const { hasElementPermission } = useNoumAuthorization();

  const hasViewContentPermission = hasElementPermission(
    PermissibleElementType.Text,
    'view-text-element',
    true,
  );

  if (
    isConnected &&
    !SpaceUtils.isMasterNoum(space) &&
    !hasViewContentPermission
  )
    return null;

  if (isLoading) return <SkeletonLoaderTextElement />;

  return (
    <ElementContainer isBorderContent elementType={ElementTypeEnum.Text}>
      <ElementWrapper {...props}>
        <RichTextEditor
          {...(!props.isCustomPreview ? { ...props.textEditor } : undefined)}
          initialValue={initialValue}
          onContentChange={onContentChange}
          placeholder={
            ElementUtils.isCPAdditionalInfoElement(props.element)
              ? t(
                  'noumena.noum_edit.custom_preview.additional_info.placeholder',
                )
              : undefined
          }
          contentPadding={props.textEditor?.contentPadding}
        />
      </ElementWrapper>
    </ElementContainer>
  );
});

export default TextElement;
