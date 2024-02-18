import { t } from 'i18next';
import { type CSSProperties, useMemo } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';
import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import { SelectOption, OptionDetail } from '../styles';
import NoumOptionTag from './NoumOptionTag';
import { type LinkedNoumOptionType } from './types';
import { VisibiltiyType } from '../types';

const LinkNoumOption: React.FC<{
  showBorder: boolean;
  updateOptionState?: () => void;
  item: LinkedNoumOptionType;
  showDetail?: boolean;
  showChips?: boolean;
  showExtraDetail?: boolean;
  iconSize?: number;
  style?: CSSProperties;
  showPadding?: boolean;
  showCheckBox?: boolean;
}> = ({
  item,
  updateOptionState,
  showBorder,
  showDetail = false,
  showExtraDetail = false,
  showChips = false,
  showPadding = false,
  style,
  showCheckBox = true,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  return (
    <SelectOption
      style={style}
      key={item._id}
      showPadding={showPadding}
      showBorder={showBorder}
      onClick={!item.disabled ? updateOptionState : undefined}
      shouldHover={!!updateOptionState}
    >
      <Avatar url={item.profileImage ?? ChamberDefaultImage} size="M" />
      <OptionDetail>
        <TSpan
          singleLine
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {item.name}
        </TSpan>
        {showDetail && (
          <Stack
            style={{
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <TSpan
              colorToken="--text-tablecell-body-neutral-default"
              font="footnote"
            >
              {`${item.connections} ${t('noumena.connections')}`}
              {item.visibility !== VisibiltiyType.Secret
                ? ` · ${item.followers} ${t('noumena.followers')}`
                : ''}
              {` · ${item.visibility}`}
            </TSpan>
            {showExtraDetail && item.linked ? (
              <TSpan
                font="footnote"
                colorToken="--text-tablecell-body-neutral-highlighted"
              >
                {!isMobile ? <>&nbsp;· </> : ''}
                {t('noumena.link_noums.link_options.linked_noums', {
                  linked: item.linked,
                })}
              </TSpan>
            ) : null}
          </Stack>
        )}
      </OptionDetail>
      {(updateOptionState || item.disabled) && showCheckBox && (
        <Checkbox
          disableClick={item.disabled}
          isChecked={item.checked ?? false}
          onChange={!item.disabled ? updateOptionState : undefined}
          icon={
            <Icon
              name="tick_m"
              size={24}
              color={
                item.disabled
                  ? '--icon-checkbox-neutral-disabled'
                  : '--icon-checkbox-neutral-alt-default'
              }
            />
          }
        />
      )}
      {showChips && item.type && <NoumOptionTag type={item.type} />}
    </SelectOption>
  );
};

export default LinkNoumOption;
