import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { TSpan } from '@/components';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import ROUTES from '@/constants/routes';
import { StyledTSpan } from '../styles';

export const InviteNonNemberNoListNote = () => {
  const navigate = useNavigate();
  const { id: noumId } = useParams();
  const location = useLocation();
  const handleClick = () => {
    if (noumId) navigate(generatePath(ROUTES.EDIT_NOUM, { id: noumId }));
  };
  return (
    <StyledTSpan
      font="body-m"
      colorToken="--text-tablecell-header-neutral-default"
      textAlign="center"
    >
      <Trans
        i18nKey={t(
          'noumena.chamber.invite_by_me.description.non_member_not_in_list',
        )}
        components={{
          link1: (
            <TSpan
              cursor={
                location.pathname === ROUTES.NOUMS ? undefined : 'pointer'
              }
              font="body-m-bold"
              colorToken="--text-tablecell-header-neutral-default"
              onClick={handleClick}
            />
          ),
        }}
      />
    </StyledTSpan>
  );
};
