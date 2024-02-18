import { useState, memo, forwardRef } from 'react';
import { RichTextEditor } from './RichTextEditor';
import { RichTextEditorView as StyledRichTextEditorView } from './styles';
import { type RichTextEditorViewProps } from '../../types';

const ForwardedRichTextEditorView = forwardRef<
  HTMLDivElement,
  RichTextEditorViewProps
>(({ html, ...props }, ref) => {
  const [initialValue] = useState(html);

  return (
    <StyledRichTextEditorView ref={ref} {...props}>
      <RichTextEditor initialValue={initialValue} />
    </StyledRichTextEditorView>
  );
});

export const RichTextEditorView = memo(ForwardedRichTextEditorView);
