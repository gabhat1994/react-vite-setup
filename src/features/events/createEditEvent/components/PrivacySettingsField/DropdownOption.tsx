import { Spacer } from '@/layout';
import { Button, Icon, TSpan } from '@/components';

import { privacySettingOptions } from './const';
import { Content, Option } from '../EventPicker/styles';
import { OptionLabel, OptionLabelContainer } from './styles';
import type { DropdownOptionProps } from './types';

export const DropdownOption = ({ onChange }: DropdownOptionProps) => (
  <Content vertical scrollbarWidth={5}>
    {privacySettingOptions.map(
      (option) =>
        option.type === 'value' && (
          <Option key={option.key} onClick={() => onChange(option)}>
            <OptionLabel
              font="body-m-bold"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              <Button
                size="small"
                icon={<Icon name={option.iconName} size={24} />}
              />
              <Spacer width={16} />
              <OptionLabelContainer>
                <TSpan
                  color="--text-tablecell-header-neutral-highlighted"
                  font="body-m-bold"
                >
                  {option.label}
                </TSpan>
                <TSpan
                  color="--text-tablecell-body-neutral-default"
                  font="footnote"
                >
                  {option.description}
                </TSpan>
              </OptionLabelContainer>
            </OptionLabel>
          </Option>
        ),
    )}
  </Content>
);
