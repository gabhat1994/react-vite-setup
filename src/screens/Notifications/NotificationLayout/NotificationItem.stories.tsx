import { type Meta, type StoryFn } from '@storybook/react';
import { sub } from 'date-fns';
import { t } from 'i18next';
import styled from 'styled-components';
import { NotificationButton } from './NotificationButton';
import { NotificationItem } from './NotificationItem';
import { type NotificationItemProps } from './types';

const TemplateItem = styled.div`
  margin-bottom: 18px;
`;

function delayedNoop() {
  return new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
}

export default {
  title: 'UI/NotificationItem',
  component: NotificationItem,

  argTypes: {
    title: {
      type: 'string',
      defaultValue: 'Title',
    },
    avatars: {
      defaultValue: ['https://picsum.photos/150/240'],
    },
    timestamp: {
      defaultValue: new Date(),
    },
    isViewed: {
      defaultValue: false,
    },
    buttons: {
      table: { disable: true },
    },
    body: {
      type: 'string',
      defaultValue: '',
    },
    onClick: {
      table: { disable: true },
    },
    redirectUrl: {
      table: { disable: true },
    },
  },
} as Meta<typeof NotificationItem>;

const AllTemplate: StoryFn<typeof NotificationItem> = (
  props: NotificationItemProps,
) => (
  <div>
    <TemplateItem>
      <NotificationItem {...props} />
    </TemplateItem>
    <TemplateItem>
      <NotificationItem
        {...props}
        timestamp={sub(new Date(), { days: 3 })}
        isViewed={true}
      />
    </TemplateItem>
    <TemplateItem>
      <NotificationItem {...props} body="Notification body text" />
    </TemplateItem>
    <TemplateItem>
      <NotificationItem
        {...props}
        buttons={
          <>
            <NotificationButton variant="primary" onClick={delayedNoop}>
              {t('noumena.chamber.connect_button')}
            </NotificationButton>
            <NotificationButton variant="secondary" onClick={delayedNoop}>
              {t('noumena.reject')}
            </NotificationButton>
          </>
        }
      />
    </TemplateItem>
  </div>
);

const AvatarsTemplate: StoryFn<typeof NotificationItem> = (
  props: NotificationItemProps,
) => (
  <div>
    <TemplateItem>
      <NotificationItem
        {...props}
        avatars={['https://picsum.photos/150/160']}
      />
    </TemplateItem>
    <TemplateItem>
      <NotificationItem
        {...props}
        avatars={[
          'https://picsum.photos/150/180',
          'https://picsum.photos/150/160',
        ]}
      />
    </TemplateItem>
    <TemplateItem>
      <NotificationItem
        {...props}
        avatars={[
          'https://picsum.photos/150/190',
          'https://picsum.photos/150/160',
          'https://picsum.photos/150/180',
        ]}
      />
    </TemplateItem>
  </div>
);

export const All = {
  render: AllTemplate,
  args: {},
};

export const ManyUsers = {
  render: AvatarsTemplate,
  args: {},
};
