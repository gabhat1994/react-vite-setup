import checkSVG from '@/assets/images/check-m.svg';
import { ThemeIcons } from './constants';
import * as S from './styles';
import { type ThemeItemProps } from './types';

export const ThemeItem = (props: ThemeItemProps) => {
  const { isSelected, title, onChangeTheme } = props;
  const icon = title as keyof typeof ThemeIcons;
  return (
    <S.ThemeItemWrapper isSelected={isSelected} onClick={onChangeTheme}>
      <S.StyledImage src={ThemeIcons[icon]} alt="backgroundImage" />
      {isSelected && (
        <S.StyledCheckWrapper>
          <S.StyledCheck src={checkSVG} alt="checkSVG" />
        </S.StyledCheckWrapper>
      )}
      <S.StyledTitle isSelected={isSelected}>{title}</S.StyledTitle>
    </S.ThemeItemWrapper>
  );
};
