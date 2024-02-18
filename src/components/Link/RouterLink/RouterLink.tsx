import { type LinkProps, useLocation } from 'react-router-dom';
import S from './styles';

interface RouterLinkProps extends LinkProps {
  underline?: boolean;
  passState?: boolean;
}

export function RouterLink({
  underline = false,
  passState = false,
  ...linkProps
}: RouterLinkProps) {
  const location = useLocation();
  const state = passState
    ? { ...linkProps.state, ...location.state }
    : linkProps.state;

  return <S.Link {...linkProps} state={state} underline={underline} />;
}
