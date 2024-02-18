import { ActivityLog } from '@/components/ActivityLog';
import { type AppActivityFragment } from '@/apollo/graphql';
import { TranslatedBody } from './TranslatedBody';
import { ActivityLogsUtils } from './utils';

type ActivityLogsItemProps = {
  item: AppActivityFragment;
};

export const ActivityLogsItem: React.FC<ActivityLogsItemProps> = ({ item }) => {
  if (!item) {
    return null;
  }

  const translation = ActivityLogsUtils.getTranslationByType({ item });

  return (
    <ActivityLog.Item
      iconName="check_xs"
      description={
        translation?.key ? (
          <TranslatedBody
            i18nKey={translation.key}
            values={translation.values}
          />
        ) : null
      }
      timestamp={item.createdAt}
    />
  );
};
