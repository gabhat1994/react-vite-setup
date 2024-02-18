import {
  createContext,
  type ReactNode,
  useState,
  type FC,
  useMemo,
} from 'react';

export const DisablePublishOrDraftContext = createContext<{
  disableUpdate: boolean;
  disabledUpdateElement: boolean;
  setdisabledUpdateElement: (value: boolean) => void;
  setDisableUpdate: (value: boolean) => void;
}>({
  disableUpdate: false,
  disabledUpdateElement: false,
  setDisableUpdate: () => {},
  setdisabledUpdateElement: () => {},
});

export const DisablePublishOrDraftProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [disabledUpdateElement, setdisabledUpdateElement] = useState(false);
  const payload = useMemo(
    () => ({
      disableUpdate,
      setDisableUpdate,
      setdisabledUpdateElement,
      disabledUpdateElement,
    }),
    [disableUpdate, disabledUpdateElement],
  );

  return (
    <DisablePublishOrDraftContext.Provider value={payload}>
      {children}
    </DisablePublishOrDraftContext.Provider>
  );
};
