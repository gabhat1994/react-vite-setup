import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { clone } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  RichTextEditor,
  type ReactQuillChangeResult,
} from '@/features/richTextEditor';

import {
  BodyContentEnum,
  ElementStatusEnum,
  ElementTypeEnum,
} from '@/apollo/generated/types';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { DisablePublishOrDraftContext } from '@/providers';
import SkeletonLoaderBusinessBriefElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderBusinessBriefElement';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { useUpdateElementHelper } from '@/features/noums/hooks/spaceQuery';
import { type BusinessBriefProps } from './types';
import { ContentContainer } from './styles';
import { ElementWrapper } from '../../ElementWrapper/ElementWrapper';
import { ElementContainer } from '../ElementContainer';

const BusinessBrief = ({
  wrapperProps,
  isBorder,
  elementId,
  elementPosition,
  spaceId,
  isEditing,
  textEditor,
  basicToolbar = false,
}: BusinessBriefProps) => {
  const { t } = useTranslation();
  const { lastRerenderEvent } = useEditChamberState();

  const firstRender = useRef(true);
  const [initialValue, setInitialValue] = useState<string | undefined>(
    textEditor?.initialValue || '',
  );
  const [textAreaValue, setTextAreaValue] = useState<string>(
    textEditor?.initialValue || '',
  );

  const [internalRenderEvent, setInternalRenderEvent] =
    useState(lastRerenderEvent);

  useEffect(() => {
    if (internalRenderEvent !== lastRerenderEvent) {
      setInitialValue(textEditor?.initialValue);
      setInternalRenderEvent(lastRerenderEvent);
    }
  }, [textEditor?.initialValue, lastRerenderEvent, internalRenderEvent]);

  const updateTextAreaValue = useCallback((value: string) => {
    setTextAreaValue(value === `<p><br></p>` ? '' : value);
  }, []);

  const { setDisableUpdate, disabledUpdateElement } = useContext(
    DisablePublishOrDraftContext,
  );
  const { updateElementHelper, loading: updateElementLoader } =
    useUpdateElementHelper();

  useEffect(() => {
    setDisableUpdate(updateElementLoader);
  }, [setDisableUpdate, updateElementLoader]);

  const additionalOptions = {
    ...(!isEditing && { ...textEditor }),
  };

  const onContentChange = useCallback(
    (next: ReactQuillChangeResult) => {
      if (next.isChanged) {
        const data = clone(next.value);
        updateTextAreaValue(data ?? '');
        setInitialValue(data);
        textEditor?.onContentChange?.(next);
      }
    },
    [textEditor, updateTextAreaValue],
  );

  useEffect(() => {
    if (
      elementId &&
      spaceId &&
      !firstRender.current &&
      !disabledUpdateElement
    ) {
      updateElementHelper(spaceId, {
        elementId,
        bodyContent: textAreaValue,
        position: elementPosition,
        status: ElementStatusEnum.Unsaved,
        bodyContentType: BodyContentEnum.Json,
      });
    }
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, [
    disabledUpdateElement,
    elementId,
    elementPosition,
    spaceId,
    textAreaValue,
    updateElementHelper,
  ]);

  const { isLoading } = useSkeletonIsLoadingContext();
  if (!isEditing && isLoading) return <SkeletonLoaderBusinessBriefElement />;

  return (
    <ElementContainer elementType={ElementTypeEnum.BusinessBrief}>
      <ElementWrapper
        isBorder={isBorder}
        {...wrapperProps}
        currentTitle={t('noumena.homeChambers.addBusiness.currentTitle')}
      >
        <>
          {!wrapperProps.isActiveTool && isEditing ? (
            <Stack padding="16px">
              <TSpan font="body-m" colorToken="--text-input-neutral-default">
                {t('noumena.homeChambers.addBusiness.description')}
              </TSpan>
            </Stack>
          ) : (
            <ContentContainer>
              <RichTextEditor
                placeholder={t(
                  'noumena.homeChambers.addBusiness.tellAboutExperience',
                )}
                initialValue={initialValue}
                onContentChange={onContentChange}
                width="100%"
                basicToolbar={basicToolbar}
                editEnabled={isEditing}
                {...additionalOptions}
                contentPadding={textEditor?.contentPadding}
              />
            </ContentContainer>
          )}
        </>
      </ElementWrapper>
    </ElementContainer>
  );
};

export default BusinessBrief;
