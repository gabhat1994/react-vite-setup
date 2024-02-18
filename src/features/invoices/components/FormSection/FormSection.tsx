import { TSpan, type FontType } from '@/components/Typography/Typography';
import { Stack } from '@/layout';
import S from './styles';

type FormSectionProps = {
  title?: string;
  optional?: boolean;
  fullSize?: boolean;
  titleSeparator?: boolean;
  sectionSeparator?: boolean;
  font?: FontType;
  rightIcon?: React.ReactNode;
  headerStyle?: React.CSSProperties;
};

const FormSection: React.FC<FormSectionProps> = ({
  title,
  optional,
  children,
  fullSize,
  titleSeparator,
  rightIcon,
  font = 'heading-xs-bold',
  headerStyle,
}) => (
  <>
    <S.Wrapper fullSize={fullSize}>
      {title ? (
        <Stack fullWidth={!!rightIcon} align="center" justify="space-between">
          <S.Header style={headerStyle}>
            <TSpan font={font} colorToken="--text-card-neutral-highlighted">
              {title}{' '}
              {optional ? (
                <TSpan
                  font="body-xl"
                  colorToken="--text-tablecell-header-neutral-default"
                >
                  (optional)
                </TSpan>
              ) : null}
            </TSpan>
          </S.Header>
          {rightIcon}
        </Stack>
      ) : null}

      {titleSeparator ? <S.Separator /> : null}
      {children}
    </S.Wrapper>
  </>
);

export default FormSection;
