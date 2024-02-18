import FormHeader, {
  type FormHeaderProps,
} from '@/components/FormHeader/FormHeader';
import S from './styles';

type StickyFormHeaderProps = FormHeaderProps;

export function StickyFormHeader(props: StickyFormHeaderProps) {
  return (
    <S.StickyNavbarCard>
      <FormHeader {...props} />
    </S.StickyNavbarCard>
  );
}
