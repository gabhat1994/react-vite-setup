import { EmptyWalletCard, HelperText } from '../styles';

type ErrorProps = {
  message: string;
};

export const Error = ({ message }: ErrorProps) => (
  <EmptyWalletCard>
    <HelperText font="body-m" colorToken="--text-placeholder-neutral-default">
      {message}
    </HelperText>
  </EmptyWalletCard>
);
