import {
  LOWERCASE_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_REGEX,
} from '@/constants/regex';

export const generateAnalysis = (password: string) => {
  const hasLowerCaseCharacter = LOWERCASE_REGEX.test(password);
  const hasUpperCaseCharacter = UPPERCASE_REGEX.test(password);
  const hasSpecialCharacter = SPECIAL_CHARACTER_REGEX.test(password);
  const hasNumber = NUMBER_REGEX.test(password);
  const hasSixCharacters = password?.length >= 6;

  const result =
    hasLowerCaseCharacter &&
    hasUpperCaseCharacter &&
    hasSixCharacters &&
    hasSixCharacters &&
    hasNumber &&
    hasSpecialCharacter;

  return {
    result,
    hasLowerCaseCharacter,
    hasUpperCaseCharacter,
    hasSpecialCharacter,
    hasSixCharacters,
    hasNumber,
  };
};
