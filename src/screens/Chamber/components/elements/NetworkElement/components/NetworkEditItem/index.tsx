import { useCallback } from 'react';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { parseAndSanitizeOpenLink } from '@/utils/url';
import { Container } from './styles';

type EditItemProps = {
  handleChange: (name: string, value: string) => void;
  name: string;
  value: string;
  label: string;
};

const NetworkEditItem = (props: EditItemProps) => {
  const { handleChange, name, value, label } = props;
  const getIconFromName = useCallback((_name: string) => {
    const lowerName = _name.toLocaleLowerCase();
    let result;

    if (lowerName.includes('linkedin'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="linkedin_m"
          data-testid="item-linkedin"
        />
      );
    else if (lowerName.includes('github'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="github_m"
          data-testid="item-github"
        />
      );
    else if (lowerName.includes('twitter'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="twitter_m"
          data-testid="item-twitter"
        />
      );
    else if (lowerName.includes('medium'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="medium_m"
          data-testid="item-medium"
        />
      );
    else if (lowerName.includes('dribbble'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="dribbble_m"
          data-testid="item-dribbble"
        />
      );
    else if (lowerName.includes('behance'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="behance_m"
          data-testid="item-behance"
        />
      );
    else if (lowerName.includes('instagram'))
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="instagram_m"
          data-testid="item-instagram"
        />
      );
    else
      result = (
        <Icon
          size={24}
          color="--icon-input-neutral-default"
          name="network_m"
          data-testid="item-network"
        />
      );

    return result;
  }, []);

  return (
    <Container>
      <TextField
        label={label}
        value={value}
        onChange={(e) => {
          if (name === 'www1' || name === 'www2' || name === 'www3') {
            const parsedLink = parseAndSanitizeOpenLink(e.target.value);
            handleChange(name, parsedLink ?? '');
          }
          handleChange(name, e.target.value);
        }}
        rightIcon={getIconFromName(name)}
      />
    </Container>
  );
};

export default NetworkEditItem;
