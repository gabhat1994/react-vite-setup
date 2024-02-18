import { t } from 'i18next';
import invFriendBackground from '@/assets/images/invfriends.png';
import { breakpoints } from '@/constants/devices';
import { useToast, useWindowDimensions } from '@/hooks';
import routes from '@/constants/routes';
import { Icon } from '../Icon';
import { TSpan } from '../Typography';
import { InviteBackground, InviteWrapper, IconWrapper } from './styles';
import { type InviteFriendProp } from './types';

const InviteFriendSideMenuSection = ({
  width,
  marginLeft,
  handleClick,
  paddingLeft,
  disabled = false,
}: InviteFriendProp) => {
  const { addToast } = useToast();
  const { width: windowWidth } = useWindowDimensions();

  const onClickButton = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      addToast(
        'error',
        'icon',
        t(`noumena.side_menu.invite_a-friend.no_reserved_action`),
      );
      return;
    }
    handleClick?.();
  };

  return (
    <InviteWrapper
      to={routes.INVITES_FRIENDS}
      width={width}
      marginleft={marginLeft}
      paddingleft={paddingLeft}
      onClick={onClickButton}
      disabled={disabled}
    >
      <Icon
        name="invite_m"
        size={25}
        color={
          disabled
            ? '--icon-tablecell-neutral-alt-disabled'
            : '--icon-tablecell-neutral-alt-default'
        }
      />
      <TSpan
        font="body-m-bold"
        colorToken={
          disabled
            ? '--text-button-neutral-disabled'
            : '--text-button-neutral-alt-default'
        }
      >
        {t(`noumena.side_menu.invite_a-friend`)}
      </TSpan>
      <InviteBackground>
        <img src={invFriendBackground} alt="" />
      </InviteBackground>
      {windowWidth < breakpoints.LAPTOP && (
        <IconWrapper>
          <Icon
            name="chevron_right_m"
            size={16}
            color="--icon-tablecell-neutral-alt-default"
          />
        </IconWrapper>
      )}
    </InviteWrapper>
  );
};

export default InviteFriendSideMenuSection;
