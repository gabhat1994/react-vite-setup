import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

type ToggleProps = {
  onToggle: (toggle: boolean) => void;
  center: boolean;
  value: boolean;
};

export function Toggle({ onToggle, center, value }: ToggleProps) {
  return (
    <Stack fullWidth justify={center ? 'center' : 'flex-start'}>
      <ToggleSwitch
        value={value}
        onChange={onToggle}
        left={
          <TSpan font="body-l" colorToken="--text-body-neutral-highlighted">
            Noum SEO
          </TSpan>
        }
      />
    </Stack>
  );
}
