import { type Meta, type StoryFn } from '@storybook/react';
import styled from 'styled-components';

import Icon, { type IconProps } from './Icon';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 12px;
`;

const IconText = styled.h5`
  padding: 4px;
`;

export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    color: {
      options: [
        '--icon-placeholder-neutral-default',
        '--icon-pagination-brand-secondary-default',
        '--icon-pagination-brand-primary-default',
        '--icon-pagination-neutral-disabled',
        '--icon-wysiwyg-default',
        '--icon-tag-neutral-alt-default',
        '--icon-tag-neutral',
        '--icon-tag-brand-primary',
        '--icon-badge-neutral-default',
        '--icon-badge-neutral-alt-default',
        '--icon-datepicker-neutral-default',
        '--icon-radiobutton-inactive-default',
        '--icon-radiobutton-brand-primary-default',
        '--icon-radiobutton-neutral-disabled',
        '--icon-checkbox-neutral-disabled',
        '--icon-checkbox-neutral-alt-default',
        '--icon-card-placeholder-neutral-default',
        '--icon-card-brand-primary-default',
        '--icon-card-danger-primary-default',
        '--icon-card-neutral-default',
        '--icon-top-nav-global-element-neutral-highlighted',
        '--icon-top-nav-neutral-default',
        '--icon-main-nav-brand-primary-selected',
        '--icon-main-nav-neutral-disabled',
        '--icon-main-nav-neutral-default',
        '--icon-skillbadge-brand-primary-selected',
        '--icon-tab-chips-neutral-disabled',
        '--icon-tab-chips-neutral-default',
        '--icon-tab-chips-brand-primary-pressed',
        '--icon-tab-chips-brand-primary-selected',
        '--icon-tablecell-danger-primary-default',
        '--icon-tablecell-neutral-default',
        '--icon-tablecell-neutral-BodyHighlighted',
        '--icon-input-brand-primary-default',
        '--icon-input-danger-primary-default',
        '--icon-input-neutral-disabled',
        '--icon-input-neutral-default',
        '--icon-snackbar-neutral-alt-default',
        '--icon-snackbar-neutral-default',
        '--icon-tab-indicator-brand-primary-pressed',
        '--icon-tab-basic-neutral-disabled',
        '--icon-tab-basic-neutral-default',
        '--icon-tab-basic-brand-primary-pressed',
        '--icon-tab-basic-brand-primary-default',
        '--icon-appbar-neutral-default',
        '--icon-button-brand-primary-disabled',
        '--icon-button-brand-primary-pressed',
        '--icon-button-brand-primary-hover',
        '--icon-button-brand-primary-default',
        '--icon-button-brand-secondary-default',
        '--icon-button-success-secondary-default',
        '--icon-button-danger-secondary-default',
        '--icon-button-neutral-default',
        '--icon-button-neutral-pressed',
        '--icon-button-neutral-disabled',
        '--icon-button-neutral-alt-default',
      ],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (props: IconProps) => (
  <>
    <Wrapper>
      <IconWrapper>
        <Icon name="activity_m" size={24} color={props.color} />
        <IconText>activity_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="add_m" size={24} color={props.color} />
        <IconText>add_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="add_s" size={24} color={props.color} />
        <IconText>add_s</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="add_xs" size={24} color={props.color} />
        <IconText>add_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="align_center_m" size={24} color={props.color} />
        <IconText>align_center_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="align_justify_m" size={24} color={props.color} />
        <IconText>align_justify_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="align_left_m" size={24} color={props.color} />
        <IconText>align_left_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="align_right_m" size={24} color={props.color} />
        <IconText>align_right_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="arrow_down_m" size={24} color={props.color} />
        <IconText>arrow_down_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="arrow_left_m" size={24} color={props.color} />
        <IconText>arrow_left_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="arrow_right_m" size={24} color={props.color} />
        <IconText>arrow_right_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="arrow_up_m" size={24} color={props.color} />
        <IconText>arrow_up_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="behance_m" size={24} color={props.color} />
        <IconText>behance_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="behance_xxl" size={24} color={props.color} />
        <IconText>behance_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="bold_m" size={24} color={props.color} />
        <IconText>bold_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="calendar_add_m" size={24} color={props.color} />
        <IconText>calendar_add_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="calendar_xs" size={24} color={props.color} />
        <IconText>calendar_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="check_xs" size={24} color={props.color} />
        <IconText>check_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_down_m" size={24} color={props.color} />
        <IconText>chevron_down_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="chevron_left_m" size={24} color={props.color} />
        <IconText>chevron_left_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_right_m" size={24} color={props.color} />
        <IconText>chevron_right_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_small_down_m" size={24} color={props.color} />
        <IconText>chevron_small_down_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_small_left_m" size={24} color={props.color} />
        <IconText>chevron_small_left_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_small_right_m" size={24} color={props.color} />
        <IconText>chevron_small_right_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_small_up_m" size={24} color={props.color} />
        <IconText>chevron_small_up_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="chevron_up_m" size={24} color={props.color} />
        <IconText>chevron_up_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="clear_m" size={24} color={props.color} />
        <IconText>clear_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="close_m" size={24} color={props.color} />
        <IconText>close_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="close_s" size={24} color={props.color} />
        <IconText>close_s</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="custom_web_xxl" size={24} color={props.color} />
        <IconText>custom_web_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="delete_m" size={24} color={props.color} />
        <IconText>delete_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="door_m" size={24} color={props.color} />
        <IconText>door_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="download_m" size={24} color={props.color} />
        <IconText>download_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="dribbble_m" size={24} color={props.color} />
        <IconText>dribbble_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="dribbble_xxl" size={24} color={props.color} />
        <IconText>dribbble_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="edit_m" size={24} color={props.color} />
        <IconText>edit_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="edit_s" size={24} color={props.color} />
        <IconText>edit_s</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="eye_off_m" size={24} color={props.color} />
        <IconText>eye_off_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="eye_off_xs" size={24} color={props.color} />
        <IconText>eye_off_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="eye_on_m" size={24} color={props.color} />
        <IconText>eye_on_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="person_add" size={24} color={props.color} />
        <IconText>person_add</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="eye_on_xs" size={24} color={props.color} />
        <IconText>eye_on_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="facebook_m" size={24} color={props.color} />
        <IconText>facebook_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="facebook_xxl" size={24} color={props.color} />
        <IconText>facebook_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="file_m" size={24} color={props.color} />
        <IconText>file_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="filters_m" size={24} color={props.color} />
        <IconText>filters_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="finances_m" size={24} color={props.color} />
        <IconText>finances_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="flag_pl_m" size={24} color={props.color} />
        <IconText>flag_pl_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="flag_us_m" size={24} color={props.color} />
        <IconText>flag_us_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="fullscreen_xs" size={24} color={props.color} />
        <IconText>fullscreen_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="github_m" size={24} color={props.color} />
        <IconText>github_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="github_xxl" size={24} color={props.color} />
        <IconText>github_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="groups_m" size={24} color={props.color} />
        <IconText>groups_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="h1_m" size={24} color={props.color} />
        <IconText>h1_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="h2_m" size={24} color={props.color} />
        <IconText>h2_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="home_m" size={24} color={props.color} />
        <IconText>home_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="info_m" size={24} color={props.color} />
        <IconText>info_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="instagram_m" size={24} color={props.color} />
        <IconText>instagram_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="instagram_xxl" size={24} color={props.color} />
        <IconText>instagram_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="invite_m" size={24} color={props.color} />
        <IconText>invite_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="italic_m" size={24} color={props.color} />
        <IconText>italic_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon imageIconName="leave_quietly" size={24} color={props.color} />
        <IconText>leave_quietly</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="link_m" size={24} color={props.color} />
        <IconText>link_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="linkedin_m" size={24} color={props.color} />
        <IconText>linkedin_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="linkedin_xxl" size={24} color={props.color} />
        <IconText>linkedin_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="lock_m" size={24} color={props.color} />
        <IconText>lock_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="logout_m" size={24} color={props.color} />
        <IconText>logout_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="medium_m" size={24} color={props.color} />
        <IconText>medium_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="medium_xxl" size={24} color={props.color} />
        <IconText>medium_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="menu_m" size={24} color={props.color} />
        <IconText>menu_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="message_m" size={24} color={props.color} />
        <IconText>message_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="mic_off_m" size={24} color={props.color} />
        <IconText>mic_off_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="mic_on_m" size={24} color={props.color} />
        <IconText>mic_on_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="minus_xs" size={24} color={props.color} />
        <IconText>minus_xs</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="more_m" size={24} color={props.color} />
        <IconText>more_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="my_networks_alt_xxl" size={24} color={props.color} />
        <IconText>my_networks_alt_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="my_networks_xxl" size={24} color={props.color} />
        <IconText>my_networks_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="network_m" size={24} color={props.color} />
        <IconText>network_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="notification_filled_m" size={24} color={props.color} />
        <IconText>notification_filled_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="notifications_m" size={24} color={props.color} />
        <IconText>notifications_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="order_m" size={24} color={props.color} />
        <IconText>order_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="orderedlist_m" size={24} color={props.color} />
        <IconText>orderedlist_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="picture_m" size={24} color={props.color} />
        <IconText>picture_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="placeholder_m" size={24} color={props.color} />
        <IconText>placeholder_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="play_m" size={24} color={props.color} />
        <IconText>play_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="play_xs" size={24} color={props.color} />
        <IconText>play_xs</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="posts_m" size={24} color={props.color} />
        <IconText>posts_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="preview_m" size={24} color={props.color} />
        <IconText>preview_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="privacy_policy_m" size={24} color={props.color} />
        <IconText>privacy_policy_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="private_XL" size={24} color={props.color} />
        <IconText>private_XL</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="profile_m" size={24} color={props.color} />
        <IconText>profile_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="progressbar_m" size={24} color={props.color} />
        <IconText>progressbar_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="public_XL" size={24} color={props.color} />
        <IconText>public_XL</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon imageIconName="raise_hand_m" size={24} color={props.color} />
        <IconText>raise_hand_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="raise_hand_2_outline_m" size={24} color={props.color} />
        <IconText>raise_hand_2_outline_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="search_m" size={24} color={props.color} />
        <IconText>search_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="send_m_1" size={24} color={props.color} />
        <IconText>send_m_1</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="send_m" size={24} color={props.color} />
        <IconText>send_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="settings_m" size={24} color={props.color} />
        <IconText>settings_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="share_m_1" size={24} color={props.color} />
        <IconText>share_m_1</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="share_m" size={24} color={props.color} />
        <IconText>share_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="skills_m" size={24} color={props.color} />
        <IconText>skills_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="social_hall_m" size={24} color={props.color} />
        <IconText>social_hall_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="spinner_m" size={24} color={props.color} />
        <IconText>spinner_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="strikethrough_m" size={24} color={props.color} />
        <IconText>strikethrough_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="support_m" size={24} color={props.color} />
        <IconText>support_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="terms_m" size={24} color={props.color} />
        <IconText>terms_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="text_alt_xxl" size={24} color={props.color} />
        <IconText>text_alt_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="text_m" size={24} color={props.color} />
        <IconText>text_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="text_xxl" size={24} color={props.color} />
        <IconText>text_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="thumb_up_m" size={24} color={props.color} />
        <IconText>thumb_up_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="tick_m" size={24} color={props.color} />
        <IconText>tick_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="time_m" size={24} color={props.color} />
        <IconText>time_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="twitter_m" size={24} color={props.color} />
        <IconText>twitter_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="twitter_xxl" size={24} color={props.color} />
        <IconText>twitter_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="underline_m" size={24} color={props.color} />
        <IconText>underline_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="unorderedlist_m" size={24} color={props.color} />
        <IconText>unorderedlist_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="video_alt_xxl" size={24} color={props.color} />
        <IconText>video_alt_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="video_xxl" size={24} color={props.color} />
        <IconText>video_xxl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="warning_m" size={24} color={props.color} />
        <IconText>warning_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="wave_left_m" size={24} color={props.color} />
        <IconText>wave_left_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="wave_right_m" size={24} color={props.color} />
        <IconText>wave_right_m</IconText>
      </IconWrapper>
    </Wrapper>

    <Wrapper>
      <IconWrapper>
        <Icon name="write_m" size={24} color={props.color} />
        <IconText>write_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon imageIconName="avatar_m" size={24} color={props.color} />
        <IconText>avatar_m</IconText>
      </IconWrapper>
      <IconWrapper>
        <Icon name="coin_m" size={24} />
        <IconText>coin_m</IconText>
      </IconWrapper>
    </Wrapper>
  </>
);

export const Primary = {
  render: Template,

  args: {
    color: '--icon-placeholder-neutral-default',
  },
};
