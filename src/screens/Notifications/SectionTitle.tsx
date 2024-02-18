import { TSpan } from '@/components/Typography';
import { formatTimeSection } from '@/utils/date';
import { type SectionTitleProps } from './types';

const SectionTitle = ({ date }: SectionTitleProps): JSX.Element => (
  <TSpan
    data-testid="section-title"
    font="body-m-bold"
    colorToken="--text-appbar-neutral-default"
  >
    {formatTimeSection(date)}
  </TSpan>
);

export default SectionTitle;
