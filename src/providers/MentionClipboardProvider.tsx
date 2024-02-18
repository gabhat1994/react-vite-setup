import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const MentionClipboardContext = createContext<{
  mentionIds: string[];
  setMentionIds: (ids: string[]) => void;
  onCopy: () => void;
  onPaste: () => void;
}>({
  mentionIds: [],
  setMentionIds: () => {},
  onCopy: () => {},
  onPaste: () => {},
});

export const MentionClipboardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mentionIds, setMentionIds] = useState<string[]>([]);
  const onCopy = useCallback(() => {}, []);

  const onPaste = useCallback(() => {}, []);

  const value = useMemo(
    () => ({ onCopy, onPaste, mentionIds, setMentionIds }),
    [onCopy, onPaste, mentionIds, setMentionIds],
  );

  return (
    <MentionClipboardContext.Provider value={value}>
      {children}
    </MentionClipboardContext.Provider>
  );
};

export const useMentionClipboard = () => {
  const payload = useContext(MentionClipboardContext);
  return {
    ...payload,
  };
};
