import { type ChangeEvent, useCallback, useState } from 'react';

import { type PasswordStrength } from '../types';
import { generateAnalysis } from '../helpers';

export const usePasswordStrength = () => {
  const [analysis, setAnalysis] = useState<PasswordStrength>({
    hasLowerCaseCharacter: false,
    hasNumber: false,
    hasSixCharacters: false,
    hasSpecialCharacter: false,
    hasUpperCaseCharacter: false,
  });

  const analyzePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const {
      hasLowerCaseCharacter,
      hasSixCharacters,
      hasSpecialCharacter,
      hasUpperCaseCharacter,
      hasNumber,
    } = generateAnalysis(password);
    setAnalysis({
      hasSixCharacters,
      hasNumber,
      hasSpecialCharacter,
      hasLowerCaseCharacter,
      hasUpperCaseCharacter,
    });
  }, []);

  return {
    analysis,
    analyzePassword,
  };
};
