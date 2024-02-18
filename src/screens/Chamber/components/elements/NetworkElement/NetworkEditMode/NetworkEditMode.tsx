import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import {
  getSocialHandleFromLink,
  makeSocialLink,
  type TSocialName,
} from '@/utils/url';
import { type ElementOutput } from '@/apollo/generated/types';
import { ElementUtils } from '@/utils/element';
import NetworkEditItem from '../components/NetworkEditItem';
import { useNetworkElement } from '../NetworkElementProvider';
import { Container, Body } from './styles';

type NetworkEditModeProps = {
  handleChange: (networkDetails: object) => void;
  body: string | undefined;
  element?: ElementOutput;
};
let timeout: NodeJS.Timeout;
let networkDetails: {};
const socialSites: { [key: string]: string } = {
  github: 'github.com/',
  linkedin: 'linkedin.com/in/',
  behance: 'behance.net/',
  twitter: 'twitter.com/',
  instagram: 'instagram.com/',
  medium: 'medium.com/',
  dribbble: 'dribbble.com/',
  www1: 'Your Link',
  www2: 'Your Link',
  www3: 'Your Link',
};

const NetworkEditMode = (props: NetworkEditModeProps) => {
  const { networks } = useNetworkElement();
  const { handleChange, body, element } = props;
  const { t } = useTranslation();

  const bodyContentString = useMemo(
    () => ElementUtils.getBodyContent(element!) || undefined,
    [element],
  );

  const jsonBody = useMemo(() => {
    let result: { [name: string]: string } = {};
    if (body) {
      let jBody: { [name: string]: string } = {};
      try {
        jBody = JSON.parse(body);
      } catch (error) {
        jBody = {};
      }
      Object.keys(jBody).map((key) => {
        if (jBody[key]) {
          result[key] = makeSocialLink(key as TSocialName, jBody[key]) ?? '';
        }
        return undefined;
      });
      return result;
    }
    networks.map((network) => {
      result = {
        ...result,
        [network.name!]: network.link!,
      };
      return undefined;
    });
    return result;
  }, [body, networks]);

  useEffect(() => {
    let parsedBodyContent: { [name: string]: string } = {};
    try {
      parsedBodyContent = JSON.parse(bodyContentString || '{}');
    } catch (error) {
      parsedBodyContent = {};
    }
    networkDetails = parsedBodyContent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHandle = useCallback(
    (social) => {
      let result = '';
      if (social === 'www1' || social === 'www2' || social === 'www3') {
        result = jsonBody[social];
      } else {
        result = getSocialHandleFromLink(jsonBody[social]);
        result = result?.replace('@', '');
      }
      return result;
    },
    [jsonBody],
  );
  const handleUpdate = useCallback(
    (name, value) => {
      networkDetails = { ...networkDetails, [name]: value };
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleChange(networkDetails);
      }, 10);
      return () => clearTimeout(timeout);
    },
    [handleChange],
  );

  return (
    <Container data-testid="network-edit-mode-container">
      <TSpan colorToken="--text-body-header-neutral-default" font="body-m">
        {t('noumena.element.mynetwork.edit_title')}
      </TSpan>
      <Body>
        {Object.keys(socialSites).map((key) => (
          <NetworkEditItem
            key={`network-edit-${key}`}
            name={key}
            label={socialSites[key]}
            handleChange={handleUpdate}
            value={getHandle(key)}
          />
        ))}
      </Body>
    </Container>
  );
};

export default NetworkEditMode;
