export interface HomeNoumAboutMeProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleSuccess: () => void;
}

export type HomeNoumAboutMetype = {
  firstName: string;
  lastName: string;
  bio?: string;
  title?: string;
  location?: string;
  profileImage?: string;
};
