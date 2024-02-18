import Quill from 'quill';
import { type HTMLAttributes } from 'react';

import { type FileInput } from '@/apollo/generated/types';

const Delta = Quill.import('delta');

export interface QuillEventRes {
  id: string;
  textChange?: ReactQuillChangeResult;
  image?: string | null;
  video?: string | null;
  link?: string;
  attachment?: string;
  error?: boolean | string;
  fileName?: string;
}

export interface ReactQuillChangeResult {
  isChanged: boolean;
  isEmpty: boolean;
  text: string;
  value: string | undefined;
  delta?: typeof Delta;
  source?: string;
  height: number;
}

export interface IBlotData {
  id: number | string;
  properties: {
    dataUrl: string;
    file: File;
  };
  render: (url: string, node: Element) => void;
}

export type OnChange = (
  text: string,
  delta: typeof Delta,
  value: string | undefined,
  source?: string,
  height?: number,
) => void;

export interface IQuillOptions {
  container?: Element | null;
  awsS3: string;
  editorUUID: string;
  userId: string;
  render?: (url: string, node: Element | null) => void;
  onGenerateS3SignedUrl: (file: FileInput) => Promise<string>;
  onEvent: (d: QuillEventRes) => void;
}

export interface RichTextEditorProps {
  id?: string;
  testMode?: boolean;

  // Initial value is set once... then quill / RTE
  // controls its own value.
  // looking for `value`? The text editor doesn't have
  // one because it's uncontrolled to prevent iframe flashes
  initialValue?: string;

  /* If minHeight is set, there is no dynamic grow */
  minHeight?: string | undefined;
  editEnabled?: boolean;
  onContentChange?: (next: ReactQuillChangeResult) => void;
  width?: string;
  basicToolbar?: boolean;
  inModal?: boolean;
  placeholder?: string;
  theme?: 'bubble' | 'snow';
  contentPadding?: number;
}

export interface IEditorProps {
  editEnabled: boolean;
  editorUUID: string;
  refreshKey: string;
  placeholder: string;
  value: string;
  minHeight: string | undefined;
  theme?: 'bubble' | 'snow';
  toolbarOptions: string[];
  userId: string;
  awsS3: string;
  onEvent: (d: QuillEventRes) => void;
  contentPadding?: number;
}

export interface IInitializerProps {
  editor: Quill;
  editorUUID: string;
  onEvent: (d: QuillEventRes) => void;
}

export interface IListenerProps {
  editEnabled: boolean;
  editorUUID: string;
  onEvent: (d: QuillEventRes) => void;
}

export type RichTextEditorViewProps = HTMLAttributes<HTMLDivElement> & {
  html: string;
  clickable?: boolean;
  fullWidth?: boolean;
};
