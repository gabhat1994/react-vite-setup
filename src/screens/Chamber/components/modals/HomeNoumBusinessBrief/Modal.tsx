import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  BodyContentEnum,
  type CreateElementInput,
  ElementStatusEnum,
  ElementTypeEnum,
} from '@/apollo/generated/types';

import { useWindowDimensions } from '@/hooks';

import { breakpoints } from '@/constants/devices';
import {
  RichTextEditor,
  type ReactQuillChangeResult,
} from '@/features/richTextEditor';
import { SpaceUtils } from '@/utils/space';
import { ElementUtils } from '@/utils/element';
import {
  useAddElementsHelper,
  usePublishElementStateHelper,
  usePublishNoumLayoutHelper,
  useUpdateElementHelper,
} from '@/features/noums/hooks/spaceQuery';
import { useToast } from '@/hooks/toast';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useProfileCompletenessHelper } from '@/features/noums/hooks/noums';
import { useAuth } from '@/features/auth/contexts';
import { StyledForm } from './styles';
import { type HomeNoumBusinessBriefProps } from './types';

export const HomeNoumBusinessBrief = memo(
  (props: HomeNoumBusinessBriefProps) => {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const { masterId: spaceId } = useAuth();
    const { space } = useProfileCompletenessHelper();
    const { addElementsHelper, loading: loadingAddElements } =
      useAddElementsHelper();

    const element = SpaceUtils.getElementInSpaceByType(
      space,
      ElementTypeEnum.BusinessBrief,
    );
    const bodyContentJson =
      ElementUtils.getBodyContentJson(element) ||
      ElementUtils.getBodyContent(element);
    const { width } = useWindowDimensions();
    const isDesktop = width > breakpoints.TABLET_L;

    const [initialTextAreaValue] = useState<string>(bodyContentJson || '');
    const [textAreaValue, setTextAreaValue] = useState<string>(
      bodyContentJson || '',
    );
    const { publishNoumLayoutHelper, loading: loadingPublishNoumLayout } =
      usePublishNoumLayoutHelper();

    const { updateElementHelper, loading: loadingUpdateElement } =
      useUpdateElementHelper();

    const { publishElementStateHelper, loading: loadingPublishSpace } =
      usePublishElementStateHelper();

    const loading =
      loadingAddElements ||
      loadingUpdateElement ||
      loadingPublishNoumLayout ||
      loadingPublishSpace;

    const onSubmit = useCallback(
      async (event) => {
        let elementIds: string[] | undefined;
        event.preventDefault();
        let isSuccess = false;

        if (textAreaValue === `<p><br></p>` || !textAreaValue) {
          addToast(
            'error',
            'none',
            t('noumena.chamber_edit.add_reference.empty_content'),
          );
          setTextAreaValue('');
          return;
        }
        if (!element._id && !bodyContentJson) {
          const newElementInput: CreateElementInput = {
            elementType: ElementTypeEnum.BusinessBrief,
            status: ElementStatusEnum.Published,
            bodyContentType: BodyContentEnum.Json,
            bodyContent: textAreaValue,
            bodyContentJson: null,
            position: 1,
            percentCompleted: 100,
          };
          const responseAddElements = await addElementsHelper(
            spaceId,
            newElementInput,
          );
          elementIds = ElementUtils.getElementIds(
            responseAddElements?.data?.addElements,
          );
          isSuccess = true;
        } else {
          isSuccess = await updateElementHelper(spaceId, {
            elementId: element._id,
            bodyContent: textAreaValue,
            bodyContentJson: null,
            position: element.position ?? props.position,
            status: ElementStatusEnum.Published,
            bodyContentType: BodyContentEnum.Json,
            percentCompleted: 100,
          });
          if (element._id) {
            elementIds = [element._id];
          }
        }
        if (isSuccess) {
          const isPublishNoumLayoutSuccess = await publishNoumLayoutHelper(
            spaceId,
          );
          const isPublishSpaceSuccess = await publishElementStateHelper(
            spaceId,
            [ElementStatusEnum.Unsaved, ElementStatusEnum.Draft],
            ElementStatusEnum.Published,
            elementIds,
          );
          if (isPublishNoumLayoutSuccess && isPublishSpaceSuccess) {
            props.handleSuccess();
          }
        }
      },
      [
        textAreaValue,
        element._id,
        element.position,
        bodyContentJson,
        addToast,
        t,
        addElementsHelper,
        spaceId,
        updateElementHelper,
        props,
        publishNoumLayoutHelper,
        publishElementStateHelper,
      ],
    );

    const handleClose = useCallback(() => {
      setTextAreaValue(bodyContentJson || '');
      props.handleClose(true);
    }, [props, setTextAreaValue, bodyContentJson]);

    return (
      <Modal
        testId="testHomeNoumBusinessBrief"
        enableCloseButton
        open={props.isOpen}
        onClose={handleClose}
        size={ModalSize.XL}
        disableBackdropClick
      >
        <ModalHeader>
          {t(`noumena.home_noum.business_brief.section_title`)}
        </ModalHeader>
        <ModalBody style={{ height: isDesktop ? '420px' : '100%' }}>
          <StyledForm onSubmit={onSubmit}>
            <RichTextEditor
              placeholder={t(
                `noumena.home_noum.business_brief.rte_placeholder`,
              )}
              initialValue={initialTextAreaValue}
              onContentChange={(res: ReactQuillChangeResult) => {
                setTextAreaValue(res.value ?? '');
              }}
              width="100%"
              inModal
              editEnabled
            />
          </StyledForm>
        </ModalBody>
        <ModalFooter marginTop={isDesktop ? 16 : 0}>
          <Button
            style={
              !isDesktop
                ? { position: 'absolute', right: 24, top: 24 }
                : undefined
            }
            type="submit"
            primary
            size={isDesktop ? 'large' : 'small'}
            loading={loading}
            secondary={textAreaValue === ''}
            tertiary={textAreaValue === ''}
            disabled={textAreaValue === '' || loading}
            onClick={onSubmit}
          >
            {t('noumena.homenoum.save_and_publish')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
