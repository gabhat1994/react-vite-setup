export default interface IMemberRequest {
  requestFromChamberId?: string | null;
  chamberId?: string | null;
  noumType?: string | null;
  connectionId?: string | null;
  name?: string;
  title?: string;
  profileImage?: string;
  category?: string | null;
  inviterId?: string | null;
  isHomeType?: boolean;
  refetchReceivedRequests?: () => void;
  type?: string | null;
  message?: string | undefined | null;
  isModal?: boolean;
}
