export interface IRemoveNoumFromPlanModal {
  open: boolean;
  onClose: () => void;
  noumId: string | undefined;
  subscriptionId: number;
  onRemoveNoum: () => void;
}
