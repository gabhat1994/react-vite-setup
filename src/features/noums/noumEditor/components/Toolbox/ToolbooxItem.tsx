import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { type ToolboxItemProps } from './types';
import {
  ToolboxItemWrapper,
  ToolboxItemTextContainer,
  ToolboxItemText,
  ToolTip,
  ToolboxItemComingSoonText,
} from './styles';

const ToolboxItem = ({
  name,
  size,
  text,
  isDisabled,
  isComingSoon,
  toolTipText,
  onClick,
  childIndex,
}: ToolboxItemProps) => (
  <ToolboxItemWrapper
    disabled={isDisabled}
    onClick={onClick}
    data-testid={`ToolboxItemwrapper-${name}`}
  >
    {toolTipText && (
      <ToolTip
        childIndex={childIndex}
        className="toolbox-tooltip"
        font="systemInfo-s"
        colorToken="--text-tooltip-neutral-alt-default"
      >
        {toolTipText}
      </ToolTip>
    )}
    <Icon
      name={name}
      size={size}
      color={
        isDisabled || Boolean(isComingSoon)
          ? '--icon-button-neutral-disabled'
          : '--icon-button-neutral-default'
      }
    />
    <ToolboxItemTextContainer>
      <ToolboxItemText
        overflow="ellipsis"
        font="body-m"
        isDisabled={isDisabled || Boolean(isComingSoon)}
      >
        {text}
      </ToolboxItemText>
      {!!isComingSoon && (
        <ToolboxItemComingSoonText
          isDisabled={isDisabled || Boolean(isComingSoon)}
        >
          {t('noumena.comingVerySoon')}
        </ToolboxItemComingSoonText>
      )}
    </ToolboxItemTextContainer>
  </ToolboxItemWrapper>
);

export default ToolboxItem;
