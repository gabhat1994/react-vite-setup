/* eslint-disable jsx-a11y/control-has-associated-label */

import { useGeniusCompletionModal } from '@/features/genius/hooks/useGeniusCompletionModal';
import { useTranslation } from 'react-i18next';
import { TOOLBAR_ID } from '../../constants';
import {
  AttachmentTools,
  FormatTools,
  Spacer,
  ToolbarContainer,
} from './styles';

interface Props {
  editorUUID: string;
  toolbarOptions: string[];
  editEnabled: boolean;
  onPasteText: (text: string) => void;
}

export function Toolbar({
  editorUUID,
  toolbarOptions,
  editEnabled,
  onPasteText,
}: Props) {
  const { t } = useTranslation();
  const GeniusCompletion = useGeniusCompletionModal({
    tooltipEnabled: true,
    onConfirm: (response) => {
      onPasteText(response.text);
    },
    type: 'text',
    buttonType: 'icon',
    title: t('noumena.genius.generate_content'),
  });

  return (
    <ToolbarContainer
      id={`${TOOLBAR_ID}-${editorUUID}`}
      visible
      editEnabled={editEnabled}
    >
      <FormatTools className="ql-formats">
        {toolbarOptions.includes('left') && (
          <button type="button" className="ql-align" value="" />
        )}
        {toolbarOptions.includes('center') && (
          <button type="button" className="ql-align" value="center" />
        )}
        {toolbarOptions.includes('right') && (
          <button type="button" className="ql-align" value="right" />
        )}
        {toolbarOptions.includes('justify') && (
          <button type="button" className="ql-align" value="justify" />
        )}
        {toolbarOptions.includes('ordered') && (
          <button type="button" className="ql-list" value="ordered" />
        )}
        {toolbarOptions.includes('bullet') && (
          <button type="button" className="ql-list" value="bullet" />
        )}

        <Spacer />
        <AttachmentTools>
          {GeniusCompletion.buttonElement}
          {toolbarOptions.includes('video') && (
            <button type="button" className="ql-video" />
          )}
          {toolbarOptions.includes('image') && (
            <button type="button" className="ql-image" />
          )}
          {toolbarOptions.includes('attachment') && (
            <button type="button" className="ql-attachment" />
          )}
        </AttachmentTools>
      </FormatTools>

      <FormatTools className="ql-formats">
        {toolbarOptions.includes('bold') && (
          <button type="button" className="ql-bold" />
        )}
        {toolbarOptions.includes('italic') && (
          <button type="button" className="ql-italic" />
        )}
        {toolbarOptions.includes('underline') && (
          <button type="button" className="ql-underline" />
        )}
        {toolbarOptions.includes('strike') && (
          <button type="button" className="ql-strike" />
        )}
        {toolbarOptions.includes('header1') && (
          <button type="button" className="ql-header" value="1" />
        )}
        {toolbarOptions.includes('header2') && (
          <button type="button" className="ql-header" value="2" />
        )}
        {toolbarOptions.includes('link') && (
          <button type="button" className="ql-link" />
        )}
      </FormatTools>

      {GeniusCompletion.modalElement}
    </ToolbarContainer>
  );
}
