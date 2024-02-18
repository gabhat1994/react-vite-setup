import styled from 'styled-components';
import { defaultScrollBar } from '@/common/globalStyles';
import { Button } from '@/components/Button';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

export const FileChooserWrapper = styled.div<{ withLeftPadding?: boolean }>`
  padding: 12px 12px 12px 0;
  padding-left: ${(props) => (props.withLeftPadding ? '12px' : '0px')};
`;

export const InputWrapper = styled.div<{ active?: boolean }>`
  overflow-x: hidden;
  flex: 1;
  border-radius: 8px;
  border: 2px solid transparent;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) =>
    props.active ? 'var(--border-input-neutral-pressed)' : 'transparent'};
  background-color: ${(props) =>
    props.active
      ? 'var(--bg-input-brand-primary-hover)'
      : 'var(--bg-input-neutral-default)'};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
`;

export const FilesWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  ${defaultScrollBar}
  ::-webkit-scrollbar {
    width: 4px;
  }
`;

export const SendButtonWrapper = styled.div<{ active?: boolean }>`
  ${({ active }) => !active && 'display: none;'}
  padding: 10px 10px 10px 20px;
`;

export const PreviewFileWrapper = styled.div`
  position: relative;
  padding: 4px;
  flex: 0 0 auto;
  flex-basis: 80px;
  height: 80px;
`;

export const RemoveFileWrapper = styled.div<{ isControl: boolean }>`
  ${({ isControl }) => !isControl && 'display: none;'}
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 100%;
  background-color: var(--bg-button-neutral-alt-default);
  cursor: pointer;
`;

export const PreivewImage = styled.img`
  border-radius: 8px;
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

export const PreviewVideo = styled.video`
  border-radius: 8px;
  width: 80px;
  height: 80px;
`;

export const EmojiContainer = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 100;
`;

export const EmojiButton = styled(Button)`
  position: absolute;
  right: 8px;
  z-index: 100;

  :hover {
    background: var(--bg-button-neutral-alt-pressed);
  }
`;
