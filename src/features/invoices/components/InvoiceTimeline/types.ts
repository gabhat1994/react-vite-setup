import { type Icons } from '@/components/Icon/Icon';

export type TimelineActivityType = {
  translation: {
    key: string;
    values?: Record<string, string | number | boolean | null | undefined>;
  };
  icon: keyof typeof Icons;
};
