interface ConnectLinkedNoumsModalProps {
  actionType: 'connect' | 'follow';
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default ConnectLinkedNoumsModalProps;
