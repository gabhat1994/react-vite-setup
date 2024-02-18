import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Index } from './styles';

type DocumentHeadingProps = {
  heading: string;
  index: number;
};

export const DocumentHeading = ({ heading, index }: DocumentHeadingProps) => (
  <Stack gap={8} align="center">
    <Index>
      <TSpan
        textAlign="center"
        font="footnote-bold"
        colorToken="--text-badge-brand-primary-default"
      >
        {index}
      </TSpan>
    </Index>
    <TSpan colorToken="--text-modal-neutral-highlighted" font="body-l-bold">
      {heading}
    </TSpan>
  </Stack>
);
