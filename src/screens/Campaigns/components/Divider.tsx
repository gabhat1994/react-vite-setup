import { Separator } from '@/components/Separator/Separator';
import { Spacer } from '@/layout/Stack/Spacer';

export function Divider() {
  return (
    <>
      <Spacer height={8} />
      <Separator size="thin" fullWidth />
      <Spacer height={8} />
    </>
  );
}
