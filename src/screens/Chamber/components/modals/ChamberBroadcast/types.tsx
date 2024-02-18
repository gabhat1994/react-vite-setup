export type BroadcastModalProps = {
  spaceId: string;
  isOpen: boolean;
  onClose: () => void;
  onCampaign: () => void;
};

export type NewBroadcastModalProps = {
  noumId: string;
  isOpen: boolean;
  onClose: () => void;
  noumType: 'PUBLIC' | 'PRIVATE' | 'SECRET' | string | null | undefined;
};

export type DeleteChamberBroadcastModalProps = {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  onRefetchCampaigns: () => void;
};
