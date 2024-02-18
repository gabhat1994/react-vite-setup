export type NoumProgressProps = {
  profileProgressPercentage: number;
  profileProgressItems: NoumProgressItemProps[];
  onItemClicked: (id: string) => void;
  isTokensAlloted?: boolean;
};

interface INoumProgressItem {
  id: string;
  name: string;
  tokens?: number;
}

export type NoumProgressItemProps = INoumProgressItem;
