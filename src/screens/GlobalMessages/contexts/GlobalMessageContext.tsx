export type GlobalMessageContextProps = {
  notExistsConversation: boolean;
  setNotExistsConversation: (value: boolean) => void;
  selectedTabId: number;
  setSelectedTabId: (value: number) => void;
};

export const GlobalMessageContextInitialValue: GlobalMessageContextProps = {
  notExistsConversation: true,
  setNotExistsConversation: () => {},
  selectedTabId: 0,
  setSelectedTabId: () => {},
};
