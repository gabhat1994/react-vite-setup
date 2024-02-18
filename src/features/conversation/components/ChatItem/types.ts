export type ChatItemProps = {
  index: number;
  sid: string;
  isActive?: boolean;
  isMarginRight?: boolean;
  size?: 'S' | 'M' | 'L';
  onClick: (sid: string) => void;
  onRead?: () => void;
};

export type ChatItemWrapperProps = {
  active?: boolean;
  size?: ChatItemProps['size'];
};
