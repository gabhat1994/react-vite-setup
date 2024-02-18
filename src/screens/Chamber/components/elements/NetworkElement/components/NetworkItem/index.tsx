import { useCallback } from 'react';
import { type SocialLink } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { type Maybe } from '@/common/types';
import { getSocialNameFromLink } from '@/utils/url';
import { Container } from './styles';

type NetworkItemProps = {
  data: SocialLink;
};
export const NetworkItem = (props: NetworkItemProps) => {
  const { data } = props;

  const makeViableLink = useCallback((link: string) => {
    const regProtocal = ['https', 'http'];
    if (!link.includes(regProtocal[0]) && !link.includes(regProtocal[1])) {
      return `https://${link}`;
    }
    return link;
  }, []);

  const getIconFromName = useCallback((name: Maybe<string>) => {
    const lower = name?.toLowerCase();
    const size = 40;
    switch (lower) {
      case 'linkedin':
        return (
          <Icon size={size} name="linkedin_xxl" data-testid="item-linkedin" />
        );
      case 'github':
        return <Icon size={size} name="github_xxl" data-testid="item-github" />;
      case 'twitter':
        return (
          <Icon size={size} name="twitter_xxl" data-testid="item-twitter" />
        );
      case 'medium':
        return <Icon size={size} name="medium_xxl" data-testid="item-medium" />;
      case 'dribbble':
        return (
          <Icon size={size} name="dribbble_xxl" data-testid="item-dribble" />
        );
      case 'behance':
        return (
          <Icon size={size} name="behance_xxl" data-testid="item-behance" />
        );
      case 'instagram':
        return (
          <Icon size={size} name="instagram_xxl" data-testid="item-instagram" />
        );
      default:
        return <Icon size={size} name="my_networks_xxl" />;
    }
  }, []);

  if (!data.link) {
    return null;
  }

  return (
    <Container href={makeViableLink(data.link!)} target="_blank">
      {getIconFromName(getSocialNameFromLink(data.link!))}
    </Container>
  );
};
