export enum DiscoveryCategoryEnum {
  Recommended = 'RECOMMENDED',
  Featured = 'FEATURED',
  Spotlight = 'SPOTLIGHT',
  MyCircle = 'MY_CIRCLE',
  Popular = 'POPULAR',
  Favourites = 'FAVOURITES',
  Recent = 'RECENT',
}

export enum ChamberBoxNameEnum {
  project = 'project',
  social = 'social',
  special = 'special',
  investment = 'investment',
  story = 'story',
  member = 'member',
  linked = 'linked',
  rise_application = 'rise_application',
  rise = 'rise',
}

export type ChamberBoxProps = {
  title: string;
  name: ChamberBoxNameEnum;
  followers: number;
  category?: DiscoveryCategoryEnum;
  url?: string;
  id?: string | undefined | null;
  chamberUrl?: string;
  ownerImageURL?: string;
  ownedby?: string;
  archived?: boolean;
  location?: string;
  chamberTitle?: string;
  hasDraftElement?: boolean;
  startDate?: string;
  isSecretNoum?: boolean;
  isFavouriteNoum?: boolean;
  projectType?: string;
};

export type TypeOfChamberBoxProps = {
  [key in ChamberBoxNameEnum]: {
    bgColor: string;
    color: string;
  };
};
