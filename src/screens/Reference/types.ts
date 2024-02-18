import { type NoumReferenceCapacity } from '@/apollo/generated/types';

export type ReferenceDetailModalProps = {
  onClose: () => void;
  isOpen: boolean;
  imageUrl?: string;
  experienceTitle: string;
  experienceDetail: string;
};

export type ExternalReferencePayload = {
  capacity?: NoumReferenceCapacity;
  imageUrl?: string;
  referenceText: string;
};

export interface NoumReferenceMetadata {
  capacity: string;
  experience: {
    body: string;
    id: string;
    title: string;
    _id: string;
    url: string;
  };
  experienceId: string;
  experienceOwnerName: string;
  providerName: string;
  _id: string;
}
