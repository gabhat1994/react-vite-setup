import { type ProjectChamberCategory } from '@/apollo/generated/types';

export interface IProfileSummary {
  disabled?: boolean;
  name?: string;
  bio?: string;
  title?: string;
  location?: string;
  imageURL?: string;
  followers?: number;
  lastUpdated?: string;
  loading?: boolean;
  icon?: JSX.Element;
  ownerName?: string;
  ownerImageURL?: string;
  ownerTitle?: string;
  ownerBio?: string;
  isMasterNoum?: boolean;
  isSecretNoum?: boolean;
  spaceId?: string;
  isUpdateMode?: boolean;
  category?: ProjectChamberCategory;
  isNoumExpired?: boolean;
  isPublished?: boolean;
  coverURL?: string;
  isCustomPreview?: boolean;
}

export enum Privacy {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}
