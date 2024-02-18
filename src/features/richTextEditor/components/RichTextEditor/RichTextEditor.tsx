import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import { useScreenClass } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import generate from 'uniqid';

import getS3Bucket from '@/apollo/getS3Bucket';
import LightBox from '@/components/LightBox';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';

import { ViewType } from '@/components/LightBox/types';
import { cleanContentFromXSS } from '../../utils';
import { Editor } from '../editor';

import {
  MODULES,
  MODULES_ADD_REFERENCE,
  MODULES_MOBILE,
  MODULES_MOBILE_ADD_REFERENCE,
} from '../../constants';
import {
  type OnChange,
  type QuillEventRes,
  type RichTextEditorProps,
} from '../../types';
import { Container } from './styles';

const ForwardedRichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      id: propId,
      testMode,
      initialValue: propValue,
      minHeight: propMinHeight,
      width,
      basicToolbar,
      inModal,
      placeholder,
      theme,
      editEnabled,
      onContentChange,
      contentPadding,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const screenClass = useScreenClass();

    const internalRef = useRef<HTMLDivElement | null>(null);
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const auth = useAuth();

    const [minHeight, setMinHeight] = useState<string | undefined>(
      propMinHeight,
    );
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [lightBoxOpen, setLightBoxOpen] = useState<boolean>(false);
    const [lightBoxType, setLightBoxType] = useState<ViewType>(ViewType.IMAGE);
    const [valueChangeTrigger, setValueChangeTrigger] = useState<string>('');

    const editorUUID = useMemo(() => generate(), []);
    const value = useMemo(() => {
      const val = propValue?.replace(/`/g, '\\`') ?? '';
      return editEnabled ? val : cleanContentFromXSS(val);
    }, [editEnabled, propValue]);

    const toolbarOptions = useMemo(() => {
      const selectedModule = basicToolbar ? MODULES_ADD_REFERENCE : MODULES;
      const selectedMobileModule = basicToolbar
        ? MODULES_MOBILE_ADD_REFERENCE
        : MODULES_MOBILE;
      const options = ['xs', 'sm'].includes(screenClass)
        ? selectedMobileModule?.toolbar ?? []
        : selectedModule?.toolbar ?? [];

      return options;
    }, [basicToolbar, screenClass]);

    useEffect(
      () => () => timerId.current ? clearTimeout(timerId.current) : undefined,
      [],
    );

    const onChange: OnChange = useCallback(
      (_text, _delta, _value, _source, _height) => {
        // If minHeight is set, there is no dynamic grow
        if (!propMinHeight) setMinHeight(`${_height}px`);

        // this means the update was automatic AKA not made by a human being
        if (_source === 'api') return;

        setValueChangeTrigger(Date.now().toString());

        if (timerId.current) {
          clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
          onContentChange?.({
            isChanged: value !== _value,
            // CRITICAL NOTE: IT ALWAYS STARTS WITH A NEW LINE => SO
            // INITIAL LENGTH IS ALWAYS 1 WHICH MEANS IS EMPTY
            isEmpty: (_text || '').length < 2,
            text: _text,
            value: _value,
            delta: _delta,
            source: _source,
            height: _height || 0,
          });
        }, 700);
      },
      [propMinHeight, onContentChange, value],
    );

    const onEvent = useCallback(
      (data: QuillEventRes) => {
        // This function will be pick up all messages from all editors
        // we only need to deal with this particular editor edits

        const { id: elementId } = data;
        if (elementId !== editorUUID) return;

        if ('textChange' in data && data.textChange) {
          const {
            textChange: { text, delta, value: innerValue, source, height },
          } = data;

          onChange(text, delta, innerValue, source, height);
        }

        if ('link' in data && data.link) {
          const link = document.createElement('a');
          link.target = '_blank';
          link.href = data.link;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }

        if ('attachment' in data && data.error) {
          const { error, fileName } = data;
          addToast(
            'error',
            'icon',
            t(`noumena.rich_text_editor.file.handler.error.${error}`, {
              fileName,
            }),
          );
          return;
        }

        if ('attachment' in data && data.attachment) {
          const url = data.attachment;
          setLightBoxType(ViewType.PDF);
          setImageUrl(url);
          setLightBoxOpen(true);
        }

        if ('image' in data && data.image && !editEnabled) {
          setLightBoxType(ViewType.IMAGE);
          setImageUrl(data.image);
          setLightBoxOpen(true);
        }
      },
      [addToast, editEnabled, editorUUID, onChange, t],
    );

    useEffect(() => {
      // If minHeight is set, there is no dynamic grow
      if (minHeight) return;

      if (!internalRef.current) return;

      const styles = window.getComputedStyle(internalRef.current);

      const margin =
        parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

      const height = Math.ceil(
        internalRef.current.getBoundingClientRect().height + margin,
      );

      setMinHeight(`${height}px`);
    }, [valueChangeTrigger, minHeight]);

    const internaliseRef = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (internalRef as MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    return (
      <>
        <Container
          data-testid="RTE-Container"
          id={propId}
          className={`${inModal ? 'rte-modal' : ''}`}
          ref={internaliseRef}
          width={width}
          height={minHeight}
          minHeight={propMinHeight}
          editEnabled={editEnabled}
          data-testhtml={testMode ? value : null}
        >
          <Editor
            editEnabled={Boolean(editEnabled)}
            editorUUID={editorUUID}
            refreshKey={valueChangeTrigger}
            placeholder={
              placeholder || t('noumena.rich_text_editor.placeholder')
            }
            value={value}
            theme={theme}
            minHeight={propMinHeight}
            toolbarOptions={toolbarOptions}
            userId={auth.user?._id || ''}
            awsS3={getS3Bucket()}
            onEvent={onEvent}
            contentPadding={contentPadding}
          />
        </Container>
        <LightBox
          url={imageUrl || ''}
          isOpen={lightBoxOpen}
          handleClose={() => setLightBoxOpen(false)}
          type={lightBoxType}
        />
      </>
    );
  },
);

export const RichTextEditor = memo(ForwardedRichTextEditor);
