import { useMemo } from 'react';
import { ElementTypeEnum, type SocialLink } from '@/apollo/generated/types';
import { makeSocialLink, type TSocialName } from '@/utils/url';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import SkeletonLoaderNetworkElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderNetworkElement';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type ElementWrapperProps } from '../../../ElementWrapper';
import { NetworkItem } from '../components/NetworkItem';
import { useNetworkElement } from '../NetworkElementProvider';
import { Body, Container } from './styles';
import { ElementContainer } from '../../ElementContainer';
import { ViewMode } from '../../../ElementWrapper/ViewMode';

interface NetworkViewModeProps extends ElementWrapperProps {
  body: string | undefined;
}

export const NetworkViewMode = (props: NetworkViewModeProps) => {
  const { networks: profileNetworks } = useNetworkElement();
  const { body, spaceId, element, currentTitle } = props;
  const { isOwner, space } = useNoumContext();

  const noumNetworks = useMemo(() => {
    const userNetworks = isOwner
      ? profileNetworks
      : space?.uid?.profile?.socialLinks || [];
    return userNetworks;
  }, [isOwner, profileNetworks, space]);

  const networks = useMemo(() => {
    const result: SocialLink[] = [];
    let jsonBody: { [name: string]: string } = {};
    if (!body) {
      noumNetworks.map((network) => {
        jsonBody = {
          ...jsonBody,
          [network?.name!]: network?.link!,
        };
        return undefined;
      });
    } else {
      try {
        jsonBody = JSON.parse(body);
      } catch (error) {
        jsonBody = {};
      }
    }
    Object.keys(jsonBody).map((key) => {
      if (jsonBody[key]) {
        const link = makeSocialLink(key as TSocialName, jsonBody[key]);
        const item: SocialLink = {
          name: key,
          link,
        };
        result.push(item);
      }
      return undefined;
    });

    return result.sort((a: SocialLink, b: SocialLink) => {
      if (a.name! > b.name!) return 1;
      if (a.name! === b.name!) return 0;
      return -1;
    });
  }, [noumNetworks, body]);
  const { isLoading } = useSkeletonIsLoadingContext();
  if (isLoading) return <SkeletonLoaderNetworkElement />;
  if (!networks.length) return <></>;

  return (
    <ElementContainer elementType={ElementTypeEnum.Usernetwork}>
      <Container data-testid="network-view-container">
        <ViewMode
          spaceId={spaceId}
          element={element}
          currentTitle={currentTitle}
        />
        <Body>
          {networks.map((network: SocialLink) => (
            <NetworkItem key={network.link} data={network} />
          ))}
        </Body>
      </Container>
    </ElementContainer>
  );
};
